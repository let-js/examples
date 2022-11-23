<template>
  <div class="produciton-list" v-for="item in productionList">
    <div class="produciton-list-title">{{ item.title }}</div>
    <div class="produciton-list-box">
      <ImageList :imageList="item.productions">传入数据</ImageList>
    </div>
  </div>
</template>
<script setup lang="ts">
/** 最佳实践
 * 1、列表组件再嵌套图片列表组件，这样无需写两个组件
 * 2、数据经由页面的props传递，页面组件跟service交互，减少组件或子组件直接与页面service交互
 * 3、可以跨页面引用组件，这里ImageList放在/pages/compoonets/下更好
 */
import ImageList from '@/pages/components/index/ImageList.vue'
const props = defineProps({
  productionList: {
    type: Array,
    default: () => {
      return []
    },
  },
})
</script>

<style lang="scss" scoped>
.produciton-list {
  margin-top: 10px;
  height: 460px;
  overflow: hidden;
}
.produciton-list-title {
  padding-left: 15px;
  color: #fff;
  font-size: 20px;
  text-align: left;
  height: 36px;
  background-color: #9d1b20;
}
.produciton-list-box {
  padding-top: 10px;
  overflow: hidden;
  // border: 1px solid #9d1c1f;
}
</style>
