export function download(val) {
  let x = document.createElement("a");
  x.setAttribute("href", val);
  // x.setAttribute('download','')
  x.style.display = "none";
  x.click();
}
