<!--
 * @Description: 发布课程第二步
-->
<template>
  <div class="courseManagementDetail2">
    <main>
      <el-upload
        id="myQuillEditor"
        class="avatar-uploader"
        :action="baseURL"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :before-upload="beforeUpload"
        :headers="headers"
        :on-error="uploadError"
      />
      <div v-loading="quillUpdateImg" class="edit_container">
        <quill-editor
          ref="myQuillEditor"
          v-model="content"
          :options="editorOption"
          class="editor"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'CourseManagementDetail2',
  components: {
    quillEditor
  },
  props: {
    data: String
  },
  data() {
    // 工具栏配置
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
      ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
      [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
      [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
      [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
      [{ indent: '-1' }, { indent: '+1' }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
      [{ direction: 'rtl' }], // 文本方向-----[{'direction': 'rtl'}]
      [{ size: ['small', false, 'large', 'huge'] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
      [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
      [{ font: [] }], // 字体种类-----[{ font: [] }]
      [{ align: [] }], // 对齐方式-----[{ align: [] }]
      ['clean'], // 清除文本格式-----['clean']
      ['image', 'video', 'upload', 'link'] // 链接、图片、视频、文件-----['link', 'image', 'video']
    ]
    return {
      headers: { token: getToken() },
      baseURL: process.env.VUE_APP_BASE_API + '/admin/oss/oss/upload',
      quillUpdateImg: false,
      content: ``,
      toolbarOptions,
      editorOption: {
        //  富文本编辑器配置
        modules: {
          // 工具栏定义的
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  // 调用iview图片上传
                  document.querySelector('#myQuillEditor input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        },
        // 主题
        theme: 'snow',
        placeholder: '请输入正文'
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  watch: {
    data(val) {
      this.content = val
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange(e) {
      this.$emit('editorChange', e.html)
    }, // 内容改变事件
    // 父组件调用子组件的方法
    onSubmit() {
      console.log(this.content)
      return this.content
    },
    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      const quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      const { code, data } = res
      if (code === 10000) {
        // 获取光标所在位置
        const length = quill.getSelection().index
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', data)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        // this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    },
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true
    }
  }
}
</script>

<style lang="scss">
.courseManagementDetail2 {
  .edit_container {
    margin-top: 16px;
  }
  .editor {
    line-height: normal !important;
    height: 500px;
  }
  .ql-snow .ql-tooltip[data-mode="link"]::before {
    content: "请输入链接地址:";
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: "保存";
    padding-right: 0px;
  }

  .ql-snow .ql-tooltip[data-mode="video"]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体";
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体";
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体";
  }
}
</style>
