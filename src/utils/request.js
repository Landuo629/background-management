import axios from 'axios'
import options from '@/utils/loadingOption'
import Router from '@/router'
import { Message, Loading } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
import { debounce } from './tool'

/**
* @type {function}
*/
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

/**
 * 配置
 */
const axiosOption = {
  token: 'token',
  name: 'sm-admin-name',
  invalidStatus: [401],
  invalidCodes: [401],
  correctCodes: [10000],
  duration: 3 * 1000,
  errorMsg: '网络走神了'
}

/**
 * 全局loading
 */
let gobalLoading = null

/**
 * 返回登录页
 */
const goLogin = debounce(() => {
  Message({
    message: '登录失效，请重新登录！',
    type: 'error',
    duration
  })
}, 300)

/**
 * token失效
 */
const loginOut = () => {
  // 防抖，只执行最后一次
  goLogin()
  removeToken()
  Router.replace('/login')
}

/**
 * 文件流下载错误json信息处理
 * @param {object} res 后台返回的 blob 数据
 */
const handlerBlob = (res) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsText(res, 'utf-8')// 读取文件，并设置编码格式为utf-8
    fileReader.onload = function() {
      try {
        const { code, msg, message, errorMsg } = JSON.parse(this.result)
        if (code) {
          // 说明是普通对象数据，后台转换失败
          Message({
            message: msg || message || errorMsg,
            type: 'error',
            duration
          })
          reject(msg || message || errorMsg)
        }
      } catch (err) {
        // 解析成对象失败，说明是正常的文件流
        resolve(res)
      }
    }
  })
}

const { invalidStatus, invalidCodes, correctCodes, duration, token, name, errorMsg } = axiosOption

// request interceptor
service.interceptors.request.use(
  (config) => {
    // loading 用于不需要loding动画的
    config.loading && (gobalLoading = Loading.service(options))
    getToken() && (config.headers[token] = getToken())
    // TODO 写死的
    config.headers[name] = 'dev-yang'
    config.headers.language = 'CN'
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

    const { data: res, status, config: { responseType }} = response
    const { code, msg, message } = res// 状态码
    // 下载文件流数据
    if (['blob', 'arraybuffer'].includes(responseType)) {
      return handlerBlob(res)
    }

    if (status === 200) {
      // 判断正确code编码
      if (correctCodes.includes(code)) {
        return Promise.resolve(res)
      }
      // 判断token失效编码
      if (invalidCodes.includes(code)) {
        loginOut()
        return
      } else {
        Message({
          message: msg || message || errorMsg || '网络走神了～',
          type: 'error',
          duration
        })
        return Promise.reject(msg || message || errorMsg)
      }
    }
    return res
  },
  (error) => {
    gobalLoading && gobalLoading.close()
    console.log(error.response)
    const { msg, message, errorMsg } = error.response?.data || {}
    if (invalidStatus.includes(error.response?.status)) {
      loginOut()
      return
    }
    if (msg || message || errorMsg) {
      Message({
        message: msg || message || errorMsg,
        type: 'error',
        duration
      })
    }
    return Promise.reject(error)
  }
)

export default service
