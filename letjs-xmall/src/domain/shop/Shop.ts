export class Shop {
  id: number
  name: string
  chineseName?: string
  icon?: string
  level?: number
  constructor(data: Shop) {
    this.id = data.id
    this.name = data.name
    this.chineseName = data.chineseName
    this.icon = data.icon
    this.level = data.level
  }
}
