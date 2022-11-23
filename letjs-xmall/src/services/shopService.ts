import useLogger from '@/utils/useLogger'
import { VueLogger } from 'vue-logger-plugin'
import * as shopApi from '@/api/shopApi'
import { BannerType } from '@/types/banner'
import { ProductionListType } from '@/types/production'
import { Shop } from '@/domain/shop/Shop'
import { Channel } from '@/domain/shop/Channel'
import { Production } from '@/domain/production/Production'

const logger: VueLogger = useLogger()

/* 商店是一个Domain包括以下数据 */
// 1. 商店基本数据 shop = {}
// 2. 商店导航数据  channel = [{导航}]
// 3. 商店Banner推广数据 banner = [{banner}]
// 4. 商品列表数据 = [{推广:[{商品}]}]
// 其中model有：
// 1. 商店Shop
// 2. 商品Production

/**
 * 根据id获取商铺的数据。中间进行数据处理，合并和过滤数据
 */
export async function getShopById(shopId: number): Promise<Shop> {
  const result = await shopApi.getShopById(10001)
  const shop: Shop = result?.data
  if (!shop?.id) {
    logger.error(`request shopId ${shopId} failed.`)
  }
  return shop
}

export async function getShopByName(shopName: string): Promise<Shop> {
  // 异步请求获取数据
  const result = await shopApi.getShopByName(shopName)
  const shop: Shop = result?.data
  if (!shop?.id) {
    logger.error(`request shopName ${shopName} failed.`)
  }
  return shop
}

export async function getShopByProductionId(shopId: number): Promise<Shop> {
  const result = await shopApi.getShopByProductionId(shopId)
  const shop: Shop = result.data
  if (!shop?.id) {
    logger.error(`request shopId ${shopId} failed.`)
  }
  return shop
}

/**
 * 获取shop的频道设置，node层可以将该接口与getShop接口合并统一输出给前端
 */
export async function getChannelListById(shopId: number): Promise<Channel[]> {
  // 其中param参数跟页面有关，需要在service进行处理
  // 如果运营配置了单独的链接href，则优先执行href
  const indexParam = {
    id: shopId,
  }
  const result = await shopApi.getChannelListById(shopId)
  const channelList: Channel[] = result.data
  const indexChannel = channelList.filter((channel: Channel) => {
    return channel.page == 'index'
  })[0]
  indexChannel.param = indexParam
  return channelList
}

/**
 * 根据页面名称获取商铺频道
 * 这里是函数式写法，而不是面向对象可以持有servcie实例
 */
export function getShopChannelByPage(
  channelList: Array<Channel>,
  page: string,
): Channel {
  if (!Array.isArray(channelList)) {
    return channelList[0]
  }
  const result = channelList?.filter((item) => {
    return item.page === page
  })
  return result[0]
}

/**
 * 根据shop id从服务端请求banner数据
 */
export async function getBannerListById(shopId: number): Promise<BannerType[]> {
  // 向api发起请求
  const result = await shopApi.getBannerList(shopId)
  const list: Array<BannerType> = result?.data
  // 数据处理放在service
  processBannerList(list)
  return list
}

/**
 * 这里要对图片数据做一些处理，比如删除或增加一部分数据
 */
export function processBannerURL(banner: BannerType) {
  banner.src = banner?.src?.replace('../../assets/', '/src/assets/')
}

function uniqueBannerListBy(
  bannerList: Array<BannerType>,
  key: string,
): Array<BannerType> {
  let len = bannerList.length
  while (len-- > 0) {
    let idx = len
    while (idx-- > 0) {
      const one = bannerList[len]
      const two = bannerList[idx]
      if (one[key as keyof BannerType] === two[key as keyof BannerType]) {
        bannerList.splice(len, 1)
        break
      }
    }
  }
  return bannerList
}

export function processBannerList(bannerList: Array<BannerType>) {
  // 根据src去掉重复
  uniqueBannerListBy(bannerList, 'src')
  // 替换路径
  bannerList.forEach((banner) => {
    processBannerURL(banner)
  })
}

/**
 * 对产品列表数据进行处理
 */
export function processProductionList(productionList: Array<Production>) {
  productionList?.forEach((production: Production) => {
    production.src = production?.src.replace('../../assets/', '/src/assets/')
  })
  // 原始分类之前的数据处理
  // productionList?.forEach((item: ProductionListType) => {
  //   item.productions?.forEach((production: Production) => {
  //     production.src = production.src.replace('../../assets/', '/src/assets/')
  //   })
  //   item.productions = [
  //     ...item.productions,
  //     ...item.productions,
  //     ...item.productions,
  //   ]
  // })
}

/**
 * 将商品按分类归类
 */
export async function getProductionListById(
  shopId: number,
): Promise<ProductionListType[]> {
  const result = await shopApi.getProductionListById(shopId)
  const productionListData: Production[] = result.data
  processProductionList(productionListData)
  // 这里需要利用format工具进行groupBy category
  const productionList: ProductionListType[] = []
  const map = new Map()
  // 归类
  productionListData.forEach((item) => {
    if (!map.get(item.category)) {
      map.set(item.category, [])
    }
    map.get(item.category).push(new Production(item))
  })
  // 整理
  map.forEach((value, key) => {
    const item = {
      title: key,
      productions: value.slice(0, 10),
    }
    productionList.push(item)
  })
  logger.info('data:', map, 'productionList::', productionList)
  return productionList
  // 数据处理成如下格式
  // const data = [
  //   {
  //     category: '美妆',
  //     // 具体商品
  //     productions: [
  //       {
  //         id: 100000000001,
  //         name: '产品1',
  //         src: '../../assets/images/banner01.webp',
  //         width: 100,
  //         height: 100,
  //       },
  //       {
  //         id: 100000000002,
  //         name: '产品2',
  //         src: '../../assets/images/banner02.png',
  //         width: 100,
  //         height: 100,
  //       },
  //       {
  //         id: 100000000003,
  //         name: '产品3',
  //         src: '../../assets/images/banner01.webp',
  //         width: 100,
  //         height: 100,
  //       },
  //       {
  //         id: 100000000004,
  //         name: '产品4',
  //         src: '../../assets/images/banner02.png',
  //         width: 100,
  //         height: 100,
  //       },
  //     ],
  //   },
  //   {
  //     category: '包包',
  //     // 具体商品
  //     productions: [
  //       {
  //         id: 100000000001,
  //         name: '产品1',
  //         src: '../../assets/images/banner01.webp',
  //         width: 100,
  //         height: 100,
  //       },
  //       {
  //         id: 100000000002,
  //         name: '产品2',
  //         src: '../../assets/images/banner02.png',
  //         width: 100,
  //         height: 100,
  //       },
  //       {
  //         id: 100000000003,
  //         name: '产品3',
  //         src: '../../assets/images/banner01.webp',
  //         width: 100,
  //         height: 100,
  //       },
  //       {
  //         id: 100000000004,
  //         name: '产品4',
  //         src: '../../assets/images/banner02.png',
  //         width: 100,
  //         height: 100,
  //       },
  //     ],
  //   },
  //   {
  //     category: '女鞋',
  //     // 具体商品
  //     productions: [
  //       {
  //         id: 100000000001,
  //         name: '产品1',
  //         src: '../../assets/images/banner01.webp',
  //         width: 100,
  //         height: 100,
  //       },
  //       {
  //         id: 100000000002,
  //         name: '产品2',
  //         src: '../../assets/images/banner02.png',
  //         width: 100,
  //         height: 100,
  //       },
  //       {
  //         id: 100000000003,
  //         name: '产品3',
  //         src: '../../assets/images/banner01.webp',
  //         width: 100,
  //         height: 100,
  //       },
  //       {
  //         id: 100000000004,
  //         name: '产品4',
  //         src: '../../assets/images/banner02.png',
  //         width: 100,
  //         height: 100,
  //       },
  //     ],
  //   },
  //   {
  //     category: '运动装',
  //     // 具体商品
  //     productions: [
  //       {
  //         id: 100000000001,
  //         name: '产品1',
  //         src: '../../assets/images/banner01.webp',
  //         width: 100,
  //         height: 100,
  //       },
  //       {
  //         id: 100000000002,
  //         name: '产品2',
  //         src: '../../assets/images/banner02.png',
  //         width: 100,
  //         height: 100,
  //       },
  //       {
  //         id: 100000000003,
  //         name: '产品3',
  //         src: '../../assets/images/banner01.webp',
  //         width: 100,
  //         height: 100,
  //       },
  //       {
  //         id: 100000000004,
  //         name: '产品4',
  //         src: '../../assets/images/banner02.png',
  //         width: 100,
  //         height: 100,
  //       },
  //     ],
  //   },
  // ]
}
