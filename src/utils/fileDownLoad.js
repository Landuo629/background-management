export function download(val) {
  const x = document.createElement('a')
  x.setAttribute('href', val)
  // x.setAttribute('download','')
  x.style.display = 'none'
  x.click()
}
