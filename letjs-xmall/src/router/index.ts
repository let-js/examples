import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NotFound from '@/pages/NotFound.vue'
import Login from '@/pages/Login.vue'
import Logout from '@/pages/Logout.vue'
import NoPermission from '@/pages/NoPermission.vue'
import Welcome from '@/pages/Welcome.vue'
import Index from '@/pages/Index.vue'
import User from '@/pages/User.vue'
import Shop from '@/pages/Shop.vue'
import Channel from '@/pages/shop/Channel.vue'
import Production from '@/pages/Production.vue'
import Search from '@/pages/Search.vue'
import Pay from '@/pages/Pay.vue'
import Layout from '@/components/layouts/Layout.vue'
import NeedAuth from '@/pages/NeedAuth.vue'
import { setupRouterGuard } from './guards/index'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    meta: {
      title: 'xmall',
    },
    children: [
      {
        path: '',
        name: 'index',
        component: Index,
        meta: {
          title: 'xmall-放心的购物商城',
          ignoreAuth: true,
        },
      },
      {
        path: '/production/:id',
        name: 'production',
        component: Production,
        meta: {
          title: '商品详情',
          ignoreAuth: true,
        },
      },
      {
        path: 'production',
        component: Production,
        meta: {
          title: '商品详情',
          ignoreAuth: true,
        },
      },
      {
        path: '/shop/:name',
        name: 'shop',
        component: Shop,
        meta: {
          title: '店铺',
          ignoreAuth: true,
        },
      },
      {
        path: '/shop/:name/:page',
        name: 'channel',
        component: Channel,
        meta: {
          title: '店铺分类',
          ignoreAuth: true,
        },
      },
      {
        path: '/search',
        name: 'search',
        component: Search,
        meta: {
          keepAlive: false,
          title: '搜索页',
          ignoreAuth: true,
        },
      },
      {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: {
          title: '支付页',
          ignoreAuth: false,
        },
      },
      {
        path: '/login',
        component: Login,
        meta: {
          title: '登陆页',
          ignoreAuth: true,
        },
      },
      {
        path: '/logout',
        component: Logout,
        meta: {
          title: '退出页',
          ignoreAuth: true,
        },
      },
    ],
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: '',
        component: Welcome,
        meta: {
          title: '欢迎页',
          ignoreAuth: true,
        },
      },
      {
        path: 'need-auth',
        component: NeedAuth,
        meta: {
          title: '管理页',
          ignoreAuth: false,
        },
      },
    ],
  },
  {
    path: '/hello',
    redirect: '/test',
  },
  {
    path: '/user',
    component: Layout,
    meta: {
      title: '个人中心',
    },
    children: [
      {
        path: '',
        component: User,
        meta: {
          title: '用户中心-关于我',
          ignoreAuth: true,
        },
      },
    ],
  },
  {
    path: '/not-found',
    component: Layout,
    children: [
      {
        path: '',
        component: NotFound,
        meta: {
          title: '404',
          ignoreAuth: true,
        },
      },
    ],
  },
  {
    path: '/no-permission',
    component: Layout,
    children: [
      {
        path: '',
        component: NoPermission,
        meta: {
          title: '403',
          ignoreAuth: true,
        },
      },
    ],
  },
  // 匹配所有位置路由
  {
    path: '/:pathMatch(.*)*',
    component: Layout,
    children: [
      {
        path: '',
        name: 'NotFound',
        component: NotFound,
        meta: {
          title: '404',
          ignoreAuth: true,
        },
      },
    ],
  },
]

// const routes: RouteRecordRaw[] = routesGroup.concat(defaultRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 动态设置title
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
// import { onBeforeRouteUpdate } from 'vue-router'
// onBeforeRouteUpdate((to) => {
// const title = to.meta.title
// })

// 配置相关的路由守卫
setupRouterGuard(router)

export default router
