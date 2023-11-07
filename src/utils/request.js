import axios from 'axios'
import { ElMessage } from 'element-plus'

// import { ElMessage } from 'element-plus'

const baseURL = 'http://localhost:8081'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求前的拦截器 有无Token之类的
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    return config
  },
  (err) => Promise.reject(err)
)

// 响应后的拦截器
instance.interceptors.response.use(
  (res) => {
    // 请求成功

    if (res.data.message) ElMessage.success(res.data.message)
    return res.data
  },
  (err) => {
    // TODO 5. 处理400错误
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
