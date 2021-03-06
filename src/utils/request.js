import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
import options from '@/utils/loadingOption'
import Router from '@/router'
import { debounce } from './debounce'

let gobalLoading = null

/**
* @type {function}
* @param {boolean} [noLoading]  -用于不需要loding动画的
*/
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

const axiosOption = {
  token: 'token',
  invalidStatus: [],
  invalidCodes: [401],
  correctCodes: [10000],
  duration: 3 * 1000,
  errorMsg: '网络走神了',
  gobalLoading: null
}

const { invalidStatus, invalidCodes, correctCodes, duration, token, errorMsg } = axiosOption

// request interceptor
service.interceptors.request.use(
  (config) => {
    // noLoading 用于不需要loding动画的
    !config.noLoading && (gobalLoading = Loading.service(options))
    getToken() && (config.headers[token] = getToken())

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
    console.log('返回数据：', response)

    gobalLoading && gobalLoading.close()

    if (response.config.responseType === 'blob') {
      // 下载文件时，没有code编码
      return res
    }

    const { data: res, status } = response
    const { code, msg, message } = res// 状态码

    if (invalidStatus.includes(status)) {
      loginOut()
      return
    }

    if (status === 200) {
      if (correctCodes.includes(code)) {
        return Promise.resolve(res)
      } if (invalidCodes.includes(code)) {
        loginOut()
        return
      } else {
        Message({
          message: msg || message || errorMsg,
          type: 'error',
          duration
        })
        return Promise.reject(msg || message || errorMsg)
      }
    }
    return res
  },
  (error) => {
    const { msg, message } = error
    gobalLoading && gobalLoading.close()
    console.log('err' + error) // for debug
    Message({
      message: msg || message || errorMsg,
      type: 'error',
      duration
    })
    return Promise.reject(error)
  }
)

function loginOut () {
  // 防抖，只执行最后一次
  debounce(() => {
    Message({
      message: '登陆失效，请重新登陆！',
      type: 'error',
      duration
    })
  }, 300)
  removeToken()
  Router.replace('/login')
}

export default service
