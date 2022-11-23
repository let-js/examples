<template>
  <div class="shop-nav">
    <span class="shop-title">
      <router-link
        v-if="shop.name"
        :to="{ name: 'shop', params: { name: shop.name } }"
        >{{ shop.chineseName }}</router-link
      >
    </span>
    <ul>
      <li v-bind:key="item" v-for="item in channelList">
        <router-link
          v-if="item.page == 'index'"
          :to="{
            name: 'shop',
            params: { name: shop.name },
          }"
          :class="navSelected[item.page]"
          >{{ item.name }}</router-link
        >
        <router-link
          v-else
          :to="{
            name: 'channel',
            params: { name: shop.name, page: item.page },
          }"
          @click="changeNav(item)"
          :class="navSelected[item.page]"
          >{{ item.name }}</router-link
        >
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, PropType } from 'vue'
import { Shop } from '@/domain/shop/shop'
import { Channel } from '@/domain/shop/Channel'
import { $events } from '@/utils/events'
import EventConfig from '@/config/eventConfig'
/** 最佳实践
 * 1、非全局组件由页面发起数据请求，再传递给子组件
 * 2、导航栏属于shop页面，由shop页传递数据给导航组件
 */
const props = defineProps({
  // 店铺信息
  shop: {
    type: Object as PropType<Shop>,
    default: () => {
      return {
        id: 0,
        name: 'home',
      }
    },
  },
  // 店铺频道列表
  channelList: {
    type: Array as PropType<Array<Channel>>,
    default: () => {
      return []
    },
  },
  // 当前频道名称，默认为index
  channelPage: { type: String, default: 'index' },
})

/*
// 每个频道的selected状态，当页面加载或点击之后变更
// 格式如下：
{
  'index': 'selected'
}
*/
const navSelected = reactive({})

// 处理导航栏的数据
function setNavSelectedByChannel(
  channelList: Array<Channel>,
  channel: Channel,
) {
  channelList.forEach((item: Channel) => {
    if (item.page == channel.page) {
      navSelected[item.page] = 'selected'
    } else {
      navSelected[item.page] = ''
    }
  })
}

// 初始化设定选中频道
setNavSelectedByChannel(props?.channelList, { page: props.channelPage })

// 定义emit事件，以传递给父组件
const emits = defineEmits(['changeShopNav'])
function changeNav(channel: Channel) {
  // 更新选中导航
  setNavSelectedByChannel(props?.channelList, channel)

  // 给父组件发送消息
  emits('changeShopNav', channel)

  // 也可以触发全局切换事件
  // $events.emit(EventConfig.ShopNav_changeNav, channel)
}
</script>
<style lang="scss" scoped>
.shop-nav {
  display: flex;
  height: 50px;
  background: #9d1b20;
}
.shop-nav ul {
  display: flex;
  margin: 0;
  padding: 0;
}
.shop-nav li {
  flex-wrap: nowrap;
  list-style: none;
}
.shop-nav li a {
  background: #9d1b20ed;
  padding: 0px 15px;
  color: #fff;
  display: block;
  font-size: 18px;
  line-height: 50px;
  cursor: pointer;
}
.shop-nav li a:hover {
  color: #9d1b20;
  background-color: #fff;
}
// 计算出当前页面的selected样式给导航栏
.shop-nav li a.selected {
  // color: #9d1b20;
  // background-color: #fff;
}
// 或使用vue自带router-link-active实现选中
.shop-nav li a.router-link-active {
  color: #9d1b20;
  background-color: #fff;
}
.shop-title a {
  font: 30px arial;
  color: #fff;
  line-height: 50px;
  min-width: 180px;
  margin: 0 20px;
}
</style>
