<template>
  <div class="production-preview">
    <div class="production-preview-img">
      <span class="production-preview-tip"
        >over={{ mouseIsOverImage }} | position: {{ position.offsetX }} x
        {{ position.offsetY }} |
        <br />
        {{ posComputed }} |
        {{ posWatch }}
      </span>
      <img
        :src="productionPreview.src"
        width="800"
        @mouseover="overImage()"
        @mouseleave="leaveImage()"
        @mousemove="mouseMoving($event)"
        @click="clickPreview()"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
/** 最佳实践
 * 1、内容数据来自父组件传递，开放options给调用方
 * 2、业务逻辑交由页面service，UI交互放在组件内
 */
const props = defineProps({
  productionPreview: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

// 定义响应式数据，根据鼠标做出响应，便于放大缩小查看，这里只是简单示意
const position = reactive({})
let mouseIsOverImage = ref(false)

function watchMouse() {
  posWatch.x = window.screen.availWidth - position.offsetX
  posWatch.y = window.screen.availHeight - position.offsetY
}

// 事件方法放在一起
function mouseMoving(event: Object) {
  position.offsetX = event.offsetX
  position.offsetY = event.offsetY
}
function overImage() {
  mouseIsOverImage.value = true
}
function leaveImage() {
  this.mouseIsOverImage = false
}
function clickPreview() {
  alert(JSON.stringify(this))
}

// 页面事件执行放在最后
// 定义计算属性，实时计算鼠标坐标
const posComputed = computed(() => {
  return {
    x: window.screen.width - position.offsetX,
    y: window.screen.height - position.offsetY,
  }
})
// 定义watch属性，实时监听鼠标坐标
const posWatch = {}
watch(position, () => {
  watchMouse()
})
</script>

<style lang="scss" scoped>
.production-preview {
  flex-shrink: 0;
  width: 500px;
  overflow: hidden;
}
.production-preview-tip {
  display: inline-block;
  position: absolute;
  color: #555;
}
</style>
