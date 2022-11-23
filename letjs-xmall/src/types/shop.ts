// 给函数单独定义类型时采取interface的方式还是type？可以根据情况而定
import { Shop } from '@/domain/shop/Shop'
export type ShopListType = {
  category: string
  // 这里的title给展示用
  title?: string
  shops: Array<Shop>
}
