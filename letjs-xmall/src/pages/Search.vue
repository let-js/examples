import { onMounted } from "vue" import { onMounted } from "vue" import {
onMounted } from "vue"

<template>
  <div class="search-page">
    <div class="search-container">
      <div>
        <h2 class="search-title">
          搜索
          <span style="color: #cf3137; font-size: 1em">{{ searchValue }}</span>
          结果如下：
        </h2>
        <em class="search-count">共 {{ searchCount }} 条</em>
      </div>
      <hr />
      <SearchList
        :search-list="searchList"
        :search-query="searchValue"
      ></SearchList>
    </div>
  </div>
</template>
<script setup lang="ts">
import { search } from '@/services/searchService'
import { SearchResultType } from '@/types/search'
import { computed, onMounted } from 'vue'
import { $events } from '@/utils/events'
import EventConfig from '@/config/eventConfig'
import SearchList from './components/search/SearchList.vue'
const router = useRouter()
const $route = router.currentRoute.value
// 这里简单模拟下搜索页
const searchValue = ref($route?.query.q)
const searchCount = ref(0)
const searchList = ref(Array<SearchResultType>())

async function onSearch({ q = '' }) {
  const data = await search(q)
  const result = data.result
  searchValue.value = q
  searchCount.value = data.pageCount
  searchList.value = result
  document.title = $route.meta.title + '_' + q
}

$events.on(EventConfig.SearchBox_onSearch, (data: any) => {
  onSearch(data)
})

onMounted(() => {
  onSearch({ q: searchValue?.value?.trim() })
})
</script>
<style>
.search-page {
  width: 100%;
}
.search-container {
  padding: 10px 20px;
  min-width: 1020px;
  width: 80%;
  margin: 0 auto;
  background-color: #f1f1ff;
}
.search-count {
  float: right;
  margin-top: -40px;
}
.search-container .search-login-btn {
  font-size: 1em;
  text-decoration: underline;
}
</style>
