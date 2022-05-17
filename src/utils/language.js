const languageKey = 'sgs-ogc-language'

export function getLanguage () {
  return localStorage.getItem(languageKey)
}

export function setLanguage (language) {
  return localStorage.setItem(languageKey, language)
}
