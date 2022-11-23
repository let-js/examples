import BaseModel from '../baseModel'
import { ProductionImage } from '@/domain/production/ProductionImage'
import { Shop } from '@/domain/shop/Shop'
import { ColorsListType } from '@/types/production'
// 可以从Production扩展而来
export class ProductionPurchase extends BaseModel {
  id: number
  name: string
  promption?: string
  price: number
  remain?: number
  colors?: number[]
  color?: number
  sizes?: number[]
  size?: number
  tip?: string
  // 1 有货 0 无货
  sellStatus?: number
  // shop和previewInfo处理后追加
  shop?: Shop
  colorsList?: ColorsListType[]
  image?: ProductionImage
  constructor(data: ProductionPurchase) {
    super()
    this.id = data.id
    this.name = data.name
    this.promption = data.promption
    this.price = data.price
    this.remain = data.remain
    this.colors = data.colors
    this.color = data.color
    this.sizes = data.sizes
    this.size = data.size
    this.tip = data.tip
    this.sellStatus = data.sellStatus
    this.shop = data.shop
  }
}
