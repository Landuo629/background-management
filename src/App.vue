<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: '123'
    }
  }
}
</script>

<style lang="scss">
#app {
  .dialog {
    .el-dialog__body {
      padding: 10px 100px;
      // display: flex;
      // justify-content: center;
    }
  }
  // 公共样式
  .el-table {
    border: 1px solid #ebeef5;
    border-bottom: none;
  }
  .headerRow {
    background: #dce0e6;
  }
  .commonFooter {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .queryParams {
    .el-form-item {
      padding-right: 10px;
    }
    .el-select {
      width: 100%;
    }
    .el-date-editor {
      width: 100%;
    }
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .tableHead {
    background: #eef1f6;
    color: #606266;
  }
  .layoutFooter {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // 编辑详情页面form样式
  .formData {
    margin-left: 100px;
    padding: 0 20px;
  }
  // input number 类型取消上下操作
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  // 图片上传样式
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>
