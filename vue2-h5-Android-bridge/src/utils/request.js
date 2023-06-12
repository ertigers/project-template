/**
 * 封装Axios
 * 处理请求、响应错误信息
 */
import Toast from '@/plugin/toast'  //引用饿了么UI消息组件
import axios from 'axios' //引用axios

const product = 'http://api-test.koudaikaoyan.com'
const daily = 'http://api-test.koudaikaoyan.com'
let host = daily
// 正式环境判断
// if (location && location.host.includes('admin.xxx.com')) {
//   host = product
// }
// 本地开发环境
if (process.env.NODE_ENV === 'development') {
  // host = 'http://127.0.0.1:7001'
}

// create an axios instance
const service = axios.create({
  baseURL: host,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    let adminToken = localStorage.getItem('admin_token')
    if (adminToken) {
      config.headers.Authorization = `${adminToken}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.status === 200) {
      const res = response.data //res is my own data
      if (res.code === 0) {
        return res.data
      } else {
        Toast({
          message: res.error || 'Error',
          type: 'danger',
          duration: 2 * 1000
        })
        if(res.code === 401) {
          location.href = `/login?redirect=${location.pathname}`
        }
        return Promise.reject(new Error(res.error || 'Error'))
      }
    } else {
      Toast({
        message: 'Error',
        type: 'danger',
        duration: 2 * 1000
      })
      return Promise.reject(new Error('Error'))
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast({
      message: error.message,
      type: 'danger',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service //导出封装后的axios
