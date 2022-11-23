import request, { Response } from '../utils/request'

export async function getDefaultKeyWords() {
  const response: Response = await request.get('./api/search/default')
  return response
}

export async function search(keyword: string) {
  // const data = [
  //   { id: 10001, content: keyword + '结果1' },
  //   { id: 10002, content: keyword + '结果2' },
  //   { id: 10003, content: keyword + '结果3' },
  // ]
  // return {
  //   code: 200,
  //   keyword: keyword,
  //   data: data,
  // }
  const response: Response = await request.get('./api/search?keyword', {
    params: {
      keyword: keyword,
    },
  })
  return response
}
