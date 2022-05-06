/**  返回当前时间（年月日时分秒）
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param {string} [fmt = 'yyyy-MM-dd hh:mm:ss'] -时间格式
 *  @value format("yyyy-MM-dd hh:mm:ss.S")  ==> 2006-07-02 08:09:04.423
 *  @value format("yy-M-d h:m:s.S")         ==> 06-7-2 8:9:4.18
 * @param {string ｜ date} [time = new Date()] -时间
 * @return {string}
 */
export function format(fmt = 'yyyy-MM-dd hh:mm:ss', time) {
  const date = _getDate(time)

  const dateList = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(fmt)) {
    // 匹配年份
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in dateList) {
    // 匹配其他参数
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? dateList[k]
          : ('00' + dateList[k]).substr(('' + dateList[k]).length)
      )
    }
  }

  return fmt
}

/**  返回当前季度的起始日和结束日
 * @param {number} AddQuarteCount             - 添加的季度，可以是负数
 * @param {string | date} [time = new Date()] - 时间
 * @return {object}                           - 开始日期和结束日期
 *  @value firstdate                          - 开始时间
 *  @value lastdate                           - 结束时间
 *  @value year                               - 年份
 *  @value quarter                            - 第几季度
 */
export function getQuarterDay(AddQuarteCount, time) {
  const date = _getDate(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  if (AddQuarteCount) {
    month += AddQuarteCount * 3
    if (month > 0) {
      year += Math.ceil(month / 12) - 1
      month = month % 12 === 0 ? 12 : month % 12
    } else {
      year -= Math.floor((month * -1) / 12) + 1
      month = (12 - month) % 12 === 0 ? 12 : (12 - month) % 12
    }
  }
  month = _getQuarterStartMonth(month)
  const firstdate = year + '-' + month + '-01'
  const lastMonth = month + 2
  const day = new Date(year, lastMonth, 0)
  const lastdate = year + '-' + lastMonth + '-' + day.getDate()
  const quarter = lastMonth / 3
  return {
    firstdate,
    lastdate,
    year,
    quarter
  }
}

/**  返回当前月份的起始日和结束日
 * @param {number} AddMonthCount  - 添加的月份，可以是负数
 * @param {string | date} [time = new Date()] -时间
 * @return {array[string]} - 开始日期和结束日期
 */
export function getMonthDay(AddMonthCount, time) {
  const date = _getDate(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  if (AddMonthCount) {
    month += AddMonthCount
    if (month > 0) {
      year += Math.ceil(month / 12) - 1
      month = month % 12 === 0 ? 12 : month % 12
    } else {
      year -= Math.floor((month * -1) / 12) + 1
      month = (12 - month) % 12 === 0 ? 12 : (12 - month) % 12
    }
  }
  const firstdate = year + '-' + month + '-01'
  const day = new Date(year, month, 0)
  const lastdate = year + '-' + month + '-' + day.getDate()
  return [firstdate, lastdate]
}

/**  返回当前时间的周一和周日
 * @param {string | date} [time = new Date()] -时间
 * @return {array[string]} - 周一和周日
 */
export function getWeekhDay(time) {
  const date = _getDate(time)
  const day = date.getDay() || 7
  const firstdate = `${date.getFullYear()}-${date.getMonth()}-${
    date.getDate() + 1 - day
  }`
  const lastdate = `${date.getFullYear()}-${date.getMonth()}-${
    date.getDate() + 7 - day
  }`
  return [firstdate, lastdate]
}

/**  返回当前时间 N 天后的日期
 * @param {number} AddDayCount - 添加的天数，可以是负数
 * @param {string | date} [time = new Date()] - 当前时间
 * @return {string}
 */
export function getDateStr(AddDayCount, time) {
  const date = _getDate(time)
  date.setDate(date.getDate() + AddDayCount) // 获取AddDayCount天后的日期
  const y = date.getFullYear()
  const m =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return y + '-' + m + '-' + d
}

/**  比较两个时间的大小
 * @param {string | date} startDate - 第一个时间
 * @param {string | date} endDate - 第二个时间
 * @return {boolean}
 *  @value true 第一个时间大
 *  @value false 第二个时间大
 */
export function compareDate(startDate, endDate) {
  return Date.parse(_getDate(startDate)) > Date.parse(_getDate(endDate))
}

/**  获取时间，兼容360游览器和ie游览器等其它游览器
 * @param {string} [time = new Date()] -时间
 * @return {date}
 */
function _getDate(time) {
  const date = time ? new Date(time.replace(/-/g, '/')) : new Date()
  _isValidDate(date)
  return date
}

// 校验传入的时间格式是否正确
function _isValidDate(date) {
  if (isNaN(date.getTime())) {
    // eslint-disable-next-line no-throw-literal
    throw '无效的时间格式!!!'
  }
}

/** 返回当前季度的开始月份
 * @param {number} month - 月份
 * @return {number} - 月份
 */
function _getQuarterStartMonth(month) {
  switch (month) {
    case 1:
    case 2:
    case 3:
      return 1
    case 4:
    case 5:
    case 6:
      return 4
    case 7:
    case 8:
    case 9:
      return 7
    case 10:
    case 11:
    case 12:
      return 10
  }
}
