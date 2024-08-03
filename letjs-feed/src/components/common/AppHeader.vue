<template>
  <header class="main-header">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <ul class="nav navbar-nav navbar-right">
            <li v-if="!isLogin">
              <router-link to="/login">登录</router-link>
            </li>
            <li v-else>
              Hi,&nbsp;
              <span @click="showUser"
                ><strong>{{ user.userName }}</strong></span
              >&nbsp;
              <router-link to="/logout">退出</router-link>
            </li>
          </ul>
          <div class="logo">
            <router-link to="/" class="navbar-brand">My LOGO</router-link>
          </div>
          <search></search>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
  .main-header {
    .navbar {
      &.navbar-default {
        background-color: #c0d6f9;
        border-radius: 0 0 15px 15px;
        width: 1280px;
        margin: auto;
      }
    }
    .navbar .navbar-header {
      margin-top: 10px;
      height: 60px;
      text-align: center;
    }
    .navbar-right {
      float: right;
      list-style-type: none;
      margin-top: 10px;
      margin-right: 30px;
      a {
        display: inline;
      }
    }
    .logo {
      width: 200px;
      padding-top: 10px;
    }
    .logo a {
      color: #000;
    }
  }
</style>

<script setup>
  import Search from '../search/Search.vue'
  import { useUserStore } from '@/stores/userStore'
  import { reactive, watch } from 'vue'

  const userStore = useUserStore()
  const user = ref({})
  const isLogin = ref(userStore.isLogin)

  watch(
    () => userStore.user,
    (newUser, oldUser) => {
      console.log('watch user:', isLogin.value, newUser, oldUser)
      user.value = newUser
      isLogin.value = userStore.isLogin
      if (newUser.userName !== undefined && newUser.userName !== '') {
        console.log('has logon.')
      } else {
        console.log('has not login.')
      }
    }
  )

  onMounted(() => {
    console.log('user:', user)
  })
</script>
