<template>
  <div id="SearchInput" class="search-box">
    <input
      v-model="searchValue"
      class="search-input"
      placeholder="请输入内容"
      size="40"
      maxlength="200"
    />
    <button @click="onSearch(this)">搜索</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { getDefaultKeyWords } from '@/services/searchService'
import { $events } from '@/utils/events'
import EventConfig from '@/config/eventConfig'
const router = useRouter()

// 组件响应式数据
let searchValue = ref('')

onMounted(async () => {
  // 搜索属于全局公共组件，数据直接调用serchService
  const data = await getDefaultKeyWords()
  searchValue.value = data
})

// 组件事件，真正发起搜索交给searchService来处理
const message = useMessage()
async function onSearch(evt: any) {
  message.success('您搜索了：' + searchValue.value)
  // message.success('搜索结果：' + JSON.stringify(result))
  console.log(evt.$el.outerHTML)
  router.push({
    name: 'search',
    query: { q: searchValue.value },
  })

  $events.emit(EventConfig.SearchBox_onSearch, { q: searchValue.value })
}
</script>
<style lang="scss" scoped>
.search-box {
  display: flex;
  margin: auto;
  align-content: center;
}
.search-box input {
  height: 36px;
  padding: 0 6px;
  border: 2px solid #cf3137;
  width: 500px;
}
.search-box input:focus {
  border: 2px solid #da070e;
}
.search-box button {
  height: 40px;
  width: 60px;
  color: #fff;
  cursor: pointer;
  background-color: #cf3137;
  border: 1px solid #cf3137;
}
</style>
