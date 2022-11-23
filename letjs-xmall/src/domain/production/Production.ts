import BaseModel from '../baseModel'
/* domain分为model和service model */
// 1、 针对复杂domain, 可以增加service model来负责组织和串联model
// 2、model作用有3.
//  1) 格式化数据结构
//  2) 增加get扩展属性
//  3) 模型内部业务逻辑，注意不是格式转换format
import { COlORS_CONST, SELL_STATUS } from '@/config/productionEnum'
export class Production extends BaseModel {
  id: number
  name: string
  src?: string
  width?: number
  height?: number
  color?: number
  size?: number
  categoryId?: number
  category?: string
  // 1 有货 0 无货
  sellStatus?: number
  purchaseQuantity?: number
  constructor(data: Production) {
    super()
    this.id = data?.id
    this.name = data?.name
    this.src = data?.src
    this.width = data?.width
    this.height = data?.height
    this.color = data?.color
    this.size = data?.size
    this.categoryId = data?.categoryId
    this.category = data?.category
    this.purchaseQuantity = data?.purchaseQuantity
  }

  // 继承自己不存在值的属性
  extendsProperty(data: any) {
    for (const key in this) {
      if (this[key] === undefined && data[key] !== undefined) {
        this[key] = data[key]
      }
    }
  }

  // 页面展示的是title，穿过来的是category
  // 故此进行转换以适配
  get title() {
    return this.category
  }

  get colorName() {
    if (this.color != undefined) {
      return COlORS_CONST[this.color as keyof typeof COlORS_CONST]
    }
  }

  // 得到新的组合属性
  get objectSize() {
    return {
      width: this.width,
      height: this.height,
    }
  }

  set objectSize(value) {
    // console.log('set size:', value)
  }
}
