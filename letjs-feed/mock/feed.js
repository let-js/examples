import Mock from 'mockjs'
import {
  responseSuccess,
  responseFailed
} from './utils'

function getFeeds() {
  return Mock.mock({
    'feedList|30-50': [{
      'imgSrc': '@url',
      'title|15-20': '@cword',
      'link|1-2': '@url',
      'desc|100-300': '@cword',
      poster: '@cname',
      posterId: Math.floor(123456 * Math.random() * 5),
      publishDate: '@date',
      'replyCount|5-500': 1,
      'commentCount|50-500': 1,
      'likeCount|500-50000': 1
    }]
  })
}

export default [{
  url: '/api/feeds',
  method: 'get',
  response: () => {
    return responseSuccess(getFeeds().feedList, 'get feed list success!')
  },
}, ]