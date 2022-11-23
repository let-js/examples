<template>
  <div>
    <div
      class="search-list"
      v-for="item in searchList"
      :key="item.id"
      :search-query="searchQuery"
    >
      <SearchItem :search-item="item" :search-query="searchQuery"></SearchItem>
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchItem from './SearchItem.vue'
/** 最佳实践
 * 1、此组件是seachlist父组件，接受页面数据并嵌入item等组件，负责循环渲染。
 * 2、这里演示父子组件关系，实际上可能无需拆分成父子组件。
 */
const props = defineProps({
  searchList: {
    type: Array,
    default: () => [],
  },
  searchQuery: {
    type: String,
    default: '',
  },
})
</script>
<style lang="scss" scoped>
.search-list {
  width: 80%;
  // justify-content: flex-end;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  // justify-content: left;
  justify-content: space-between;
}
</style>
