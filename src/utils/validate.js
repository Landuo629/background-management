/**
  * @Description: 判断身份证号码 自定义校验
  */
export function validateIdCard (rule, value, callback) {
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  }
  if (!validateNull(value)) {
    if (value.length === 18) {
      if (!value || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback(new Error('The id number format is incorrect')) // '证件号码格式错误'
      } else if (!city[value.substr(0, 2)]) {
        callback(new Error('Address coding error')) // '地址编码错误'
      } else {
        // 18位身份证需要验证最后一位校验位
        value = value.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        // 校验位
        const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x']
        let sum = 0
        let ai = 0
        let wi = 0
        for (let i = 0; i < 17; i++) {
          ai = value[i]
          wi = factor[i]
          sum += ai * wi
        }
        if (parity[sum % 11] !== value[17]) {
          callback(new Error('The verification bit of the id is incorrect')) // '证件号码校验位错误'
        }
      }
    } else {
      callback(new Error('The id number contains a maximum of 18 characters')) // '证件号码长度不为18位'
    }
  } else {
    callback(new Error('The id number cannot be blank')) // '证件号码不能为空'
  }
}

/**
  * @Description: 判断是否为空
  */
export function validateNull (val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    return val === 'null' || val == null || val === 'undefined' || val === undefined || val === ''
  }
  return false
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
