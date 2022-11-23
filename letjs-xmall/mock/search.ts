import { MockMethod } from 'vite-plugin-mock'
const Mock = require('mockjs')

function searchData() {
  return Mock.mock({
    'list|10-15': [
      {
        'id|1-100000': 100000,
        'type|1-50': 25,
        title: '@ctitle(10, 30)',
        content: '@cparagraph(3,6)',
        'image|1': [
          '../../assets/images/banner01.webp',
          '../../assets/images/banner02.png',
          '../../assets/images/banner03.webp',
        ],
      },
    ],
    'currentPage|1-100': 1,
    'pageCount|30-1000': 100,
    'pageTotal|100-5000': 200,
  })
}

function getDefaultKeyWords() {
  return Mock.mock({
    'default|1': ['耐克', '李宁', '阿迪达斯', '百丽', '古奇'],
  })
}

export default [
  {
    url: '/api/search',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: searchData(),
        msg: 'success.',
      }
    },
  },
  {
    url: '/api/search/default',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: getDefaultKeyWords(),
        msg: 'success.',
      }
    },
  },
] as MockMethod[]
