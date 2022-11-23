import useLogger from '@/utils/useLogger'
import { VueLogger } from 'vue-logger-plugin'
import { Shop } from '@/domain/shop/Shop'
import * as shopService from '@/services/shopService'
import { Production } from '@/domain/production/Production'
import { useShopStore } from '@/stores/shopStore'

const logger: VueLogger = useLogger()

export async function getShopById(shopId: number): Promise<Shop> {
  // 如果store有同id数据，则取store里面的数据
  const shopStoreData: Shop = useShopStore()?.shop
  if (shopStoreData?.id === shopId) {
    logger.info('取自store中的shop数据:', shopStoreData)
    return shopStoreData
  }
  const result = await shopService.getShopById(10001)
  const shop: Shop = result
  if (!shop?.id) {
    logger.error(`get shopId ${shopId} failed.`)
  }
  useShopStore().updateShop(shop)
  return shop
}

export async function getShopByName(shopName: string): Promise<Shop> {
  // 如果store有同name数据，则取store里面的数据
  const shopStoreData: Shop = useShopStore()?.shop
  if (shopStoreData?.name === shopName) {
    logger.info('取自store中的shop数据:', shopStoreData)
    return shopStoreData
  }

  // 异步请求获取数据
  const shop: Shop = await shopService.getShopByName(shopName)
  if (!shop?.id) {
    logger.error(`request shopName ${shopName} failed.`)
  }

  useShopStore().updateShop(shop)
  return shop
}

export async function getShopByProductionId(shopId: number): Promise<Shop> {
  const shop: Shop = await shopService.getShopByProductionId(shopId)
  if (!shop?.id) {
    logger.error(`request shopId ${shopId} failed.`)
  }
  useShopStore().updateShop(shop)
  return shop
}