import {
  Model,
  List
} from 'modelist2'

const formatters = {
  viewMessage(source) {
    return source.businessMessage
  }
}

class Greeting extends Model {
  constructor(source, customFormatters) {
    super()
    this.define({
      viewMessage: ''
    })
    this.init(source, Object.assign({}, formatters, customFormatters))
  }
}

export default Greeting