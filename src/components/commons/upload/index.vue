<template>
  <el-upload
    ref="upload"
    :accept="accept"
    :list-type="listType"
    :action="actionComputed"
    :headers="headers"
    :with-credentials="credentials"
    :multiple="multiple"
    :before-upload="beforeUpload"
    :on-preview="onPreview"
    :before-remove="beforeRemove"
    :on-progress="onProgress"
    :on-remove="onRemove"
    :on-success="onSuccess"
    :on-error="onError"
    :on-exceed="onExceed"
    :on-change="onChange"
    :file-list="List"
    :auto-upload="autoUpload"
    :disabled="disabled"
    :limit="limit"
    :data="data"
    :http-request="httpRequest"
    :show-file-list="showFileList"
  >
    <slot />
  </el-upload>
</template>
<script>
import { getToken } from '@/utils/auth'
import options from '@/utils/loadingOption'

export default {
  name: 'Uploader',
  props: {
    action: {
      type: String
    },
    headers: {
      type: Object,
      default: () => ({ token: getToken() || '' })
    },
    credentials: {
      type: Boolean,
      default: false
    },
    listType: {
      type: String,
      default: 'text'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    },
    accept: {
      type: String,
      default: '.jpeg,.jpg,.gif,.png'
    },
    maxSize: {
      type: String,
      default: '2mb'
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 5
    },
    data: {
      type: Object,
      default: () => ({})
    },
    httpRequest: {
      type: Function
    },
    showFileList: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      org: process.env.VUE_APP_BASE_API,
      List: [],
      gobalLoading: null
    }
  },
  computed: {
    actionComputed() {
      return this.action ? this.org + this.action : 'https://jsonplaceholder.typicode.com/posts/'
    }
  },
  mounted() {
    this.List = this.fileList
  },
  methods: {
    onPreview(file) {
      this.$emit('onPreview', file)
    },
    beforeRemove(file, fileList) {
      this.$emit('beforeRemove', file, fileList)
    },
    onRemove(file, fileList) {
      this.$emit('onRemove', file, fileList)
    },
    beforeUpload(file) {
      const bytesList = ['kb', 'mb']
      const unit = this.maxSize.slice(-2).toLowerCase()
      const fileType = file.type
      const acceptList = this.accept.split(',').map(item => 'image/' + item.slice(1))
      const isExist = bytesList.some(item => item === unit)
      let max = 0
      if (isExist) {
        const sizeNumber = this.maxSize.slice(0, -2) * 1
        max = unit === 'mb' ? sizeNumber * 1024 * 1024 : sizeNumber
      } else {
        max = this.maxSize * 1024 * 1024
      }
      if (!acceptList.some(item => item === fileType)) {
        this.$message.error('文件格式不正确')
        return false
      }
      if (file.size > max) {
        this.$message.error('文件大小不能超过' + (isExist ? this.maxSize : max / 1024 / 1024 + 'MB'))
        return false
      }
    },
    onProgress(event, file, fileList) {
      this.gobalLoading = this.$loading(options)
      this.$emit('onProgress', event, file, fileList)
    },
    onSuccess(response, file, fileList) {
      this.gobalLoading.close()
      this.$emit('onSuccess', response, file, fileList)
    },
    onError(err, file, fileList) {
      this.gobalLoading.close()
      this.$emit('onError', err, file, fileList)
    },
    /* description: 当文件超出限制时触发 */
    onExceed() {
      this.$emit('onExceed', true)
    },
    onChange(file, fileList) {
      this.$emit('onChange', file, fileList)
    }
  }
}
</script>
