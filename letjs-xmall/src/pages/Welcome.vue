<template>
  <div class="welcome-page">
    <img src="@/assets/xmall-logo.png" alt="" />
    <h1>Hi, {{ user.name }}{{ user.genderTitle }}</h1>
    <div style="padding: auto">
      <n-space justify="center">
        <n-button type="primary" size="large" @click="info">click me!</n-button>
        <n-button type="primary" secondary size="large" @click="showDialog"
          >show dialog!</n-button
        >
      </n-space>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMessage, useDialog } from 'naive-ui'
import { ref, Ref, h, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { getUser, getUserAuthList } from '@/services/userService'
import { User } from '../domain/user'
import { storeToRefs } from 'pinia'
interface userStoreInterface {
  user: Ref<User>
}

const msg = useMessage()
const dialog = useDialog()
const userStore = useUserStore()
const { user }: userStoreInterface = storeToRefs(userStore)
let authList: Ref<Array<string>> = ref([])

async function info() {
  msg.success('Oops, you find me!', {
    keepAliveOnHover: true,
  })
}
function showDialog() {
  dialog.info({
    title: 'Who am I?',
    content: () =>
      h('div', {}, [
        h('p', {}, `姓名: ${user.value.name}`),
        h('p', {}, `用户ID: ${user.value.id}`),
        h('p', {}, `性别: ${user.value.genderCh}`),
        h('p', {}, `你拥有${authList.value}`),
      ]),
  })
}
onMounted(async () => {
  // const randomUser = await getUser()
  // userStore.updateUser(randomUser)
  // authList.value = getUserAuthList(user.value)
})
</script>
<style>
.welcome-page {
  padding: 3rem;
  text-align: center;
}
</style>
