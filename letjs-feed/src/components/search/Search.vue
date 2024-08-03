<template>
  <el-form :inline="true" class="search-form-inline">
    <el-form-item>
      <suggest></suggest>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜 索</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.search-form-inline {
  margin: -25px 0 -5px 0;
}
</style>

<script>
import Suggest from './Suggest.vue'
export default {
  name: 'search-box',
  methods: {
    onSubmit () {
      alert('你点击了搜索')
      console.log(arguments)
    }
  },
  components: {
    Suggest
  }
}
</script>
