<template>
  <!-- 字段新增 -->
  <div class="filed-page">
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="cancel">
      <div>
        <el-form
          :model="fileInfoResultBOList"
          class="formClass"
          label-width="92px"
          ref="form"
          label-suffix="："
          :rules="formRules"
        >
          <el-row type="flex" justify="left">
            <el-col :span="23">
              <el-form-item label="字段名称" prop="fieldName">
                <el-input v-model="fileInfoResultBOList.fieldName" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="left">
            <el-col :span="23">
              <el-form-item label="字段类型" prop="type">
                <el-select
                  v-model="fileInfoResultBOList.type"
                  @change="filedChanage"
                  clearable
                  class="setBlock"
                >
                  <el-option
                    v-for="(item, index) in List"
                    :value="index + 1"
                    :label="item"
                    :key="index"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 文本|数字格式 -->
          <el-row type="flex" justify="left" v-if="value == '3'">
            <el-col :span="23">
              <el-form-item label="默认值" prop="fieldContent">
                <el-input
                  clearable
                  type="textarea"
                  v-model="fileInfoResultBOList.fieldContent"
                  :placeholder="fileInfoResultBOList.fieldContent"
                  maxlength="200"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 单项选择|多项选择 -->
          <div v-if="value == '1' || value == '2'">
            <el-row type="flex" justify="left">
              <el-col :span="24">
                <div
                  v-for="(item, index) in fileInfoResultBOList.fieldChoiceList"
                  :key="index"
                >
                  <el-form-item
                    :label="index == 0 ? '选项' : ''"
                    :prop="'fieldChoiceList.' + index + '.value'"
                    :rules="[
                      {
                        required: true,
                        message: '不能为空',
                        trigger: 'change',
                      },
                    ]"
                  >
                    <el-input v-model="item.value" style="width: 90%" clearable />
                    <i
                      class="el-icon-delete"
                      @click="onClickdel(index)"
                      v-if="fileInfoResultBOList.fieldChoiceList.length > 1"
                    ></i>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row type="flex" justify="left">
              <el-col :span="12">
                <el-form-item>
                  <div class="addparameter" v-if="value == '1' || value == '2'">
                    <i class="el-icon-plus"></i>
                    <span @click="addChoose">增加选项</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="commitAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "filedDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: true,
    },
    statusAdd: {
      type: Boolean,
      default: true,
    },
    fileDate: {
      type: Object,
      default: () => {
        return {};
      },
    },
    type: String,
    title: String,
  },
  data() {
    return {
      fileInfoResultBOList: {
        fieldChoiceList: [],
        fieldContent: "", //字段默认值
        fieldName: "", //字段名称
        isRequired: 1, //字段校验，是否必填。1是0否
        sortNum: "", //字段排序
        type: "",
      }, //选项集合

      List: ["单选", "多选", "文本", "计分"],
      value: "",
      //校验
      formRules: {
        fieldName: [{ required: true, message: "请输入字段名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择字段类型", trigger: "change" }],
        fieldContent: [{ required: false, message: "请输入默认值", trigger: "blur" }],
        fieldChoiceList: [{ required: false, message: "请输入选项", trigger: "blur" }],
        value: [{ required: false, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  mounted() {
    if (this.type == "1") {
      this.List = this.List.slice(0, 3);
    }
    if (Object.keys(this.fileDate).length !== 0) {
      const fileDates = JSON.parse(JSON.stringify(this.fileDate));
      this.fileInfoResultBOList = {
        ...fileDates,
        fieldChoiceList: fileDates.fieldChoiceList.map((item) => ({
          value: item,
        })),
      };
    
      this.value = this.fileInfoResultBOList.type;
      this.formRules.fieldContent[0].required = true;
    }
  },
  methods: {
    //字段类型选择
    filedChanage(value) {
    
        this.value = value;
        if (value == "3") {
          this.formRules.fieldContent[0].required = true;
          this.fileInfoResultBOList.fieldChoiceList = [];
          this.fileInfoResultBOList.fieldContent = "";
        } else if (value == "1" || value == "2") {
          this.fileInfoResultBOList.fieldChoiceList = [{ value: "" }];
        } else if (value == "4") {
          this.fileInfoResultBOList.fieldChoiceList = [];
        }
      
    },
    cancel() {
      this.$emit("cancel", false);
    },
    // 添加选项
    addChoose() {
      this.fileInfoResultBOList.fieldChoiceList.push([{ value: "" }]);
    },
    // 删除选项
    onClickdel(index) {
      this.fileInfoResultBOList.fieldChoiceList.splice(index, 1);
    },
    // 确定
    commitAdd() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.onSubmit();
        } else {
          return false;
        }
      });
    },
    onSubmit() {
      // '单选下拉框','多选下拉框
      const type = this.fileInfoResultBOList.type;
      if (type == "1" || type == "2") {
        // 选项集合
        const arr = this.fileInfoResultBOList.fieldChoiceList.map((item) => {
          return item.value;
        });
        this.$set(this.fileInfoResultBOList, "fieldChoiceList", arr);
      }
      let params = { ...this.fileInfoResultBOList };
      this.$emit("func", params);
    },
  },
};
</script>

<style lang="scss" scoped>
.filed-page {
  i {
    font-size: 18px;
    color: #66b1ff;
    cursor: pointer;
    margin-left: 10px;
  }
  .addparameter {
    color: #66b1ff;
    cursor: pointer;
    i {
      color: #66b1ff;
    }
  }
  .setBlock {
    display: block;
  }
  .diaScreen {
    height: 300px;
    overflow: auto;
  }
}
//   .el-input-number {
//       position: relative;
//       display: inline-block;
//       width: 100%;
//       line-height: 38px;
//   }
// }
</style>
