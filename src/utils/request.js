import Axios from 'axios'

const baseURL = 'http://localhost:4031'
const axios = Axios.create({
  baseURL,
  timeout: 20000
})
// 允许携带cookie
axios.defaults.withCredentials = false
// 请求头信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// 默认使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
axios.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response && err.response.data) {
      console.error('network error')
      // const code = err.response.status
      // const msg = err.response.data.message
      // ElMessage.error(`Code: ${code}, Message: ${msg}`)
    } else {
      // ElMessage.error(`${err}`)
    }
    return Promise.reject(err)
  }
)
export default axios
