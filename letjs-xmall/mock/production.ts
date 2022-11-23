import { MockMethod } from 'vite-plugin-mock'
const Mock = require('mockjs')
import { responseSuccess } from './utils'

const previewData = Mock.mock({
  'id|1-100000': 100000,
  'src|1': [
    '../../assets/images/banner01.webp',
    '../../assets/images/banner02.png',
    '../../assets/images/banner03.webp',
  ],
})

const productionData = Mock.mock({
  'id|1-100000': 100000,
  'name|1': [
    'ECCO爱步女鞋 透气耐磨户外休闲运动鞋 舒适牛皮跑步鞋 健步C系列091503 黑色09150353701 38',
    'Nike超跑女鞋 高级最酷 最酷牛皮跑步鞋 健步D系列091503 白色09150355706 35',
    'Kipo超级男鞋 舒适耐磨户外休闲运动鞋 最酷牛皮跑步鞋 健步D系列091503 红色09150351709 37',
    'Good最酷男鞋 透气耐磨户外休闲运动鞋 最酷牛皮跑步鞋 健步D系列091503 白色09150351709 39',
    'Pretty帅气男鞋 大方耐磨户外休闲运动鞋 最酷牛皮跑步鞋 健步D系列091503 蓝色09150351709 39',
  ],
  promption:
    '【ECC预售来袭】抢预售双倍免定金！预售女鞋到手58元起！13月25日27点开抢',
  'price|1000-2000.1': 100.0,
  'remain|200-500': 100,
  colors: [11, 12, 14, 15, 16, 18],
  'color|11-16': 11,
  sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
  'size|35-41': 1,
  tip: '支持7天无理由退货',
  sellStatus: 1,
  // shop和previewInfo处理后追加
  // shop: shop,
  // preview: productionPreview,
})

const descData = Mock.mock({
  type: 'html',
  content: `
  <h1>国际名牌。最新潮流款，年轻人的最爱！</h1>
  <p>款式、颜色可以任选，质保1年。</p>
  <img src="/src/assets/images/banner01.webp" width="1250" />
  <h1>购买方式</h1>
  <p>请仔细对照尺寸大小再下单购买，若不清楚请联系客服。</p>
  <img src="/src/assets/images/banner02.png" width="1250" />
  <h1>使用说明</h1>
  <p>保养：每一年一次正式保养，请联系客服邮寄。</p>
  <img src="/src/assets/images/banner01.webp" width="1250" />
`,
})
const calculateData = Mock.mock({
  'sellStatus|0-1': 1,
})

const buyData = Mock.mock({
  'id|1-100000': 100000,
  desc: '提交成功：@cparagraph(1, 2)',
})

const relationListData = [
  {
    category: '相关商品',
    // 具体商品
    productions: [
      {
        id: 100000000001,
        name: '产品1',
        src: '../../assets/images/banner01.webp',
        width: 100,
        category: '相关商品',
        height: 100,
      },
      {
        id: 100000000002,
        name: '产品2',
        src: '../../assets/images/banner02.png',
        category: '相关商品',
        width: 100,
        height: 100,
      },
      {
        id: 100000000003,
        name: '产品3',
        src: '../../assets/images/banner01.webp',
        category: '相关商品',
        width: 100,
        height: 100,
      },
      {
        id: 100000000004,
        name: '产品4',
        category: '相关商品',
        src: '../../assets/images/banner02.png',
        width: 100,
        height: 100,
      },
    ],
  },
]

const getRelationData = function () {
  return Mock.mock({
    'list|1-2': [
      {
        'category|1': ['相关商品', '猜你喜欢', '热门商品'],
        'productions|4': [
          {
            'id|1-100000': 100000,
            name: '@cname',
            'src|1': [
              '../../assets/images/banner01.webp',
              '../../assets/images/banner02.png',
              '../../assets/images/banner03.webp',
            ],
            'width|100-300': 100,
            'height|100-200': 100,
          },
        ],
      },
    ],
  })
}

export default [
  {
    url: '/api/production/preview/id',
    method: 'get',
    response: () => {
      return responseSuccess(previewData, 'success')
    },
  },
  {
    url: '/api/production/desc/id',
    method: 'get',
    response: () => {
      return responseSuccess(descData, 'success')
    },
  },
  {
    url: '/api/production/id',
    method: 'get',
    response: () => {
      return responseSuccess(productionData, 'success')
    },
  },
  {
    url: '/api/production/name',
    method: 'get',
    response: () => {
      return responseSuccess(productionData, 'success')
    },
  },
  {
    url: '/api/production/calculate',
    method: 'post',
    response: () => {
      return responseSuccess(calculateData, 'success')
    },
  },
  {
    url: '/api/production/buy',
    method: 'post',
    response: () => {
      return responseSuccess(buyData, 'success')
    },
  },
  {
    url: '/api/production/relation-list/id',
    method: 'get',
    response: () => {
      const arr = [relationListData, getRelationData().list]
      const idx = Math.floor(Math.random() * arr.length)
      return responseSuccess(arr[idx], 'success')
    },
  },
] as MockMethod[]
