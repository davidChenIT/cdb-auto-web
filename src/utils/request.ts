import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { DeviceEnum } from '@/config'
import { getToken, getLanguage } from '@/utils/auth'
import { roleChangeLogOutFunc } from '@/utils/permission'
import useStore from '@/stores/index'
// import { urls as noUrls } from '@/utils/noLoadingUrls'
import { ElLoading } from 'element-plus'
import { AccountVerifyAlert } from '@/utils/public'

// 重写axios请求配置
interface CustomAxiosRequest extends AxiosRequestConfig {
  noModel?: boolean
}
let noPermission = 0

// 重写axios响应配置
interface CustomAxiosResponse extends AxiosResponse {
  config: CustomAxiosRequest
}

// 对axios实例函数改造，因为response拦截器已经返回data
interface CustomAxios extends AxiosInstance {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: CustomAxiosRequest): Promise<any>
}

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 600000, // 请求超时时间
  headers: {
    'Content-type': 'application/json;charset=utf-8',
    DeviceType: DeviceEnum.PC, // 设备类型
    SystemId: 1,
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const err = (error: any) => {
  setLoading(false, error.config?.noModel)
  if (error.response) {
    ElMessage.error(error.response.statusText)
  }
  return Promise.reject(error)
}

// 错误提示函数
const errMessageFn = (code: number, errorMessage?: string) => {
  if (code === 706) {
    // 登录过期
    AccountVerifyAlert()
  } else if (code === 702 && noPermission === 0) {
    roleChangeLogOutFunc()
  } else {
    ElMessage.error(errorMessage)
  }
}

let loadingInstance: any = null

const setLoading = (loading: boolean, noModel?: boolean) => {
  const { appStore } = useStore()
  // console.log(appStore, 'store')
  // store.dispatch('app/setLoading', loading) // 记录loading的次数
  loading ? ++appStore.loadingNum : --appStore.loadingNum
  // 根据参数noModel 设置是否需要全局loading
  if (!noModel) {
    if (appStore.loadingNum > 0) {
      loadingInstance = ElLoading.service({
        text: '加载中...',
        lock: true,
        background: 'rgba(0, 0, 0, 0.5)',
      })
    }
  }

  //api请求次数为0时关闭loading
  if (appStore.loadingNum <= 0) {
    loadingInstance?.close()
  }
}

// request interceptor
service.interceptors.request.use((config: CustomAxiosRequest) => {
  setLoading(true, config?.noModel)

  const token = getToken() || ''
  if (token) {
    config.headers && (config.headers['Authorization'] = `Bearer ${token}`)
  }

  const language = getLanguage()

  if (language) {
    config.headers && (config.headers['Accept-Language'] = language)
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response: CustomAxiosResponse) => {
  setLoading(false, response?.config?.noModel)

  const { code, errorMessage } = response.data
  if (code !== 200) {
    errMessageFn(code, errorMessage)
    return Promise.reject(response.data)
  } else {
    noPermission = 0
  }

  return response.data
}, err)

export default service as CustomAxios
