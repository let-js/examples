import useLogger from '@/utils/useLogger'
import { VueLogger } from 'vue-logger-plugin'
import { SearchType } from '../types/search'
import * as searchApi from '@/api/searchApi'
const logger: VueLogger = useLogger()

/**
 * 从后端查询数据而来
 */
export async function getDefaultKeyWords(): Promise<string> {
  // 原始数据来自API
  const res = await searchApi.getDefaultKeyWords()
  const defaultKeyWord = res.data.default
  return defaultKeyWord
}

/**
 * 通过api查询结果
 */
export async function search(keyword: string): Promise<SearchType> {
  // 这里做一些逻辑与系统或页面有关的逻辑处理
  const res = await searchApi.search(keyword)
  const data = res.data
  data.result = data.list
  delete data.list
  data?.result?.forEach((item: any) => {
    const reg = /\.\.\/\.\.\/assets\//gi
    item.image = item.image.replace(reg, '/src/assets/')
  })
  return data
}
