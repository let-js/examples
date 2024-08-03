<template>
  <div class="text-center logout-container">
    <h3>您已经退出系统，请点击<a href="/login">登录</a></h3>
  </div>
</template>
<style lang="scss" scoped>
  .logout-container {
    max-width: 1260px;
    margin: 0 auto;
    background: #e6e9ef;
    border-radius: 15px;
    padding: 10px;
  }
</style>
<script setup>
  import { useUserStore } from '@/stores/userStore'
  const userStore = useUserStore()
  userStore.removeUser()
</script>
