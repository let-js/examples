import { ref, Ref, h, onMounted, reactive } from 'vue'
import { getUser } from '../services/userService'
import { useUserStore } from '../stores/userStore'
import { User } from '@/domain/user'

export async function verify(): Promise<void> {
  const userStorage = useUserStore()
  const user: User = await getUser(12345)
  userStorage.updateUser(user)
}

// 从store中取数据来判断是否已登录
export function isLogin(): boolean {
  const user: User = useUserStore().user
  return user.isLogin
}
