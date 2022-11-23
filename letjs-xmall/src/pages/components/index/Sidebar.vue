<template>
  <div class="side-bar">
    <div>
      <dl v-for="(item, idx) in shopList" :key="idx">
        <dt>{{ item.title }}</dt>
        <dd>
          <router-link
            v-for="(shop, idx) in item.shops"
            :key="idx"
            :to="{ name: 'shop', params: { name: shop.name } }"
            >{{ shop.chineseName }}</router-link
          >
        </dd>
      </dl>
    </div>
  </div>
</template>
<script setup lang="ts">
import { random } from 'lodash'
import { useMessage, useDialog } from 'naive-ui'
/**
 * 1、图片数据来自后来，经父组件props传递，各店铺也是一个domain
 * 2、业务逻辑处理交由domain，纯展现逻辑交由组件本身
 */
const props = defineProps({ shopList: Array })
</script>
<style lang="scss" scoped>
.side-bar {
  width: 100%;
  shop-align: center;
  margin-top: 3px;
}
.side-bar dl {
  margin: 0;
}
.side-bar dl dd {
  display: flex;
  flex-wrap: wrap;
  margin: 15px;
}
.side-bar dl dd a {
  font-size: 16px;
  margin: 5px;
}
.side-bar dt {
  display: block;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  color: #fff;
  shop-align: center;
  background-color: #9d1b20;
}
</style>
