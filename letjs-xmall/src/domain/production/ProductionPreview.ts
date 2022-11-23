// 这里preview比较简单，实际会比较复杂
// 因此采用model，否则采用type即可
import { ProductionImage } from '@/domain/production/ProductionImage'
export class ProductionPreview {
  id: number
  image?: ProductionImage
  video?: object
  // 预览也有很多属性
  // ……
  constructor(data: ProductionPreview) {
    this.id = data.id
    this.image = data.image
  }

  // src 来自于image对象
  get src() {
    return this?.image?.src
  }
}
