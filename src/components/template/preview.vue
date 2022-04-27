<template>
  <div class="preview1">
    <el-dialog title="预览" :visible.sync="dialogVisible" :before-close="cancel">
      <div class="preview-main">
        <div class="preview-son">
          <el-form ref="form">
            <div v-for="(item, index) in dataList" :key="index" class="box">
              <div v-if="item.type === 1" class="item">
                <el-row>
                  <el-col>
                    <el-form-item
                      :label="index + 1 + '.' + item.fieldName"
                      :required="item.isRequired * 1 === 1"
                    >(单选)
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-for="(_item,index) in item.fieldChoiceList" :key="index">
                  <el-col>
                    <el-form-item>
                      <el-radio :label="_item" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <!-- 多选 -->
              <div v-else-if="item.type === 2" class="item">
                <el-row>
                  <el-col>
                    <el-form-item
                      :label="index + 1 + '.' + item.fieldName"
                      :required="item.isRequired * 1 === 1"
                    >(多选)
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-for="(_item,index) in item.fieldChoiceList" :key="index">
                  <el-col>
                    <el-form-item>
                      <el-checkbox
                        :label="_item"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <!-- 文本 -->
              <div v-else-if="item.type === 3" class="item">
                <el-form-item
                  :label="index + 1 + '.' + item.fieldName"
                  :required="item.isRequired * 1 === 1"
                >
                  <el-input type="textarea" :placeholder="item.fieldContent" />
                </el-form-item>
              </div>
              <!-- 记分 -->
              <div v-else-if="item.type === 4" class="item">
                <el-form-item
                  :label="index + 1 + '.' + item.fieldName"
                  :required="item.isRequired * 1 === 1"
                >
                  <div class="starBox">
                    <i v-for="(item,index) in 10" :key="index" class="el-icon-star-off" />
                  </div>
                </el-form-item>
              </div>
            </div>
            <div class="text">
              <el-form-item :label="this.dataList.length+1+'.课程综合评分'" required>
                <el-input type="textarea" placeholder="请输入不超过200字" />
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Preview',
  props: {
    dialogVisible: Boolean,
    fileDate: {
      type: Array,
      return: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    dataList() {
      return [
        ...this.fileDate
          .filter((item) => item.type === 4)
          .sort((x, y) => x.sortNum - y.sortNum),
        ...this.fileDate
          .filter((item) => item.type !== 4)
          .sort((x, y) => x.sortNum - y.sortNum)
      ]
    }
  },
  methods: {
    cancel() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style lang="scss">
.preview1 {
  .el-dialog {
    min-width: 400px;
    .preview-main {
      width: 375px;
      height: 736px;
      border: 5px solid rgb(82, 64, 64);
      border-radius: 30px;
      margin: auto;
      overflow: hidden;
      .preview-son {
        overflow-y: scroll;
        padding: 15px;
        height: 736px;
        width: 375px;
        box-sizing: border-box;
      }
    }
    .starBox {
      display: flex;
      margin-top: 13px;
    }
  }
}
</style>
