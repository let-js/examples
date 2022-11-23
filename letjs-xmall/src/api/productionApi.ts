import request, { Response } from '../utils/request'

import { Production } from '@/domain/production/Production'
// 从api获取商品预览数据
export async function getProductionPreview(productionId: number) {
  const response: Response = await request.get('./api/production/preview/id')
  return response
}

export async function getProductionPurchase(productionId: number) {
  // const data = {
  //   id: productionId,
  //   name: 'ECCO爱步女鞋 透气耐磨户外休闲运动鞋 舒适牛皮跑步鞋 健步C系列091503 黑色09150351707 38',
  //   promption:
  //     '【ECC预售来袭】抢预售双倍免定金！预售女鞋到手58元起！13月25日27点开抢',
  //   price: 1399.0,
  //   remain: 219,
  //   colors: [11, 12, 14, 15, 16],
  //   size: [35, 36, 37, 38, 39, 40, 41],
  //   tip: '支持7天无理由退货',
  //   sellStatus: 1,
  //   // shop和previewInfo处理后追加
  //   // shop: shop,
  //   // preview: productionPreview,
  // }
  const response: Response = await request.get('./api/production/id')
  return response
}

export async function getProductionDesc(productionId: number) {
  //   const data = {
  //     type: 'html',
  //     content: `
  //   <h1>国际名牌。最新潮流款，年轻人的最爱！</h1>
  //   <p>款式、颜色可以任选，质保1年。</p>
  //   <img src="/src/assets/images/banner01.webp" width="1250" />
  //   <h1>购买方式</h1>
  //   <p>请仔细对照尺寸大小再下单购买，若不清楚请联系客服。</p>
  //   <img src="/src/assets/images/banner02.png" width="1250" />
  //   <h1>使用说明</h1>
  //   <p>保养：每一年一次正式保养，请联系客服邮寄。</p>
  //   <img src="/src/assets/images/banner01.webp" width="1250" />
  // `,
  //   }
  const response: Response = await request.get('./api/production/desc/id')
  return response
}

export async function getRelationList(productionId: number) {
  // const data = [
  //   {
  //     category: '相关商品',
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
  // return {
  //   code: 200,
  //   data: data,
  // }
  const response: Response = await request.get(
    './api/production/relation-list/id',
    {
      params: productionId,
    },
  )
  return response
}

export async function calculateStockRemain(production: Production) {
  // 根据货物情况从后台实时获取存货情况
  // sellStatus 0 无货  1 有货
  // sellStatus为选择的数据是否有货，该状态实时从后端获取
  // 应该通过service，再向api发起，然后再通过父组件传递给子组件进行判断
  // 只有通过页面组件来调用service，子组件不直接调用
  // 如果是单独的业务组件，可以自己发起数据请求和数据处理，无需依赖service和api
  // production.sellStatus = 1
  // const data = [
  //   {
  //     size: 35,
  //     color: 11,
  //   },
  //   {
  //     size: 36,
  //     color: 16,
  //   },
  //   {
  //     size: 38,
  //     color: 15,
  //   },
  //   {
  //     size: 41,
  //     color: 15,
  //   },
  // ]
  // 模拟缺货情形
  // data.map((item) => {
  //   if (production.size === item.size && production.color === item.color) {
  //     production.sellStatus = 0
  //     return
  //   }
  // })
  // return {
  //   code: 200,
  //   data: {
  //     sellStatus: production.sellStatus,
  //   },
  // }
  const response: Response = await request.post(
    './api/production/calculate',
    production,
  )
  return response
}

export async function submitToBuy(production: Production) {
  // return {
  //   code: 200,
  //   data: {
  //     id: production.id,
  //     message: '提交成功',
  //   },
  // }
  const data = new FormData()
  data.append('production', JSON.stringify(production))
  // const response: Response = await request.post('./api/production/buy', {
  //   data: production,
  // })
  const response: Response = await request.post(
    './api/production/buy',
    production,
  )
  return response
}
