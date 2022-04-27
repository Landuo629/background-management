export function downloadFile(data,formName) {
   let blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
   // 获取heads中的filename文件名
   let downloadElement = document.createElement('a');
   // 创建下载的链接
   let href = window.URL.createObjectURL(blob);
   downloadElement.href = href;
   // 下载后文件名
   downloadElement.download = formName;
   document.body.appendChild(downloadElement);
   // 点击下载
   downloadElement.click();
   // 下载完成移除元素
   document.body.removeChild(downloadElement);
   // 释放掉blob对象
   window.URL.revokeObjectURL(href);
  }