<template>
  <div class="user-page">
    <div class="user-container">
      <div v-if="user.isLogin" class="user-content">
        <h1>{{ greetings }}</h1>
        <pre>
        {{ user }}
      </pre
        >
      </div>
      <div v-else class="user-content">
        <h1>
          您还没有登录，<a href="#" class="user-login-btn" @click="showLogin()"
            >点击登录</a
          >！
        </h1>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMessage, useDialog } from 'naive-ui'
import { ref, Ref, h, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { $events } from '@/utils/events'
import EventConfig from '@/config/eventConfig'

const msg = useMessage()
const dialog = useDialog()

// 这里在页面使用store
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const greetings = computed(() => {
  return `${user?.value.name} ${user?.value.genderTitle} ，欢迎来到个人中心!`
})

function getRefs() {
  return getCurrentInstance().ctx.$refs
}
// 调用userStore里面的事件，拉起登录框
function showLogin() {
  $events.emit(EventConfig.UserBar_showLogin)
}
onMounted(() => {
  console.log('user.vue->getRefs:', getRefs())
})
</script>
<style>
.user-page {
  width: 100%;
  text-align: center;
}
.user-container {
  min-width: 1020px;
  width: 80%;
  margin: 0 auto;
  background-color: #f1f1ff;
}
.user-content {
  padding: 50px;
}
.user-content h1 {
  margin: 0px;
}
.user-content .user-login-btn {
  font-size: 1em;
  text-decoration: underline;
}
</style>
