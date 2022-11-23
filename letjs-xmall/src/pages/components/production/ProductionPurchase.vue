<template>
  <div class="production-purchase">
    <div class="production-purchase-title">{{ productionPurchase.name }}</div>
    <div class="production-purchase-promption">
      {{ productionPurchase.promption }}
    </div>
    <div class="production-purchase-price">
      <dt>价格 ：</dt>
      <dd>
        <span class="production-purchase-unit">￥ </span>
        {{ productionPurchase.price }}
      </dd>
    </div>
    <div class="production-purchase-info">
      <dl>
        <dt class="production-purchase-prop">库存：</dt>
        <dd class="production-purchase-remain">
          {{ productionPurchase.remain }}
        </dd>
      </dl>
      <dl :class="purchaseErrorClass['color']">
        <dt class="production-purchase-prop">颜色：</dt>
        <dd
          class="production-purchase-colors"
          :initColor="defaultPurchaseColor"
        >
          <a
            v-for="color in productionPurchase.colorsList"
            :key="color.name"
            href="#"
            :style="{ borderColor: color.name }"
            :class="selectedColorCssName[color.no]"
            @click="chooseColor(color.no)"
            >{{ color.text }}</a
          >
        </dd>
        <span class="production-purchase-error">{{
          validation['color'].warn
        }}</span>
      </dl>
      <dl :class="purchaseErrorClass['size']">
        <dt class="production-purchase-prop">尺寸：</dt>
        <dd class="production-purchase-size" :initSize="defaultPurchaseSize">
          <a
            href="#"
            v-for="size in productionPurchase.sizes"
            :key="size"
            @click="chooseSize(size)"
            :class="productionPurchase.selectedSizeCssName[size]"
            >{{ size }}</a
          >
        </dd>
        <span class="production-purchase-error">{{
          validation['size'].warn
        }}</span>
      </dl>
    </div>
    <div
      :class="
        purchaseErrorClass['purchaseQuantity'] + ' production-purchase-buy'
      "
    >
      <div v-if="canBuy === true" class="production-purchase-input">
        <input
          v-model="production.purchaseQuantity"
          type="number"
          min="1"
          class="production-purchase-quantity"
        />
        <button class="production-buy-submit" @click="submitToBuy(this)">
          立即购买
        </button>
      </div>
      <div v-else>
        <button class="production-sell-out">暂时无货</button>
      </div>
      <div class="production-purchase-tip">
        温馨提示· {{ productionPurchase.tip }}
        <span class="production-purchase-error">{{
          validation['purchaseQuantity'].warn
        }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, watchEffect } from 'vue'
import { COlORS_CONST, SELL_STATUS } from '@/config/productionEnum'
import { calculateStockRemain } from '@/services/productionService'
import { Production as ProductionModel } from '@/domain/production/Production'
import { ProductionPurchase as ProductionPurchaseModel } from '@/domain/production/ProductionPurchase'
import {
  purchaseValidationRules,
  purchaseValidateItem,
  purchaseValidateAll,
} from '@/composition/production'

const props = defineProps({
  productionPurchase: {
    // 这里最好是ProductionPurchaseModels?
    // 但vue props只能传递object
    type: Object,
    default: () => {
      return {}
    },
  },
})

/** 最佳实践
 * 1、建立production模型，用于购买提交
 * 2、数据纯展现相关数据，可以放在组件或composition内
 * 3、提交按钮在组件内，emit事件给父组件，由父组件再调用service传递
 */
// 商品Model初始化
const productionModel = new ProductionModel({
  purchaseQuantity: 1,
})
// 如果转为Model，可以在watch中赋值
// let productionPurchase = new ProductionPurchaseModel({})
const production = reactive(productionModel)

let canBuy = computed(() => {
  return production.sellStatus !== SELL_STATUS.soldOut
})

const purchaseErrorClass = reactive({
  size: '',
  coloor: '',
  purchaseQuantity: '',
})

// 选装状态可以新建一个数组或者追加到props中作为一个属性
// 这里color采取单独定义一个数组
const selectedColorCssName = reactive({})
// size采用追加到props的方式
// const selectedSizeCssName = reactive({})

const validation = reactive(purchaseValidationRules)

function chooseColor(color: number) {
  production.color = color
  props.productionPurchase?.colors.forEach((item: number) => {
    selectedColorCssName[item] = ''
  })
  selectedColorCssName[color] = 'selected-color-css'
  calculateStockRemain(production)
  purchaseValidateItem(production, purchaseErrorClass, 'color')
}

function chooseSize(size: number) {
  production.size = size
  props.productionPurchase.sizes.forEach((item: number) => {
    props.productionPurchase.selectedSizeCssName[item] = ''
  })
  props.productionPurchase.selectedSizeCssName[size] = 'selected-size-css'
  calculateStockRemain(production)
  purchaseValidateItem(production, purchaseErrorClass, 'size')
}

const defaultPurchaseColor = computed(() => {
  const color = props.productionPurchase.color
  return color
})

const defaultPurchaseSize = computed(() => {
  const size = props.productionPurchase.size
  return size
})

function setDefaultSelected() {
  const color = props.productionPurchase.color
  const size = props.productionPurchase.size

  // 若希望默认选中颜色和款式，则可开启默认
  // 设置默认颜色，可选
  if (selectedColorCssName[color] === undefined) {
    production.color = color
    selectedColorCssName[color] = 'selected-color-css'
  }

  // 设置默认大小，可选
  if (props.productionPurchase.selectedSizeCssName[size] === undefined) {
    production.size = size
    props.productionPurchase.selectedSizeCssName[size] = 'selected-size-css'
  }
}

watch(props, () => {
  // 也可将props转为model，然后逐个复制属性
  // if (productionPurchase.id === undefined) {
  //   Object.assign(productionPurchase, props.productionPurchase)
  //   console.log('productionPurchase:', productionPurchase)
  // }

  // 因为追加响应式内容到props里，需要初始化对象
  if (!props.productionPurchase.selectedSizeCssName) {
    props.productionPurchase.selectedSizeCssName = {}
  }

  // 是否开启默认选中?
  // setDefaultSelected()

  // 初始化产品是否处于可购买状态
  if (production.sellStatus === undefined) {
    production.sellStatus = props.productionPurchase.sellStatus
  }
})
// onMounted(() => {})

// 定义emit事件，经由父组件传递而来，再通过emits来触发
const emits = defineEmits(['submitBuy'])
function submitToBuy(evt: any) {
  // 构建production model，基于productionPurchase已经选择的数据项生成model
  if (!purchaseValidateAll(production, purchaseErrorClass)) {
    return false
  }
  production.extendsProperty(props.productionPurchase)
  console.log('原始数据:', production, props.productionPurchase, evt.$el)
  // emit事件给父级，再传递给service，通过api提交后台
  emits('submitBuy', production)
}
</script>

<style lang="scss" scoped>
.production-purchase-title {
  font: 700 20px Arial;
}
.production-purchase-price {
  display: flex;
  background-color: #f9e8e2;
  line-height: 40px;
  padding: 0 10px;
  margin: 5px 0px;
}
.production-purchase-promption {
  margin: 5px 0;
  font-size: 16px;
  color: #c9181c;
}
.production-purchase-price dt {
  color: #666;
}
.production-purchase-price {
  font-size: 20px;
  line-height: 30px;
  margin: 0;
  padding: 4px 10px;
}
.production-purchase-price dd {
  padding: 0;
  margin: 0;
  font-size: 30px;
  color: #d10a0dea;
}
.production-purchase-info {
  display: grid;
  max-width: 800px;
  flex-wrap: wrap;
  padding: 0px 10px;
  justify-content: flex-start;
}
.production-purchase-info * {
  font-size: 14px;
}
.production-purchase-info dl {
  display: flex;
  width: 100%;
  margin: 4px 0px;
  padding: 0;
}
.production-purchase-info dt {
  font-size: 14px;
  color: #7d7b7b;
  margin: 0;
  padding: 0;
  line-height: 24px;
}
.production-purchase-info dd {
  margin: 0;
  padding: 0;
}
.production-purchase-prop {
  flex-shrink: 0;
  width: 50px;
}
.production-purchase-remain {
  line-height: 24px;
}
.production-purchase-colors a {
  border: 1px outset #ccc;
  display: inline-block;
  width: 40px;
  text-align: center;
  vertical-align: baseline;
  line-height: 24px;
  margin: 0 5px;
}
.production-purchase-size a {
  border: 1px solid #ccc;
  display: inline-block;
  width: 40px;
  text-align: center;
  vertical-align: baseline;
  line-height: 24px;
  margin: 0 5px;
  background-color: #fff;
}

.selected-color-css {
  background-color: #ccc;
}
.selected-size-css {
  background-color: #ccc !important;
}
.production-purchase-quantity {
  display: block;
  font-size: 18px;
  width: 46px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #9d1b20;
}
.production-buy-submit,
.production-sell-out {
  line-height: 46px;
  padding: 0 20px;
  font-size: 18px;
  background-color: #9d1b20;
  color: #fff;
  border: 1px solid #9d1b20;
  cursor: pointer;
}
.production-sell-out {
  color: #ccc;
  border: 1px solid #d0cccc;
  background-color: #f7f7f7;
}
.production-purchase-buy {
  display: flex;
  margin: 5px 0 0 10px;
}
.production-purchase-input {
  display: flex;
}
.production-purchase-error {
  color: #cb0303cf;
}
.purchase-error-class {
  background-color: #f7d7d7;
}
.production-purchase-tip {
  vertical-align: middle;
  align-items: center;
  line-height: 50px;
  color: #7e7c7c;
  flex-direction: column;
  width: 60%;
  margin-left: 10px;
}
</style>
