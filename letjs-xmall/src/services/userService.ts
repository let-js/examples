import { Ref } from 'vue'
import { RoleType, User } from '../domain/user'
import * as userApi from '../api/userApi'
import { Auth } from '@/config/userConst'
import useLogger from '@/utils/useLogger'
import { VueLogger } from 'vue-logger-plugin'
import { ResponseCode } from '@/config/requestEnum'

const logger: VueLogger = useLogger()

export async function getUser(id: number): Promise<User> {
  const response = await userApi.getUserInfo(id)
  const user = new User(response.data)
  logger.log('data:', response.data, 'user:', user)
  return user
}

/**
 * 用户登录
 */
export async function userLogin(loginData: object): Promise<User> {
  const response = await userApi.userLogin(loginData)
  if (Number(response.code) === ResponseCode.SUCCESS_CODE) {
    const user = new User(response.data)
    return user
  }
  delete response.data
  logger.error('get user failed:', response)
  return response.data
}

export function createEmptyUser(): User {
  const user = User.createEmptyUser()
  return user
}

export function getUserAuthList(user: User): Array<string> {
  const role: RoleType = user.role
  const authArr: Array<string> = Auth[role]
  return authArr
}
