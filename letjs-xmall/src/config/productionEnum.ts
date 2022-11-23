export const COlORS_CONST = {
  11: 'white',
  12: 'black',
  14: 'red',
  15: 'blue',
  16: 'yellow',
  17: 'orange',
  18: 'gray',
}
export const COLORS_DICT = {
  white: {
    value: 11,
    code: '#ffffff',
    text: '白色',
    get() {
      return this.value
    },
  },
  black: {
    value: 12,
    code: '#333333',
    text: '黑色',
    get() {
      return this.value
    },
  },
  red: {
    value: 14,
    code: '#d41f1f',
    text: '红色',
    get() {
      return this.value
    },
  },
  blue: {
    value: 15,
    code: '#0c5fd5',
    text: '蓝色',
    get() {
      return this.value
    },
  },
  yellow: {
    value: 16,
    code: '#FF9500',
    text: '黄色',
    get() {
      return this.value
    },
  },
  orange: {
    value: 17,
    code: '#FF4D00',
    text: '黄色',
    get() {
      return this.value
    },
  },
  gray: {
    value: 18,
    code: '#616161',
    text: '灰色',
    get() {
      return this.value
    },
  },
}

export const SELL_STATUS = {
  'inStock': 1,
  'soldOut': 0
}