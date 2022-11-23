<template>
  <div class="banner">
    <a href="#" @click="clickBanner(banner)">
      <img :class="bannerEffectCss" :src="banner.src" :alt="banner.text" />
    </a>
  </div>
</template>
<script setup lang="ts">
import { useDialog } from 'naive-ui'
import { reactive, ref, h, onMounted, onUnmounted, watch } from 'vue'
import useLogger from '@/utils/useLogger'
import { VueLogger } from 'vue-logger-plugin'
import { BannerType } from '@/types/banner'
const logger: VueLogger = useLogger()

/** 最佳实践
 * 1. 图片组件数据来自后端，banner为数据model
 * 2. 通过api获取数据，通过service传递数据
 * 3. 组件只写ui展现相关逻辑，数据组织和格式化交由service
 * 4. 组件的数据由父组件通过props方式传入，子组件只跟父组件打交道
 */

// banner数据，由props传入，设置默认值和可选
const props = withDefaults(
  defineProps<{
    bannerList: Array<BannerType>
    switchTime?: number
    durationTime?: number
  }>(),
  {
    bannerList: () => [],
    switchTime: 3000,
    durationTime: 1500,
  },
)

// banner组件变量，这里需要初始值，略显啰嗦
const banner: BannerType = reactive({ id: -1, src: '', text: '', url: '' })
// banner运动效果css
let bannerEffectCss = ref('')
// 当前banner下标
let currentBannerIdx = 0

// 定时器
let intervalTimer: number
let timeoutTimer: number
// 切换常量
const SWITCH_TIME_MS = props.switchTime ? props.switchTime : 3000
const DURATION_TIME_MS = props.durationTime ? props.durationTime : 2000

// banner轮播展现，写在组件中
function displayBanner(bannerList: Array<BannerType>, bannerListLen: number) {
  bannerEffectCss.value = ''
  // bannerEffectCss.value = "banner-effect-out";
  clearTimeout(timeoutTimer)
  timeoutTimer = setTimeout(() => {
    if (currentBannerIdx >= bannerListLen - 1) {
      currentBannerIdx = 0
    } else {
      currentBannerIdx++
    }
    Object.assign(banner, bannerList[currentBannerIdx])
    bannerEffectCss.value = 'banner-effect-in'
    // logger.log(
    //   'bannerList:',
    //   props.bannerList,
    //   'currentBannerIdx:',
    //   currentBannerIdx,
    // )
  }, DURATION_TIME_MS)
}

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

// bannerList是异步数据，banner变量需要watch props或computed赋值
watch(props, () => {
  Object.assign(banner, props.bannerList[currentBannerIdx])
  const bannerListLen = props.bannerList.length
  intervalTimer = setInterval(() => {
    displayBanner(props.bannerList, bannerListLen)
  }, SWITCH_TIME_MS)
})

// 组件挂载后在组件创建时获取不到异步数据
// onMounted(async () => {})

// 组件卸载时移除定时
onUnmounted(() => {
  clearInterval(intervalTimer)
})
</script>

<style lang="scss" scoped>
.banner {
  height: 360px;
  // margin: 0 200px;
  text-align: center;
  overflow: hidden;
}
.banner img {
  width: 100%;
}
.banner-effect-in {
  // transition: all 500ms;
  // opacity: 0.8;
  animation: opacity 2s infinite;
  @keyframes opacity {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
}
.banner-effect-out {
  // transition: all 500ms;
  // opacity: 0.8;
  animation: opacity 2s infinite;
  @keyframes opacity {
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
