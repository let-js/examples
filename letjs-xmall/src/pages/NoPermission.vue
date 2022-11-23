<template>
  <div class="permission-page">
    <div class="permission-container">
      <br />
      <br />
      <h1>
        对不起，您还没有登录。<a
          href="#"
          @click="showLogin()"
          class="user-login-btn"
          >点击登录</a
        >
      </h1>
    </div>
  </div>
</template>
<script setup lang="ts">
import { $events } from '@/utils/events'
import EventConfig from '@/config/eventConfig'
// 调用userStore里面的事件，拉起登录框
function showLogin() {
  $events.emit(EventConfig.UserBar_showLogin, {
    width: 550,
    height: 250,
    onSuccess(data: any) {
      console.log('Event.UserBar->onSuccess:', data)
    },
    onCancel(data: any) {
      console.log('Event.UserBar->onCancel:', data)
    },
  })
}
</script>
<style lang="scss" scoped>
.permission-page {
  width: 100%;
  text-align: center;
}
.permission-container {
  min-width: 1020px;
  width: 80%;
  margin: 0 auto;
  background-color: #f1f1ff;
  min-height: 200px;
}
h1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
.user-login-btn {
  font-size: 1em;
  text-decoration: underline;
}
</style>
