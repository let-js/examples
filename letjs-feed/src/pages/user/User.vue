<template>
  <div class="user-container">
    <h3>{{ user }}</h3>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .user-container {
    max-width: 1260px;
    margin: 0 auto;
    background: #e6e9ef;
    border-radius: 15px;
    padding: 20px 10px;
    text-align: center;
  }
</style>
<script setup>
  import * as userService from '@/services/userService'
  const router = useRouter()
  const $route = router.currentRoute.value
  const user = ref({})
  const uid = ref({})

  onMounted(async () => {
    uid.value = $route.params.uid
    const userData = userService.getUser(uid.value)
    user.value.userId = userData.userId
    user.value.userName = '根据uid从后台查询'
  })
</script>
