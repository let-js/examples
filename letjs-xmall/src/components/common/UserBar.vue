<template>
  <div class="user-bar">
    <ul>
      <li v-if="isLogin === false">
        <a href="#" @click="showLogin()">登录</a>&nbsp;&nbsp;
        <router-link :to="'/user'">个人中心</router-link>
      </li>
      <li v-else>
        欢迎您，
        <router-link :to="'/user'">{{ user?.name }}</router-link
        >&nbsp;&nbsp;
        <a href="#" @click="logout()">退出</a>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, h, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import * as userService from '@/services/userService'
import * as userComposition from '@/composition/user'
import { User } from '@/domain/user'
import * as authentication from '@/composition/authentication'
import { useMessage, useDialog } from 'naive-ui'
import { NInput, NButton } from 'naive-ui'
import { $events } from '@/utils/events'
import EventConfig from '@/config/eventConfig'

interface userStoreInterface {
  user: Ref<User>
}
const { user }: userStoreInterface = storeToRefs(useUserStore())
let authList: Ref<Array<string>> = ref([])
const router = useRouter()

// 实时计算是否已经登录，数据来自store
let isLogin = computed(() => {
  return authentication.isLogin()
})

let loginTips = ref('')

function logout() {
  loginTips.value = ''
  userComposition.userLogout(user.value)
  // 路由跳转
  // router.push({
  // path: '/logout',
  // })
  // 或直接页面跳转
  // window.location.href = '/logout'
}

// 提交的参数
const loginParams = reactive({
  username: 'admin',
  password: 'admin$123',
})
// placeholder初始值来自于默认提交参数，不需要响应式
const loginPlaceholder = {
  username: loginParams.username,
  password: loginParams.password,
}

// 登录并且更新信息
async function login(data: object) {
  // 登录且更新store状态
  const result = await userComposition.userLogin(data)
  if (isLogin.value === true) {
    loginTips.value = '登录成功！'
    authList.value = userService.getUserAuthList(user.value)
  } else {
    loginTips.value = '登录失败，请检查用户名与密码'
  }
  return result
}

// 判断当前路径如果是未登录页面，则登录后根据from跳转
function loginGotoFrom() {
  const noPermissionPath = '/no-permission'
  const currentRouter = router.currentRoute.value
  const path = currentRouter.path
  if (path == noPermissionPath) {
    const url = currentRouter.query?.from || '/'
    const routerQuery = router.currentRoute.value.query
    router.push(String(url))
  }
}

const loginDialog = useDialog()

function showLogin(
  options = {
    width: 500,
    height: 300,
    onSuccess: undefined,
    onCancel: undefined,
  },
) {
  loginDialog.info({
    title: '请登录',
    style: `width:${options.width}px;height:${options.height}px`,
    // positiveText: '登录',
    // negativeText: '取消',
    content: () =>
      h(
        'form',
        {
          class: 'login-container',
          style: 'margin: 30px 60px;',
          action: 'javascript:void(0);',
        },
        [
          h(
            'div',
            {
              style: 'display: flex-grid; margin-top:15px',
            },
            [
              '用户：',
              h(
                NInput,
                {
                  defaultValue: loginParams.username,
                  placeholder: loginPlaceholder.username,
                  name: 'username',
                  type: 'text',
                  style: {
                    width: '80%',
                  },
                  onChange: (value: string) => {
                    loginParams.username = value.trim()
                  },
                },
                '',
              ),
            ],
          ),
          h(
            'div',
            {
              style: 'display: flex-grid; margin-top:15px',
            },
            [
              '密码：',
              h(
                NInput,
                {
                  defaultValue: loginParams.password,
                  placeholder: loginPlaceholder.password,
                  name: 'password',
                  type: 'password',
                  style: {
                    width: '80%',
                  },
                  onChange: (value: string) => {
                    loginParams.password = value.trim()
                  },
                },
                '',
              ),
            ],
          ),
          h(
            'div',
            {
              class: 'login-button',
              style: 'margin-left: 50px;margin-top: 20px',
            },
            [
              h(
                NButton,
                {
                  type: 'primary',
                  attrType: 'submit',
                  onClick: async () => {
                    const result = await login(loginParams)
                    if (isLogin.value) {
                      // 登录成功之后的回调
                      options.onSuccess?.call(this, {
                        loginParams: loginParams,
                        loginResult: result,
                      })
                      // 跳转到来源页
                      loginGotoFrom()
                      // 关闭弹窗
                      loginDialog.destroyAll()
                    }
                  },
                },
                () => '登录',
              ),
              h(
                NButton,
                {
                  type: 'default',
                  style: 'margin-left:15px',
                  onClick: () => {
                    loginDialog.destroyAll()
                    options.onCancel?.call(this, {
                      loginParams: loginParams,
                      loginUser: user.value,
                    })
                  },
                },
                () => '取消',
              ),
              h(
                'span',
                {
                  style: {
                    color: '#cf3137',
                    width: '90%',
                    display: 'inline-block',
                  },
                },
                `${loginTips.value}`,
              ),
            ],
          ),
        ],
      ),
    onPositiveClick: () => {
      // alert(1)
    },
  })
}

$events.on(EventConfig.UserBar_showLogin, (options: any) => {
  showLogin(options)
})

// 也可以使用 defineExpose 向外暴露指定的数据和方法
// 父组件可以通过ref来引用
// defineExpose({
//   showLogin,
// })
</script>

<style lang="scss" scoped>
.user-bar {
  display: flex;
  margin: auto;
  align-content: center;
}

.user-bar ul {
  list-style: none;
}

.login-container {
  max-width: 80%;
}

.login-container .n-input {
  margin-bottom: 5px;
}

.login-button {
  margin: 10px;
}
</style>
