import request, { Response } from '@/utils/request'
export async function getShopById(shopId: number) {
  const response: Response = await request.get('./api/shop/id/' + shopId)
  return response
}

export async function getShopByName(shopName: string) {
  const response: Response = await request.get('./api/shop/name/' + shopName)
  return response
}

export async function getShopByProductionId(id: number) {
  // const data = {
  //   id: id,
  //   name: 'baiyun',
  //   chineseName: '美好店铺',
  //   icon: 'http://xx.png',
  //   level: 3,
  // }
  // return {
  //   code: 200,
  //   data: data,
  // }
  const response: Response = await request.get('./api/shop', {
    params: {
      productionId: id,
    },
  })
  return response
}

export async function getBannerList(shopId: number) {
  // const data = [
  //   {
  //     id: 1004,
  //     src: '../../assets/images/banner01.webp',
  //     url: '',
  //     text: '横图1',
  //   },
  //   {
  //     id: 1005,
  //     src: '../../assets/images/banner02.png',
  //     url: '',
  //     text: '横图2',
  //   },
  //   {
  //     id: 1006,
  //     src: '../../assets/images/banner03.webp',
  //     url: '',
  //     text: '横图3',
  //   },
  // ]
  // return {
  //   code: 200,
  //   data: data,
  // }
  const response: Response = await request.get('./api/shop/id/banner')
  return response
}

export async function getShopList(): Promise<Response> {
  const response: Response = await request.get('./api/shop/shop-list')
  return response
}

export async function getChannelListById(id: number) {
  // const data = [
  //   {
  //     id: 1,
  //     name: '首页',
  //     href: '',
  //     page: 'index',
  //     // 数据处理放到service中
  //     // param: {
  //     //   id: id,
  //     // },
  //   },
  //   {
  //     id: 2,
  //     name: '商品分类',
  //     href: '',
  //     page: 'category',
  //   },
  //   {
  //     id: 3,
  //     name: '折扣',
  //     href: '',
  //     page: 'discount',
  //   },
  //   {
  //     id: 4,
  //     name: '优惠券',
  //     href: './',
  //     page: 'coupon',
  //   },
  // ]
  // return {
  //   code: 200,
  //   data: data,
  // }
  const response: Response = await request.get('./api/shop/id/channel-list')
  return response
}

export async function getProductionListById(shopId: number) {
  const response: Response = await request.get('./api/shop/id/production-list')
  return response
}
