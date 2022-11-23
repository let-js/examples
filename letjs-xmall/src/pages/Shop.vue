<template>
  <div class="shop-page">
    <div class="shop-container">
      <div class="shop-nav-container">
        <ShopNav :shop="shop" :channel-list="channelList"></ShopNav>
      </div>
      <div class="banner-container">
        <!--// 使用banner组件或者采用navie ui组件
          <Banner
          :banner-list="bannerList"
          :switch-time="3000"
          :duration-time="2000"
        ></Banner> -->
        <n-carousel autoplay class="banner-list">
          <img
            v-for="(banner, idx) in bannerList"
            :key="idx"
            class="carousel-img"
            :src="banner.src"
            @click="clickBanner(banner)"
          />
        </n-carousel>
      </div>
      <div class="produciton-list-container">
        <ProductionList :production-list="productionList"></ProductionList>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watchEffect, ref, onMounted } from 'vue'
import { useDialog } from 'naive-ui'
import { useRouter } from 'vue-router'
import ShopNav from './components/shop/ShopNav.vue'
import Banner from './components/index/Banner.vue'
import { BannerType } from '@/types/banner'
import { ProductionListType } from '@/types/production'
import ProductionList from './components/production/ProductionList.vue'
import { Shop } from '@/domain/shop/shop'
import { Channel } from '@/domain/shop/Channel'
import { getShopByName } from '@/composition/shop'
import {
  getChannelListById,
  getBannerListById,
  getProductionListById,
} from '@/services/shopService'

const router = useRouter()
const $route = router.currentRoute.value
const shopName = $route?.params?.name as string

const shop = ref({})
const bannerList = ref(Array<BannerType>())
const channelList = ref(Array<Channel>())
const productionList = ref(Array<ProductionListType>())

// onMounted异步数据获取
onMounted(async () => {
  const shopData: Shop = await getShopByName(shopName)
  shop.value = shopData
  const shopId: number = shopData.id
  document.title = $route.meta.title + '_' + shopData.chineseName

  const bannerListData: BannerType[] = await getBannerListById(shopId)
  bannerList.value = bannerListData

  const channelListData: Channel[] = await getChannelListById(shopId)
  channelList.value = channelListData

  const productionListData: ProductionListType[] = await getProductionListById(
    shopId,
  )
  productionList.value = productionListData
})

// 点击banner跳转或其他操作
const dialog = useDialog()
function clickBanner(banner: BannerType) {
  dialog.info({
    title: banner.text,
    style: 'width:100%',
    content: () =>
      h('div', {}, [h('img', { src: banner.src, style: 'width:100%' })]),
  })
}
</script>
<style lang="scss" scoped>
.shop-page {
  width: 100%;
  text-align: center;
}
.shop-container {
  min-width: 1020px;
  width: 80%;
  margin: 0 auto;
}
.banner-container {
  height: 300px;
  overflow: hidden;
}
.banner-container img {
  cursor: pointer;
  width: 100%;
}
.produciton-list-container {
  min-height: 1000px;
  background: #f1f1ff;
}
.produciton-list {
  margin-top: 10px;
  border: 1px solid #9d1c1f;
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
}
</style>
