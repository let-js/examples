import type { RouteLocationNormalized, Router } from 'vue-router'
import { PageEnum } from '@/config/pageEnum'
import { isLogin } from '@/composition/authentication'
import { useUserStore } from '@/stores/userStore'

const LOGIN_PATH = PageEnum.BASE_LOGIN
const NOTFOUND_PATH = PageEnum.NOT_FOUND
const NOPERMISSION_PATH = PageEnum.NO_PERMISSION

const needAuthenticated = (route: RouteLocationNormalized): boolean => {
  return !(route?.meta?.ignoreAuth || false)
}

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to) => {
    // const { user, isLogin } = storeToRefs(useUserStore())
    // 如果未匹配任何路由，则直接跳转404；
    if (to.matched.length === 0) {
      return {
        path: NOTFOUND_PATH,
      }
    }
    if (to.path !== LOGIN_PATH && needAuthenticated(to)) {
      // await verify()
      const userStore = useUserStore()
      const user = userStore.user
      // 无用户信息
      if (!user || !user.isLogin) {
        return { path: NOPERMISSION_PATH, query: { from: to.fullPath } }
      }
      // 用户角色判断
      const role = user.role
      // 模拟普通用户进入admin页则被拒绝
      if (role === 'customer' && to.path.startsWith('/admin/')) {
        return { path: NOPERMISSION_PATH }
      } else {
        return true
      }
    }
    return true
  })
}
