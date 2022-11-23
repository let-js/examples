// 这里的image其实并没有用到，这里只是示例
// 实际情况或许需要针对image采取不同的操作，可单独建立model来处理
export class ProductionImage {
  id: number
  src: string
  width?: number
  height?: number
  constructor(data: ProductionImage) {
    this.id = data.id
    this.src = data.src
    this.width = data.width
    this.height = data.height
  }
}
