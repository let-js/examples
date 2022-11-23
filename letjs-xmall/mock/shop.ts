import { MockMethod } from 'vite-plugin-mock'
const Mock = require('mockjs')
import { responseSuccess, getParamPairs } from './utils'
const data = [
  {
    category: '精品女装',
    shops: [
      {
        id: 1001,
        name: 'nike',
        chineseName: '耐克',
      },
      {
        id: 1002,
        name: 'adidas',
        chineseName: '阿迪达斯',
      },
      {
        id: 1003,
        name: 'lining',
        chineseName: '李宁',
      },
      {
        id: 1004,
        name: 'shop1004',
        chineseName: '店铺4',
      },
      {
        id: 1005,
        name: 'shop1005',
        chineseName: '店铺5',
      },
      {
        id: 1006,
        name: 'shop1005',
        chineseName: '店铺6',
      },
    ],
  },
  {
    category: '品牌男装',
    shops: [
      {
        id: 1007,
        name: 'shop1007',
        text: '店铺7',
      },
      {
        id: 1008,
        name: 'shop1008',
        chineseName: '店铺8',
      },
      {
        id: 1009,
        name: 'shop1008',
        chineseName: '店铺8',
      },
    ],
  },
  {
    category: '潮流女鞋',
    shops: [
      {
        id: 10204,
        name: 'shop10204',
        chineseName: '店铺41',
      },
      {
        id: 10205,
        name: 'shop1005',
        chineseName: '店铺51',
      },
    ],
  },
  {
    category: '品牌男鞋',
    shops: [
      {
        id: 10041,
        name: 'shop10041',
        chineseName: '店铺42',
      },
      {
        id: 10051,
        name: 'shop10051',
        chineseName: '店铺53',
      },
      {
        id: 10061,
        name: 'shop10061',
        chineseName: '店铺61',
      },
    ],
  },
  {
    category: '精品口红',
    shops: [
      {
        id: 21004,
        name: 'shop21004',
        chineseName: '店铺24',
      },
      {
        id: 21005,
        name: 'shop1005',
        chineseName: '店铺25',
      },
      {
        id: 31006,
        name: 'shop31005',
        chineseName: '店铺36',
      },
      {
        id: 31004,
        name: 'shop31004',
        chineseName: '店铺34',
      },
      {
        id: 310053,
        name: 'shop310053',
        chineseName: '店铺53',
      },
      {
        id: 310054,
        name: 'shop310053',
        chineseName: '店铺65',
      },
    ],
  },
  {
    category: '潮牌包包',
    shops: [
      {
        id: 41004,
        name: 'shop41004',
        chineseName: '香奈儿',
      },
      {
        id: 41005,
        name: 'shop41005',
        chineseName: 'LV',
      },
      {
        id: 41006,
        name: 'shop41006',
        chineseName: '爱马仕',
      },
      {
        id: 41007,
        name: 'shop41006',
        chineseName: '迪奥',
      },
    ],
  },
]
const getShopListData = function () {
  return Mock.mock({
    'list|5-10': [
      {
        'category|1': [
          '精品女装',
          '潮流男装',
          '美丽女鞋',
          '时尚男鞋',
          '流行美妆',
        ],
        'shops|4-10': [
          {
            'id|10': 1,
            name: '@word',
            chineseName: '@ctitle(2, 4)',
          },
        ],
      },
    ],
  })
}

// 变成函数，每次更新
function getShopData() {
  return Mock.mock({
    shop: {
      'id|10000-100000': 1,
      name: '@word',
      chineseName: '@ctitle(2, 4)',
      icon: '@url',
      'level|1-10': 0,
    },
  })
}

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

const shopDataByProduction = getShopData

const getChannelListData = function () {
  return Mock.mock({
    list: [
      {
        'id|1000-100000': 100,
        name: '首页',
        href: '',
        page: 'index',
        // 数据处理放到service中
        // param: {
        //   id: id,
        // },
      },
      {
        id: 2,
        'name|1': ['商品分类', '商品大全', '全部商品'],
        href: '',
        page: 'category',
      },
      {
        id: 3,
        'name|1': ['商品折扣', '火爆折扣', '优惠折扣'],
        href: '',
        page: 'discount',
      },
      {
        id: 4,
        'name|1': ['优惠券', '打折券', '优惠码'],
        href: './',
        page: 'coupon',
      },
    ],
  })
}

const getProductionListData = function () {
  return Mock.mock({
    'list|80': [
      {
        'id|10000-900000': 100000,
        name: '@cname',
        'src|1': [
          '../../assets/images/banner01.webp',
          '../../assets/images/banner02.png',
          '../../assets/images/banner03.webp',
        ],
        width: 100,
        'category|1': ['美妆', '包包', '女鞋', '运动装'],
        height: 100,
      },
    ],
  })
}

export default [
  {
    url: '/api/shop/shop-list',
    method: 'get',
    response: () => {
      const arr = [data, getShopListData().list]
      const idx = Math.floor(Math.random() * arr.length)
      return responseSuccess(arr[idx], 'success')
    },
  },
  {
    url: '/api/shop/id/banner',
    method: 'get',
    response: () => {
      return responseSuccess(getBannerData().list, 'success')
    },
  },
  {
    url: '/api/shop',
    method: 'get',
    response: (data: any) => {
      try {
        getParamPairs(data.url).forEach((item) => {
          if (item[0] === 'productionId') {
            shopDataByProduction().shop.productionId = item[1]
          }
          return responseSuccess({}, 'failed')
        })
      } catch (err) {
        console.error('get url error:', err)
      }
      return responseSuccess(shopDataByProduction().shop, 'success')
    },
  },
  {
    url: '/api/shop/id/channel-list',
    method: 'get',
    response: () => {
      return responseSuccess(getChannelListData().list, 'success')
    },
  },
  {
    url: '/api/shop/id/production-list',
    method: 'get',
    response: () => {
      return responseSuccess(getProductionListData().list, 'success')
    },
  },
  // 待通配符的放在最后
  {
    url: '/api/shop/(.*)',
    method: 'get',
    response: (data: any) => {
      const idx = data.url.lastIndexOf('/')
      const param = data.url.substr(idx + 1)
      let name: string
      let id: number
      const shopData = getShopData()
      if (Number(param) > 0) {
        id = param
        shopData.shop.id = id
      } else {
        name = param
        shopData.shop.name = name
      }
      return responseSuccess(shopData.shop, 'success')
    },
  },
] as MockMethod[]
