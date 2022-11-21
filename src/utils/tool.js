/**
 * 防抖： 管事件触发频率多高，一定在事件触发 n 秒后才执行，如果在一个事件执行的 n秒内又触发了这个事件，就以新的事件的时间为准
 * @param {function} fn 被调用的函数
 * @param {number} [wait = 300] 定时器时间
 * @param {boolean} [immediate = false] 是否要立即执行一次
 * @returns {function}
 * @example js使用方法
 * window.addEventListener('resize', debounce(function() {}, 200));
 * @example vue使用方法 method是v-on绑定的方法
 * methods: { method: debounce(function() {}, 200)}
 */
export function debounce(fn, wait = 300, immediate = false) {
  let timer = null

  // 返回一个函数
  return function() {
    // 是否要立即执行一次
    if (!timer && immediate) fn.apply(this, arguments)

    // 每次触发事件时都取消之前的定时器
    clearTimeout(timer)

    // setTimeout 中使用箭头函数，就是让 this指向 返回的该闭包函数，而不是 debounce函数 的调用者
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

/**
 * 节流： 不管事件触发频率有多高，只在单位时间内执行一次,第一次事件和最后一次事件都触发
 * @param {function} fn  被调用的函数
 * @param {number} [wait = 300] 定时器时间
 * @return {function}
 * @example js使用方法
 * window.addEventListener('resize', throttle(function() {}, 200));
 * @example vue使用方法 method是v-on绑定的方法
 * methods: { method: throttle(function() {}, 200)}
 */
export function throttle(fn, wait = 300) {
  // 设置一个定时器
  let timer = null

  // 记录上一次执行的时间戳
  let previous = 0

  return function() {
    // 当前的时间戳，然后减去之前的时间戳，大于设置的时间间隔
    if (Date.now() - previous > wait) {
      clearTimeout(timer)
      timer = null

      // 更新上一次的时间戳为当前时间戳
      previous = Date.now()

      fn.apply(this, arguments)
    } else if (!timer) {
      // 设置下一个定时器
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, arguments)
      }, wait)
    }
  }
}

/**
 * 下载Excel
 * @param {file} data 流文件
 * @param {string} download 文件名
 */
export function downloadFile(data, download) {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  // 获取heads中的filename文件名
  const downloadElement = document.createElement('a')
  // 创建下载的链接
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  // 下载后文件名
  downloadElement.download = download
  document.body.appendChild(downloadElement)
  // 点击下载
  downloadElement.click()
  // 下载完成移除元素
  document.body.removeChild(downloadElement)
  // 释放掉blob对象
  window.URL.revokeObjectURL(href)
}

/**
 * @description   用字符串路径来访问对象的成员
 * @param {Object} obj 被访问的对象
 * @param {String} path 字符串路径  xxx.yyy.zzz
 * @return {any}
 */
export function getValueByPath(obj, path) {
  const paths = path.split('.')
  let res = obj
  let prop
  // eslint-disable-next-line no-cond-assign
  while (prop = paths.shift()) {
    res = res[prop]
  }
  return res
}

/**
 * @description 将数组转变为枚举
 * @param {Array} array 数组数据
 * @param {String} key 枚举的key值
 */
export function arrayToEnum(array, key) {
  return array.reduce((prev, cur) => {
    prev[cur[key]] = cur
    return prev
  }, {})
}

import { Message } from 'element-ui'
/**
 * @description 复制文本
 * @param {String} value 文本数据
 */
export function copyValue(value) {
  try {
    const copyTextarea = document.createElement('textarea')
    console.log(copyTextarea.nodeType)
    document.body.appendChild(copyTextarea)
    copyTextarea.innerText = value
    copyTextarea.select()
    document.execCommand('Copy')
    copyTextarea.parentNode.removeChild(copyTextarea)
    Message.success('复制成功')
  } catch (err) {
    Message.error('复制失败，请手动复制')
  }
}

/**
 * 13888888888 -> 138****8888
 * @param {String|Number} mobile 电话号码
 * @returns {String}
 */
export function secrecyMobile(mobile) {
  mobile = String(mobile)
  if (!/\d{11}/.test(mobile)) {
    return mobile
  }
  return mobile.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
}

/**
 * 数组对象深拷贝
 * @param obj 被拷贝对象
 * @returns {Object}
 */
export default function cloneObj(obj) {
  let str = null
  let newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return
  } else if (window && window.JSON) {
    str = JSON.stringify(obj) // 系列化对象
    newobj = JSON.parse(str) // 还原
  } else {
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]
    }
  }
  return newobj
}
