import useLogger from '@/utils/useLogger'
import {
  Feed
} from '@/domain/Feed'
import * as feedApi from '@/api/feedApi'
import {
  List
} from 'modelist2'

const logger = useLogger('feedService')

export async function getFeeds(options) {
  const data = await feedApi.getFeeds(options).then(json => json.data)
  logger.log('getFeeds data:', data)
  let feedList = new List(data, Feed)
  let no = 0
  // 利用modellist进行数据加工
  feedList.format({
    title(source) {
      no++
      return source.title + no + no
    }
  })
  console.log('feedList', feedList)
  return feedList.toJSON()
}