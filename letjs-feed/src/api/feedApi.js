import request from '@/utils/request'
import useLogger from '@/utils/useLogger'
const logger = useLogger('feedApi')
export async function getFeeds(options) {
  return await request.get('/api/feeds', options)
}