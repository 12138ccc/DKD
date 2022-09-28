// 实现对axios
import axios from 'axios'
// import store from '@/store'
import { Message } from 'element-ui'
// 通过axios 创建axios实例

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})
// 响应拦截器
service.interceptors.response.use(response => {
  const { data } = response
  console.log(response)
  if (data.size) {
    return data
  }
  if (response.data.success) {
    // 业务逻辑成功时
    return data
  }
  // 业务逻辑没有成功
  Message.error(data.msg)
  return Promise.reject(new Error(data.msg))
}, error => {
  Message.error(error.msg)
  return Promise.reject(new Error(error))
})
export default service
