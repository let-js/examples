import useLogger from '@/utils/useLogger'
import { VueLogger } from 'vue-logger-plugin'
import { replaceDevPath } from '@/utils/file'
import * as indexApi from '@/api/indexApi'
import * as shopApi from '@/api/shopApi'
import { BannerType } from '@/types/banner'
import { ShopListType } from '@/types/shop'
import { Production } from '@/domain/production/Production'

const logger: VueLogger = useLogger()

/* 最佳实践 */
// 1. service采取平铺函数的方式，而不是采取class
// 2. 好处是简单明了，函数彼此少关联和交集
// 3. 不足是不便于实例化来共享属性和数据，针对这些属性和数据共同编程
// 4. 异步取数据一律用await，但在页面实际使用时可以采取异步回调
// 5. api导入通过* as获取，便于区分

/**
 * 获取banner列表
 */
export async function getBannerList(num = 2): Promise<Array<BannerType>> {
  const result = await indexApi.getBannerList()
  let list: BannerType[] = result?.data
  // 数据去重复处理可以在service或domain
  list = uniqueBannerListBy(list, 'src')
  return list.slice(0, num)
}

/**
 * 根据key去掉list重复项
 */
function uniqueBannerListBy(
  list: BannerType[],
  key: string | number,
): BannerType[] {
  const listLen = list.length
  const result = list.filter((banner: BannerType, idx: number) => {
    for (let i = 0; i < listLen; i++) {
      // 如果src相同且比较项的下标与最先出现的下标一致则表示唯一，就过滤出来
      if (list[i][key] === banner[key]) {
        return i === idx
      }
    }
    return false
  })
  return result
}

/**
 * 对banner数据进行加工，可以由service调用或给页面调用
 */
export function processBannerList(bannerList: Array<BannerType>) {
  bannerList.forEach((banner) => {
    banner.src = replaceDevPath(banner.src)
  })
}

export async function getShopList(): Promise<ShopListType[]> {
  const result = await shopApi.getShopList()
  const list: Array<ShopListType> = result?.data
  // 这里简单模拟下数据处理，实际情况比这个复杂
  list.forEach((item: ShopListType) => {
    item.title = item.category
  })
  return list
}

export async function getProductionList(): Promise<Production[]> {
  const result = await indexApi.getProductionList()
  const list: Array<Production> = result?.data
  return list
}

export async function getAndProcessProductionList(): Promise<Production[]> {
  // 数据处理调用函数，尽量在页面内完成，要依据情况而定，可以单独写一个方法给页面调用
  const list: Production[] = await getProductionList()
  processProductionList(list)
  return list
}

/**
 * 对产品列表数据进行加工
 */
export function processProductionList(productionList: Array<Production>) {
  productionList.forEach((item: Production) => {
    item.src = replaceDevPath(item.src)
  })
}
