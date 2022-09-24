import { name } from '@/settings'

const languageKey = name ? `${name}_vue_admin_template_language` : 'vue_admin_template_language'

export function getLanguage () {
  return localStorage.getItem(languageKey)
}

export function setLanguage (language) {
  return localStorage.setItem(languageKey, language)
}
