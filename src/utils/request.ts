import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { type Method } from 'axios'
import { showToast } from 'vant'
import router from '@/router'
import { useStore } from '../stores/counter'
// import { routerKey } from 'vue-router'
const instance = axios.create({
  baseURL: '/dev-api',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const store = useStore()
    const token = store.Info?.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data.code !== 10000) {
      showToast(res.data.message)

      // 把错误的业务码返回出去
      return Promise.reject(res.data)
    }
    return res.data
  },
  (err) => {
    console.log(router)
    // token 过期处理  清空用户数据 跳转到登录页面
    if (err.response.status == 401) {
      const store = useStore()
      store.delUser()
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)

type Data<T> = {
  code: number
  message: string
  data: T
}
const request = <T>(url: string, method: Method, submitData: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
export default request
