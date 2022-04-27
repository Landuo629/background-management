<template>
  <div class="filed-page">
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="cancel">
      <div class="diaScreen">
        <el-form
          ref="form"
          :model="form"
          class="formClass"
          label-width="100px"
          label-suffix="："
          :rules="formRules"
        >
          <HeadTitle head-title="模板信息" size="small">
            <template slot="content">
              <!-- 模版名称 -->
              <el-row type="flex" justify="left">
                <el-col :span="23">
                  <el-form-item label="模版名称" prop="templateName">
                    <el-input v-model="form.templateName" />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 说明-->
              <el-row type="flex" justify="left">
                <el-col :span="23">
                  <el-form-item label="说明" prop="remarks">
                    <el-input v-model="form.remarks" />
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </HeadTitle>
          <!-- 字段信息 -->
          <HeadTitle
            head-title="字段信息"
            size="small"
            :buttonVisible="buttonVisible"
            @show="previewVisible = true"
          >
            <template slot="content">
              <div>
                <el-table :data="form.fileInfoResultBOList" style="width: 100%">
                  <el-table-column prop="fieldName" label="字段名称" align="center" />
                  <el-table-column prop="isRequired" label="必填" align="center">
                    <template slot-scope="scope">
                      <el-checkbox
                        v-model="scope.row.isRequired"
                        :true-label="1"
                        :false-label="0"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="sortNum"
                    label="排序"
                    align="center"
                    min-width="180px"
                  >
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.sortNum"
                        controls-position="right"
                        :min="1"
                        label="描述文字"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" @click="onClickAdd(scope.row, scope.$index)"
                        >编辑</el-button
                      >
                      <el-button type="text" @click="deleteMsg(scope.$index)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <div>
                  <el-button style="margin: 0 44%" type="text" @click="onClickAdd()"
                    >+ 添加字段</el-button
                  >
                </div>
              </div>
            </template>
          </HeadTitle>
          <!-- 关联课程信息 -->
          <HeadTitle
            head-title="关联课程信息"
            size="small"
            v-if="Object.keys(this.rowData).length !== 0"
          >
            <template slot="content">
              <!-- 关联课程信息表格 -->
              <el-table
                :data="tableData"
                style="width: 100%"
                max-height="250"
                class="el-table"
              >
                <!-- 课程编号 -->
                <el-table-column
                  prop="courseNo"
                  label="课程编号"
                  align="center"
                  min-width="150"
                />
                <!-- 课程名称 -->
                <el-table-column
                  prop="courseName"
                  label="课程名称"
                  align="center"
                  min-width="200"
                  show-overflow-tooltip
                />
                <!-- 课程讲师 -->
                <el-table-column
                  prop="teacher"
                  label="课程讲师"
                  align="center"
                  min-width="120"
                />
              </el-table>
            </template>
          </HeadTitle>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitOnclick">确定</el-button>
      </div>
    </el-dialog>
    <!-- 字段信息 -->
    <field-dialog
      :title="title1"
      :dialog-visible="dialogVisible"
      :type="type"
      @cancel="cancel1"
      @func="paramsFunc"
      :fileDate="BOList"
      v-if="dialogVisible"
   
    />
    <Preview
      :dialogVisible.sync="previewVisible"
      v-if="previewVisible"
      :fileDate="form.fileInfoResultBOList"
    
    />
  </div>
</template>
<script>
import fieldDialog from "@/components/template/fieldDialog.vue";
import HeadTitle from "@/components/commons/HeadTitle";
import Preview from "@/components/template/preview";
import {
  getTemplateAddEdit,
  getTemplateRelateCourse,
  checkTemplateDetail,
} from "@/api/questionnaireTemplate";

export default {
  name: "FiledDialog",
  components: { HeadTitle, fieldDialog, Preview },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: true,
    },
    signto: {
      type: Boolean,
      default: true,
    },
    params: Object,
    title: String,
    type: String,
    rowData: Object,
  },
  data() {
    return {
      form: {
        fileInfoResultBOList: [], //选项集合
        id: "",
        relateCourseCount: 0,
        remarks: "",
        status: 1,
        templateName: "",
        templateNo: "",
        type: this.type,
        updateUserId: "",
        // createTime: "",
        // createUserId: ''
      },
      index: "",
      buttonVisible: true,
      tableData: [],
      tableData1: [],
      list: [],
      dialogVisible: false,
      BOList: {},
      title1: "",
      formRules: {
        templateName: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
      },
      previewVisible: false,
      templateId: "",
    };
  },
  mounted() {
    console.log(this.type, "this.type");
    if (Object.keys(this.rowData).length !== 0) {
      this.templateId = this.rowData.id;
      // 编辑
      this.search(); //获取模板集合和编辑详情
    }
  },
  methods: {
    // 获取模版关联的课程
    async search() {
      const { data } = await getTemplateRelateCourse({
        templateId: this.templateId,
      });
      this.tableData = data;
      // 查询模版详情
      const res = await checkTemplateDetail(this.rowData.id);
      this.form = res.data;
    },
    paramsFunc(val) {
      const param = {
        fieldChoiceList: val.fieldChoiceList,
        fieldContent: val.fieldContent, //字段默认值
        fieldName: val.fieldName, //字段名称
        isRequired: val.isRequired, //字段校验，是否必填。1是0否
        sortNum: val.sortNum, //字段排序
        type: val.type,
      };
      if (!this.index && this.index !== 0) {
        this.form.fileInfoResultBOList.push(param);
      } else {
        // this.form.fileInfoResultBOList[this.index] = JSON.parse(JSON.stringify(param))
        this.$set(this.form.fileInfoResultBOList, [this.index], param);
        this.index = "";
      }
      this.dialogVisible = false;
    },
    // 新增 | 编辑  字段信息
    onClickAdd(row, index) {
      this.dialogVisible = true;
      if (index >= 0) {
        //编辑
        this.BOList = row;
        this.title1 = "编辑";
        this.index = index;
      } else {
        //新增
        this.BOList = {};
        this.title1 = "新增";
      }
    },
    // 删除字段信息
    deleteMsg(index) {
      this.form.fileInfoResultBOList.splice(index, 1);
    },

    cancel() {
      this.$emit("cancel", false);
    },
    cancel1(value) {
      this.dialogVisible = value;
    },
    // 提交
    async submitOnclick() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.fileInfoResultBOList.length > 0) {
            this.onSubmit();
          } else {
            this.$message.error("字段信息不能为空");
          }
        } else {
          return false;
        }
      });
    },
    async onSubmit() {
      await getTemplateAddEdit(this.form);
      this.$message.success("操作成功");
      // this.cancel()
      this.$emit("cancel", false);
      this.$parent.search();
    },
  },
};
</script>

<style lang="scss" scoped>
.filed-page {
  .el-dialog__body {
    padding: 10px 20px;
    .title {
      width: 100%;
      display: flex;
      line-height: 20px;
      font-size: 1.17em;
      position: relative;
      .el-button {
        position: absolute;
        right: 10px;
        bottom: -4px;
        cursor: pointer;
      }
      img {
        height: 20px;
        width: 20px;
        position: absolute;
        right: 10px;
        cursor: pointer;
      }
      .basenews {
        font-weight: 600;
        font-size: 14px;
      }
      .icon {
        width: 5px;
        background: #ff9217;
        margin-right: 10px;
      }
      .basestatus {
        position: absolute;
        right: 0;

        font-size: 14px;
      }
    }
  }
}
.diaScreen {
  height: 550px;
  overflow: auto;
}
</style>
