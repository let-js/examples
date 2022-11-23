import request, { Response } from '../utils/request'
// API 层汇总所有当前领域相关的接口 方便梳理和排查 可同后端的模块划分对应
// export async function getUser() {
//   const response: Response = await request.get('/api/login-user')
//   return response
// }
export async function getUserInfo(id: number) {
  const response: Response = await request.get('/api/user/id')
  return response
}

export async function userLogin(loginData: object) {
  const response: Response = await request.post('/api/user/login', {
    data: loginData,
  })
  return response
}
