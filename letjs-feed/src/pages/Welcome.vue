<template>
  <div class="welcome-page">
    <img style="height: 140px" src="@/assets/logo.png" alt="" />
    <h1>Welcome to Letjs！</h1>

    <h1 v-if="user.isLogin">Hi, {{ user.userName }}{{ user.genderTitle }}</h1>

    <div style="padding: auto">
      <el-space>
        <el-button
          v-if="!user.isLogin"
          type="primary"
          size="large"
          @click="login('admin', 'admin$123')"
          >登录</el-button
        >

        <el-button v-else type="primary" size="large" @click="logout()"
          >退出</el-button
        >

        <el-button
          v-if="user.isLogin"
          plain
          type="primary"
          size="large"
          @click="dialogVisible = true"
          >show dialog!</el-button
        >
      </el-space>
    </div>

    <el-dialog v-model="dialogVisible" title="Who am I?">
      <div>
        <p>姓名: {{ user.userName }}</p>
        <p>用户ID: {{ user.userId }}</p>
        <p>性别: {{ user.genderCh }}</p>
        <p>你拥有{{ authList.join(',') }}</p>
      </div>
      <template #footer>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import * as userService from '@/services/userService'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
let authList = ref([])
const dialogVisible = ref(false)

async function login(username = '', password = '') {
  const loginUser = await userService.login({ username, password })
  authList.value = userService.getUserAuthList(loginUser)
  userStore.updateUser(loginUser)
}

async function logout() {
  await userService.logout()
  authList.value = []
  userStore.removeUser()
}
</script>

<style lang="scss" scoped>
.welcome-page {
  padding: 3rem;
  text-align: center;
}
</style>
