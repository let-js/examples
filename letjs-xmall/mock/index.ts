import { MockMethod } from 'vite-plugin-mock'
const Mock = require('mockjs')
import { responseSuccess } from './utils'

const getBannerData = function () {
  return Mock.mock({
    'list|5-10': [
      {
        'id|1-100000': 100000,
        'src|1': [
          '../../assets/images/banner01.webp',
          '../../assets/images/banner02.png',
          '../../assets/images/banner03.webp',
        ],
        url: '@url',
        text: '@cparagraph(1,3)',
      },
    ],
  })
}

const getProductionListData = function () {
  return Mock.mock({
    'list|40': [
      {
        'id|1-100000': 100000,
        name: '产品名称-@cname(1,3)',
        'src|1': [
          '../../assets/images/banner01.webp',
          '../../assets/images/banner02.png',
          '../../assets/images/banner03.webp',
        ],
        'shopId|10': '',
        category: '@cname(2,5)',
        date: '@date("yyyy-MM-dd")',
        url: '@url',
        'width|100-200': 100,
        'height|200-300': 100,
      },
    ],
  })
}
export default [
  {
    url: '/api/index/banner-list',
    method: 'get',
    response: () => {
      return responseSuccess(getBannerData().list, 'success')
    },
  },
  {
    url: '/api/index/production-list',
    method: 'get',
    response: () => {
      return responseSuccess(getProductionListData().list, 'success')
    },
  },
] as MockMethod[]
