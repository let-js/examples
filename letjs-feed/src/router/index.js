import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Layout from '@/components/layouts/Layout.vue'
import EmptyLayout from '@/components/layouts/EmptyLayout.vue'
import Index from '@/pages/Index.vue'
import Login from '@/pages/Login.vue'
import Logout from '@/pages/Logout.vue'
import User from '@/pages/user/User.vue'
import Hot from '@/pages/hot/Hot.vue'
import Feed from '@/pages/feed/Feed.vue'
import NeedAuth from '@/pages/NeedAuth.vue'
import NotFound from '@/pages/NotFound.vue'
import NoPermission from '@/pages/NoPermission.vue'
import {
  setupRouterGuard
} from './guards'

const routes = [{
    path: '/',
    component: Layout,
    children: [{
        path: '',
        name: 'index',
        component: Index,
        meta: {
          title: '首页',
          ignoreAuth: true,
        },
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          title: '登录',
          ignoreAuth: true,
        },
      },
      {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: {
          title: '登出',
          ignoreAuth: true,
        },
      },
      {
        path: '/user/:uid',
        name: 'user',
        component: User,
        meta: {
          title: '用户',
          ignoreAuth: true,
        },
      },
      {
        path: '/hot',
        name: 'hot',
        component: Hot,
        meta: {
          title: '热门',
          ignoreAuth: true,
        },
      },
      {
        path: '/feed',
        name: 'feed',
        component: Feed,
        meta: {
          title: '消息流',
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
    path: '/',
    component: EmptyLayout,
    children: [{
        path: '/not-found',
        component: NotFound,
        meta: {
          ignoreAuth: true,
        },
      },
      {
        path: '/no-permission',
        component: NoPermission,
        meta: {
          ignoreAuth: true,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: EmptyLayout,
    children: [{
      path: '',
      name: 'notfound',
      component: NotFound,
      meta: {
        ignoreAuth: true,
      },
    }, ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

setupRouterGuard(router)

export default router