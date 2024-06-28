import Taro from '@tarojs/taro'
import axios from 'axios'
 
const baseURL = 'http://120.79.22.9:3170'
 
// 创建axios实例并设置基础URL
const service = axios.create({
  baseURL,
  timeout: 5000 // 请求超时时间
})
 
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加例如token等请求头
    config.headers['Content-Type'] = 'application/json'
    // 如果有token，可以在这里设置到header中
    const token = Taro.getStorageSync('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    // 请求错误处理
    return Promise.reject(error)
  }
)
 
// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 根据返回的状态码做相应处理，例如401未授权等
    return res
  },
  error => {
    // 响应错误处理
    return Promise.reject(error)
  }
)

export default service
