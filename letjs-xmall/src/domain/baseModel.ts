// 追加一个baseModel，用作通用
export default class BaseModel {
  constructor() {}
  getValue(key: string) {
    return this[key as keyof typeof this]
  }

  toJSON(): object {
    return Object.assign({}, this)
  }

  toString() {
    return JSON.stringify(this)
  }
}
