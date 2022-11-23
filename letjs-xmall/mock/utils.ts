const SUCCESS_CODE = 200
const FAILED_CODE = 500

export function responseWrapper(code: any, data: any, msg = '') {
  return {
    code: code,
    data: data,
    msg: msg,
  }
}

export function responseSuccess(data: any, message = 'success') {
  return responseWrapper(SUCCESS_CODE, data, message)
}

export function responseFailed(data: any, message = 'failed') {
  return responseWrapper(FAILED_CODE, data, message)
}

export function getParamPairs(url: string) {
  const query = url.substring(url.indexOf('?') + 1)
  const params = query.split('&')
  const pairs = params.map((item: string) => item.split('='))
  return pairs
}
