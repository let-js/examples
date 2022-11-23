import { MockMethod } from 'vite-plugin-mock'
const Mock = require('mockjs')
import { responseSuccess, responseFailed } from './utils'

const getUser = function () {
  return Mock.mock({
    'id|1-100000': 100000,
    name: '@cname',
    gender: '@integer(0, 1)',
    email: '@email',
    avatar: '@avatar',
    'role|1': ['admin', 'editor', 'developer', 'operator', 'customer'],
  })
}

export default [
  {
    url: '/api/user/id',
    method: 'get',
    response: () => {
      return responseSuccess(getUser(), 'success')
    },
  },
  {
    url: '/api/user/login',
    method: 'post',
    response: (data: any) => {
      data = data?.body?.data
      if (data?.username != 'admin' || data?.password != 'admin$123') {
        return responseFailed(getUser())
      }
      return responseSuccess(getUser(), 'success')
    },
  },
] as MockMethod[]
