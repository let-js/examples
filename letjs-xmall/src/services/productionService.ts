import useLogger from '@/utils/useLogger'
import { VueLogger } from 'vue-logger-plugin'
import { COlORS_CONST, COLORS_DICT } from '@/config/productionEnum'
import { ProductionPreview } from '@/domain/production/ProductionPreview'
import { ProductionImage } from '@/domain/production/ProductionImage'
import { ProductionPurchase } from '@/domain/production/ProductionPurchase'
import {
  ProductionListType,
  ProductionDescType,
  ColorsListType,
} from '@/types/production'
import { Production } from '@/domain/production/Production'
import { Shop } from '@/domain/shop/Shop'
import * as productionApi from '@/api/productionApi'
import { replaceDevPath } from '@/utils/file'

const logger: VueLogger = useLogger()

/**
 * 从api获取商品预览数据
 */
export async function getProductionPreview(
  productionId: number,
): Promise<ProductionPreview> {
  const result = await productionApi.getProductionPreview(productionId)
  // 这种处理在service即可
  result.data.src = replaceDevPath(result.data.src)
  const imageModel = new ProductionImage(result.data)
  const previewModel = new ProductionPreview({
    id: result.data.id,
    src: '',
    image: imageModel,
  })
  return previewModel
}

/**
 * 从服务端获取购买初始相关数据
 */
export async function getProductionPurchase(
  productionId: number,
): Promise<ProductionPurchase> {
  const result = await productionApi.getProductionPurchase(productionId)
  return new ProductionPurchase(result.data)
}

/**
 * 对购买商品做数据加工
 */
export function prepareProductionPurchase(
  productionPurchase: ProductionPurchase,
  shop: Shop,
  preview: ProductionPreview,
): ProductionPurchase {
  Object.assign(productionPurchase, { shop, preview })
  return productionPurchase
}

/**
 * 数组内部的逻辑处理，应该放在domain比较合适
 */
export function processProductionPurchase(
  productionPurchase: ProductionPurchase,
): void {
  if (!productionPurchase || !productionPurchase.colors) {
    logger.error('productionPurchase is undefined.', productionPurchase)
    return
  }
  // 处理颜色数据
  productionPurchase.colorsList = new Array<ColorsListType>()
  productionPurchase?.colors.forEach((no: number, idx: number) => {
    const key = COlORS_CONST[no as keyof typeof COlORS_CONST]
    // 这里也可以改为push追加
    productionPurchase.colorsList[idx] = {
      no: no,
      name: key,
      text: COLORS_DICT[key as keyof typeof COLORS_DICT]?.text,
      code: COLORS_DICT[key as keyof typeof COLORS_DICT]?.code,
    }
  })
}

export async function getProductionDesc(
  productionId: number,
): Promise<ProductionDescType> {
  const result = await productionApi.getProductionDesc(productionId)
  return result.data
}

/**
 * 从后端获取相关商品列表
 */
type ProductionType = { title: string; productions: Production[] }
export async function getRelationList(
  productionId: number,
): Promise<ProductionListType[]> {
  const result = await productionApi.getRelationList(productionId)
  // 这里要对数据进行再整理，将数据归类
  processRelationList(result.data)
  const relationList: ProductionListType[] = []
  for (const item of result.data) {
    const member: ProductionType = { title: '', productions: [] }
    member.title = item.category
    for (const production of item.productions) {
      member.productions.push(new Production(production))
    }
    relationList.push(member)
  }
  return relationList
}

/**
 * 基本结构数据处理放在service，内部业务逻辑放在domain进行处理
 */
export function processRelationList(list: ProductionListType[]): void {
  if (!Array.isArray(list) || list.length <= 0) {
    return
  }
  list.forEach((item: ProductionListType) => {
    item.productions.forEach((production: Production) => {
      if (production.src) {
        production.src = production.src.replace('../../assets/', '/src/assets/')
      }
    })
    item.productions = [...item.productions, ...item.productions]
  })
}

/**
 * 计算购买模型
 */
export async function calculateStockRemain(
  production: Production,
): Promise<Production> {
  // delete production.sellStatus
  const result = await productionApi.calculateStockRemain(production)
  production.sellStatus = result.data.sellStatus
  // 这里再重新计算下是否有存货，按随机3分之1概率无货
  production.sellStatus = Math.floor(Math.random() * 3)
  return production
}

export async function submitToBuy(production: Production): Promise<{
  productionId: number
  message: string
}> {
  // 提交前的业务逻辑整理，去除无用数据，保证与API一致性
  // processBuyProduction(production)
  const result = await productionApi.submitToBuy(production)
  return result.data
}
