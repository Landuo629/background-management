import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import { setLanguage } from '@/utils/language'
// import { getLanguageField } from '@/api/language'

// 获取 modeles 下的所有语言文件
const modulesFiles = require.context('./modules', true, /\.js$/)
const messages = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = {
    ...value,
    ...require(`element-ui/lib/locale/lang/${moduleName}`).default
  }
  return modules
}, {})

Vue.use(VueI18n)

// 获取当前语言
export function getLanguage () {
  // 从本地缓存获取
  const chooseLanguage = sessionStorage.getItem('language', language)
  if (chooseLanguage) return chooseLanguage

  // 返回当前的浏览器语言
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh-CN'
}

const i18n = new VueI18n({
  locale: getLanguage(),
  messages
})

export function setLocaleMessage (language = getLanguage(), reload) {
  sessionStorage.setItem('language', language)
  i18n.locale = language
  setLanguage(language === 'zh-CN' ? 'zh' : language)
  // if (!reload) {
  //   location.reload()
  // }
  // getLanguageField({
  //   language
  // }).then(res => {
  //   // i18n.setLocaleMessage(language, { ...res.data.pageData, ...locales[language] });
  // })
}

locale.i18n((key, value) => i18n.t(key, value)) // 为了实现element插件的多语言切换

export default i18n
