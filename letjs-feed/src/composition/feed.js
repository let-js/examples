import useLogger from '@/utils/useLogger'
import { VueLogger } from 'vue-logger-plugin'
import { Feed } from '@/domain/feed'
import * as feedService from '@/services/feedService'
import { Feed } from '@/domain/Feed'
import { useFeedStore } from '@/stores/feedStore'

const logger = useLogger('feedComposition')


export async function getFeeds() {
  // 如果store有数据，则取store里面的数据
  const feedStoreData = useFeedStore()?.feeds
  if (!feedStoreData) {
    logger.info('取自store中的feed数据:', feedStoreData)
    return feedStoreData
  }

  // 异步请求获取数据
  const feeds = await feedService.getFeeds()
  if (!feeds) {
    logger.error(`request feeds [${feeds}] failed.`)
  }

  useFeedStore().updateFeeds(feeds)
  return feeds
}