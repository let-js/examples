import request, { Response } from '@/utils/request'

export async function getBannerList(): Promise<Response> {
  const response: Response = await request.get('./api/index/banner-list')
  return response
}

export async function getProductionList(): Promise<Response> {
  const response: Response = await request.get('./api/index/production-list')
  return response
}
