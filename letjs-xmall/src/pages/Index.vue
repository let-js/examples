<template>
  <!--页面只是一个架子，用于嵌入组件和传递数据 -->
  <div class="index-page">
    <div class="banner-container">
      <Banner :banner-list="bannerList"></Banner>
    </div>
    <div class="content-container">
      <div class="side-bar-container">
        <Sidebar :shop-list="shopList"></Sidebar>
      </div>
      <div class="production-list-container">
        <ImageList :image-list="productionList"></ImageList>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive, watchEffect, computed } from 'vue'
import Banner from './components/index/Banner.vue'
import Sidebar from './components/index/Sidebar.vue'
import ImageList from './components/index/ImageList.vue'
import { BannerType } from '@/types/banner'
import { ShopListType } from '@/types/shop'
import { Production } from '@/domain/production/Production'
import {
  getBannerList,
  getShopList,
  getAndProcessProductionList,
  processBannerList,
} from '@/services/indexService'

// 数据1 ref响应式数据
const bannerList = ref(Array<BannerType>())

// 数据2 定义的ref响应式数据，规定了复杂数据结构
const shopList = ref(Array<ShopListType>())

// 数据3 reactive相应式数据
const productionList = reactive(Array<Production>())

// 调用service异步获取数据方法，可通过promise处理
// 异步调用不会形成阻塞
getAndProcessProductionList().then((data: Production[]) => {
  // 这里是示意，如果是整体替换reactive不如ref方便
  productionList.length = 0
  data.forEach((item: Production) => {
    productionList.push(item)
  })
})

// 按生命周期父组件mounted是最后一步
// onMounted通过await来获取异步数据
onMounted(async () => {
  const bannerListData: Array<BannerType> = await getBannerList()
  processBannerList(bannerListData)
  bannerList.value = bannerListData
  const shopListData: ShopListType[] = await getShopList()
  shopList.value = shopListData
})
</script>
<style lang="scss" scoped>
.index-page {
  width: 100%;
  text-align: center;
}
.banner-container {
  background-color: #f1f1ff;
}
.content-container {
  display: flex;
  flex-direction: row;
  background: #f1f1ff;
  min-width: 1020px;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;
  min-height: 1200px;
}
.side-bar-container {
  width: 20%;
  margin-right: 15px;
  min-width: 250px;
}
.production-list-container {
  flex-wrap: wrap;
  width: 100%;
}
</style>
