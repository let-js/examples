import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ResponseCode } from '@/config/requestEnum'
import router from '@/router'
import useLogger from '@/utils/useLogger'

const logger: VueLogger = useLogger()

// 此处封装全局请求默认参数
const request = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60,
  withCredentials: true,
})
// 此处可封装全局请求拦截器
request.interceptors.response.use(
  (response: AxiosRequestConfig) => {
    const code = response.data.code
    if (code === ResponseCode.SUCCESS_CODE) {
      return response.data
    } else if (code === ResponseCode.NOAUTH_CODE) {
      router.replace({
        path: '/no-permission',
        query: {
          redirect: router.currentRoute.value.fullPath,
        },
      })
    } else {
      // logger.info('The response code is not success.', 'data:', response.data)
      return response.data
    }
  },
  (error) => {
    Promise.reject(error)
  },
)
export interface Response {
  code: string
  data: any
  msg: string
}

export default request
