<template>
  <div class="pay-page">
    <div class="pay-container">
      <h1>这里是支付页，购买的产品ID：{{ productionId }}</h1>
      <code
        style="
          display: block;
          border: 1px solid gray;
          margin: 20px;
          padding: 20px;
          background-color: #fff;
        "
      >
        {{ productionData }}
      </code>

      这里只是演示数据流转，数据应从购物车里查询出来。
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductionStore } from '@/stores/productionStore'
const productionStore = useProductionStore()
const { production } = storeToRefs(productionStore)
const router = useRouter()
const $route = router.currentRoute.value
// 真实支付页很复杂，这里不再模拟
// 支付有多种情况，有统一支付，也有单独针对某个产品支付
// 统一支付时需要查询购物车列表准备支付
// 单独支付则由购买页直接跳转而来则可以从store取出数据来用
const productionId = $route?.query.id
const productionData = production.value
</script>
<style>
.pay-page {
  width: 100%;
  text-align: center;
}
.pay-container {
  min-width: 1020px;
  width: 80%;
  margin: 0 auto;
  background-color: #f1f1ff;
  padding: 40px 0;
}
.pay-container h1 {
  margin: 0px;
}
.pay-container .pay-login-btn {
  font-size: 1em;
  text-decoration: underline;
}
</style>
