export class Channel {
  id: number
  name: string
  href?: string
  page: string
  param?: object
  constructor(data: Channel) {
    this.id = data.id
    this.name = data.name
    this.href = data?.href
    this.page = data.page
    this.param = data?.param
  }
}
