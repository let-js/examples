import { RoleType, User } from '../domain/user'
import useLogger from '@/utils/useLogger'
import { VueLogger } from 'vue-logger-plugin'
import { useUserStore } from '@/stores/userStore'
import * as userService from '@/services/userService'

const logger: VueLogger = useLogger()

export async function userLogin(data: object): Promise<User> {
  // const user: User = await userService.userLogin(loginData)
  const user = await userService.userLogin(data)
  logger.info('get user:', user)
  // 更新store状态
  useUserStore().updateUser(user)
  return user
}

/**
 * 用户退出，注销store内容
 */
export function userLogout(user: User): void {
  // 1. patch更新
  // userStore.$patch({
  //   user: {},
  // })
  // 2. 更新删除
  // userStore.updateUser({})
  // 3. removeUser
  useUserStore().removeUser(user)
}
