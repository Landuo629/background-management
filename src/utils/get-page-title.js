import defaultSettings from '@/settings'

const title = defaultSettings.title || '后台管理系统'

/**
 * 获取项目名称
 * @param {string} pageTitle
 * @returns {string} 项目名称
 */
export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
