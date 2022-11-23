<template>
  <dl class="search-item" @click="clickSearchItem(this)">
    <a href="#"
      ><dt>{{ searchItem.title }}</dt>
      <dd>
        <img :src="searchItem.image" />
        <p>{{ searchItem.content }}</p>
      </dd>
    </a>
  </dl>
</template>
<script setup lang="ts">
/** 最佳实践
 * 1、此组件是搜索列表的子组件，负责具体的内容展现。
 */
const props = defineProps({
  searchItem: {
    type: Object,
    default: () => {
      return {}
    },
  },
  searchQuery: {
    type: String,
    default: '',
  },
})
function clickSearchItem(item: any) {
  alert(item.$el.outerHTML)
}
</script>
<style lang="scss" scoped>
.search-item {
  margin: 15px;
  overflow: hidden;
  display: inline-block;
  width: 100%;
  height: 120px;
}
.search-item dt {
  margin: 0;
  font-size: 1.5em;
}
.search-item dd {
  padding: 0;
  margin: 0;
}
.search-item dd p {
  margin: 0 10px;
}
.search-item img {
  float: left;
  clip: rect(0, 150px, 100px, 0);
  margin-right: 15px;
  width: 150px;
  height: 100px;
}
</style>
