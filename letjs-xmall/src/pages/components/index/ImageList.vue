<template>
  <div class="image-list-containert">
    <n-ul class="image-list">
      <li v-for="(image, idx) in imageList" :key="idx" class="image-item">
        <router-link :to="{ name: 'production', params: { id: image.id } }"
          ><img :src="image.src"
        /></router-link>
        <br />
        <router-link :to="{ path: '/production', query: { id: image.id } }"
          >{{ image.name }}{{ idx }}</router-link
        >
      </li>
    </n-ul>
  </div>
</template>
<script setup lang="ts">
import _ from 'lodash'
/** 最佳实践
 * 1、组件主要用于首页，以后也可以用于其他页面，因此放在页面下。
 * 2、组件可以跨页面调用，但是当多个页面共用时，尽量把组件抽离到页面公共或全局公共中。
 */
const props = defineProps({ imageList: Array })
</script>
<style lang="scss" scoped>
.image-list-container {
  background-color: #9d1b20;
  margin: 0;
  height: 80px;
  text-align: center;
}
.image-list {
  width: 100%;
  // justify-content: flex-end;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  // justify-content: left;
  justify-content: space-between;
}
.image-list .image-item {
  margin: 0px 15px 20px 15px;
  background-color: #fff;
  overflow: hidden;
  width: 220px;
  height: 190px;
}
.image-list .image-item img {
  max-height: 150px;
}
</style>
