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
export function debounce (fn, wait = 300, immediate = false) {
  let timer = null

  // 返回一个函数
  return function () {
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
export function throttle (fn, wait = 300) {
  // 设置一个定时器
  let timer = null

  // 记录上一次执行的时间戳
  let previous = 0

  return function () {
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

