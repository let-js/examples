<template>
  <div>
    <div class="login-form">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input
            type="text"
            v-model="form.name"
            placeholder="任意填写"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="任意填写"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSubmit">登录</el-button> <span style="color:red;margin-left:10px">{{ loginErrorMsg }}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .login-form {
    max-width: 1280px;
    margin: 0 auto;
    background: #e6e9ef;
    border-radius: 15px;
    padding: 10px;
  }
  .login-form {
    .el-form {
      width: 60%;
      width: 300px;
      margin: auto;
    }
  }
</style>
<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '@/stores/userStore'
  import * as userService from '@/services/userService'
  import CommonUtil from '@/utils/CommonUtil'
  const router = useRouter()
  const userStore = useUserStore()
  // 组件响应式数据
  const form = reactive({
    name: 'test',
    password: 'test$123'
  })
  const loginErrorMsg = ref('')

  async function onSubmit() {
    console.log('form:', form.name, form.password)
    let name = form.name
    let password = form.password
    const loginUser = await userService.login({ name, password })
    if (loginUser) {
      userStore.updateUser(loginUser)
      router.push({
        path: '/'
      })
    } else {
      loginErrorMsg.value = '登录失败'
    }
  }
</script>
