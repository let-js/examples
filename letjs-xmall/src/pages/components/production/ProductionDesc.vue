<template>
  <div class="production-desc-title">商品介绍</div>
  <div class="production-desc-body" v-html="productionDesc"></div>
</template>
<script setup lang="ts">
const props = defineProps({
  productionDesc: String,
})
</script>

<style lang="scss" scoped>
.production-desc-body {
  overflow: hidden;
}
.production-desc-title {
  padding-left: 15px;
  color: #fff;
  font-size: 20px;
  text-align: left;
  height: 36px;
  background-color: #9d1b20;
}
</style>
