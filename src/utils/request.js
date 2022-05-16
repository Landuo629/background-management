import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
import options from '@/utils/loadingOption'
import Router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

let gobalLoading = null

const urlList = ['/export/order', '/export/user', '/export/evaluation', '/export/msg']

// request interceptor
service.interceptors.request.use(
  (config) => {
    gobalLoading = Loading.service(options)
    if (getToken()) {
      config.headers['admin-token'] = getToken()
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    console.log('返回数据：', response.data)
    gobalLoading.close()
    const res = response.data
    const status = response.status

    if (res.code === 1100) {
      Message.error('登陆失效，请重新登陆！')
      removeToken()
      Router.replace('/login')
      return
    }
    // if (res.code !== 10000) {
    //   Message({
    //     message: res.msg || "Error",
    //     type: "error",
    //     duration: 5 * 1000,
    //   });

    //   return Promise.reject(new Error(res.message || "Error"));
    // }
    if (status === 200) {
      // const res = response.data // 数据
      const code = res.code // 状态码
      const msg = res.msg || res.message
      const whiteUrl = response.config.url.slice(response.config.baseURL.length)
      if (urlList.includes(whiteUrl)) {
        if (response.headers['content-type'] === 'application/json') {
          Message({
            message: '导出失败',
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject('导出失败')
        } else {
          return Promise.resolve(response.data)
        }
      }

      // if(code){
      if (code === 10000) {
        return Promise.resolve(res)
      } else {
        Message({
          message: msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.message || 'Error'))
      }
      // }
    }
    return res
  },
  (error) => {
    gobalLoading.close()
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
