<template>
  <div class="production-page">
    <!-- 最佳实践：页面只负责布局相关，具体实现全部交由组件和子组件，通过props传递数据 -->
    <div class="production-container">
      <div class="production-nav-container">
        <ShopNav :shop="shop" :channel-list="channelList"></ShopNav>
      </div>
      <div class="production-intro-container">
        <div class="production-preview-container">
          <ProductionPreview
            :production-preview="productionPreview"
          ></ProductionPreview>
        </div>
        <div class="production-purchase-container">
          <ProductionPurchase
            :production-purchase="productionPurchase"
            @submit-buy="submitBuy"
          ></ProductionPurchase>
        </div>
      </div>
      <div class="production-content-container">
        <div class="production-desc-container">
          <ProductionDesc :production-desc="productionDesc"></ProductionDesc>
        </div>
      </div>
      <div class="relative-list-container">
        <div class="relative-list">
          <ProductionList :production-list="relationList"
            >传入数据</ProductionList
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage, useDialog } from 'naive-ui'
import { resetTracking } from '@vue/reactivity'
import { noConflict } from 'lodash'
import ProductionPreview from './components/production/ProductionPreview.vue'
import ProductionPurchase from './components/production/ProductionPurchase.vue'
import ProductionDesc from './components/production/ProductionDesc.vue'
import ShopNav from './components/shop/ShopNav.vue'
import ProductionList from './components/production/ProductionList.vue'
import { Shop as ShopModel } from '@/domain/shop/shop'
import { Channel as ChannelModel } from '@/domain/shop/Channel'
import { ProductionPreview as ProductionPreviewModel } from '@/domain/production/ProductionPreview'
import { ProductionPurchase as ProductionPurchaseModel } from '@/domain/production/ProductionPurchase'
import { ProductionListType, ProductionDescType } from '@/types/production'
import { Production as ProductionModel } from '@/domain/production/Production'
import { getShopByProductionId } from '@/composition/shop'
// service支持单个函数导入或者导入一个service文件，导入文件只有在service非常多的情形
// import * as shopService from '@/services/shopService'
import { getChannelListById } from '@/services/shopService'
import { submitToBuy } from '@/composition/production'
import {
  getProductionPreview,
  getProductionPurchase,
  getProductionDesc,
  getRelationList,
  prepareProductionPurchase,
  processProductionPurchase,
  processRelationList,
} from '@/services/productionService'

/** 最佳实践
 * 1、页面不处理具体业务逻辑，而是交由service来处理
 * 页面只负责调用service的各种函数，得到和处理为页面想要的数据
 * 2、一个页面对应一个service，主要数据从productionService来获取
 * 但也可以面向多个service，这里还可以从shopService里获取数据
 * 3、数据是否放在store里面根据数据共用的情况，共用的数据才放在store
 * shop可以放，production没必要
 * 4、页面的路由信息交由页面获取，业务处理交给service
 */
const router = useRouter()
const $route = router.currentRoute.value
let productionId: number = $route?.params?.id

if (productionId === undefined) {
  productionId = $route?.query.id
}

// 如果id为空则跳转到首页
if (!productionId) {
  router.push('/')
}

/* 获取基本店铺的信息 */
// 店铺基本信息
const shop = ref({ id: -1, name: '' })
// 频道列表
const channelList = ref(Array<ChannelModel>())
// 预览信息
const productionPreview = ref({})
// 购买产品的基本信息
const productionPurchase = ref({})
const productionDesc = ref('')
onMounted(async () => {
  const productionPreviewData: ProductionPreviewModel =
    await getProductionPreview(productionId)
  productionPreview.value = productionPreviewData

  const productionPurchaseData: ProductionPurchaseModel =
    await getProductionPurchase(productionId)

  // console.log('productionPurchaseData:', productionPurchaseData)
  document.title = $route.meta.title + '_' + productionPurchaseData.name

  const shopData: ShopModel = await getShopByProductionId(productionId)
  shop.value = shopData
  const channelListData: ChannelModel[] = await getChannelListById(shopData.id)
  channelList.value = channelListData

  const productionDescData: ProductionDescType = await getProductionDesc(
    productionId,
  )
  productionDesc.value = productionDescData.content

  // 处理产品购买数据
  prepareProductionPurchase(
    productionPurchaseData,
    shopData,
    productionPreviewData,
  )

  // 格式化购买模型
  processProductionPurchase(productionPurchaseData)

  // 最后再赋值给响应式数据
  productionPurchase.value = productionPurchaseData

  // console.log('productionPurchase::', productionPurchase.value)
})

// 相关商品列表
const relationList = ref(Array<ProductionListType>())
getRelationList(productionId).then((list: ProductionListType[]) => {
  relationList.value = list
  // 对数据的处理
  processRelationList(relationList.value)
})

const dialog = useDialog()
function showBuyDialog(production: ProductionModel) {
  dialog.info({
    title: '提示',
    style: 'width:500px;height:350px',
    positiveText: '确定',
    negativeText: '取消',
    content: () =>
      h('div', {}, [
        h('h2', {}, `祝贺您，添加购物车成功！`),
        h('hr', {}),
        h(
          'p',
          { style: { height: '100px' } },
          `id：${production.id} | name： ${production.name}
          | 颜色：${production.color} | 尺寸：${production.size},
          | 数量：${production.purchaseQuantity}`,
        ),
        h('h1', { style: { textAlign: 'center' } }, '是否跳转到支付页？'),
      ]),
    onPositiveClick: () => {
      router.push({ name: 'pay', query: { id: production.id } })
    },
  })
}
async function submitBuy(production: ProductionModel) {
  const result = await submitToBuy(production)
  console.log('提交内容:', JSON.stringify(production), '提交结果:', result)
  // 由父页面进行弹窗或跳转操作
  showBuyDialog(production)
}
</script>
<style lang="scss" scoped>
.production-page {
  width: 100%;
  text-align: center;
}
.production-container {
  min-width: 1020px;
  width: 80%;
  margin: 0 auto;
  background-color: #f1f1ff;
}
.production-intro-container {
  display: flex;
  text-align: left;
  align-content: left;
  min-height: 300px;
}
.production-preview-container {
  overflow: hidden;
}
.production-desc-container {
  margin-top: 10px;
  min-height: 800px;
}

.production-purchase-container {
  margin: 10px;
}

.production-content-container {
}

.relative-list-container {
}
.relative-list {
  // padding-top: -10px;
  // border: 1px solid #9d1c1f;
  overflow: hidden;
}
</style>
