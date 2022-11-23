<template>
  <div class="channel-page">
    <div class="channel-container">
      <div class="channel-nav-container">
        <ShopNav
          :shop="shop"
          :channel-list="channelList"
          :channel-page="channelPage"
          @change-shop-nav="changeShopNav"
        ></ShopNav>
      </div>
      <div class="channel-list-container">
        <h1>这里是店铺频道公共模板页面！</h1>
        <pre>
店铺信息如下：
店铺名称： {{ shopName }}
频道页面： {{ channelPage }}
频道名称：{{ channelPageName }}
        </pre>
        <code>
          <pre
            >{{ shop }}
          </pre>
        </code>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, reactive, ref, watchEffect } from 'vue'

import ShopNav from '@/pages/components/shop/ShopNav.vue'
import Banner from '@/pages/components/index/Banner.vue'
import ProductionList from '@/pages/components/production/ProductionList.vue'
import { Shop } from '@/domain/shop/shop'
import { Channel } from '@/domain/shop/Channel'
import { storeToRefs } from 'pinia'
import { useShopStore } from '@/stores/shopStore'
import { getShopByName } from '@/composition/shop'
import {
  getChannelListById,
  getShopChannelByPage,
} from '@/services/shopService'

const router = useRouter()
const $route = router.currentRoute.value
const params = $route?.params
const shopName = params?.name as string
// channelPage会动态变化，因此是ref类型
let channelPage = ref(params?.page as string)
let currentChannel: Channel
// 声明shop响应式数据
let shop = reactive({})
let channelList = ref(Array<Channel>())
let channelPageName = ref('')

function setTitle({ pageName = '', shopName = '', channelPageName = '' }) {
  document.title = pageName + '_' + shopName + '_ ' + channelPageName
}

// 传给子组件的事件
function changeShopNav(channel: Channel) {
  channelPage.value = channel.page
  currentChannel = getShopChannelByPage(channelList.value, channelPage.value)
  channelPageName.value = currentChannel.name

  // 延迟动态设置title
  setTimeout(() => {
    setTitle({
      pageName: String($route.meta.title),
      shopName: shopName,
      channelPageName: channelPageName.value,
    })
  }, 0)
}

// 挂载获取异步数据
onMounted(async () => {
  const shopStore = storeToRefs(useShopStore())
  let shopData: Shop = shopStore.shop.value
  // 减少重复请求，如果store里的shop不一致，则根据shop名称重新获取
  if (shopData.name !== shopName) {
    console.log('store没有shop数据，重新发起请求')
    shopData = await getShopByName(shopName)
  }

  Object.assign(shop, shopData)
  const shopId = shopData.id

  // 获取频道列表
  const channelListData: Channel[] = await getChannelListById(shopId)
  channelList.value = channelListData

  // 获取当前频道信息
  currentChannel = getShopChannelByPage(channelList.value, channelPage.value)
  channelPageName.value = currentChannel.name

  // 动态设置title
  setTitle({
    pageName: String($route.meta.title),
    shopName: shopName,
    channelPageName: channelPageName.value,
  })
})
</script>
<style lang="scss" scoped>
.channel-page {
  width: 100%;
  text-align: center;
}
.channel-container {
  min-width: 1020px;
  width: 80%;
  margin: 0 auto;
}
.channel-list-container {
  vertical-align: center;
  background: #f1f1ff;
}
.channel-list-container h1 {
  margin: 0;
}
.channel-list-container pre {
  text-align: left;
  margin: auto;
  width: 400px;
}
</style>
