/**
 * @description   用字符串路径来访问对象的成员
 * @param {Object} obj 被访问的对象
 * @param {String} path 字符串路径  xxx.yyy.zzz
 * @return {any}
 */
export function getValueByPath (obj, path) {
  const paths = path.split('.')
  let res = obj
  let prop
  // eslint-disable-next-line no-cond-assign
  while (prop = paths.shift()) {
    res = res[prop]
  }
  return res
}
