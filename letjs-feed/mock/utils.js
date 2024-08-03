const SUCCESS_CODE = '200'
const FAILED_CODE = '500'

export function responseWrapper(code, data, msg = '') {
  return {
    code: code,
    data: data,
    msg: msg,
  }
}

export function responseSuccess(data, message = 'success') {
  return responseWrapper(SUCCESS_CODE, data, message)
}

export function responseFailed(data, message = 'failed') {
  return responseWrapper(FAILED_CODE, data, message)
}

export function getParamPairs(url) {
  const query = url.substring(url.indexOf('?') + 1)
  const params = query.split('&')
  const pairs = params.map((item) => item.split('='))
  return pairs
}
