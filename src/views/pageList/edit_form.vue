<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    v-bind="dialogAttributes"
    @close="dialogVisible = false"
    @open="$nextTick(() => $refs.form.clearValidate())"
    @keydown.enter.native="onSubmit"
  >
    <el-form ref="form" :model="formData" :rules="rules" v-bind="formAttributes">
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="formData.nickName" clearable :minlength="200" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="formData.sex">
          <el-option v-for="(label, value) in sexEnum" :key="label" :label="label" :value="value" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio-button v-for="(value,label) in sexEnum" :key="label" :label="label">{{ value }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="formData.sort" controls-position="right" :min="0" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button
        size="small"
        type="primary"
        :loading="loading"
        @click="onSubmit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addTable } from '@/api/table'
export default {
  name: 'EditForm',
  props: {
    sexEnum: {
      type: Object,
      required: true
    }
  },
  data() {
    this.rules = {
      nickName: { required: true, message: '昵称不能为空', trigger: 'blur' },
      sex: { required: true, message: '性别不能为空', trigger: 'change' },
      sort: { required: true, message: '排序不能为空', trigger: 'blur' }
    }
    return {
      dialogVisible: false,
      formData: {
        nickName: '',
        sex: '',
        sort: 0
      },
      title: '新增',
      loading: false
    }
  },
  methods: {
    /**
     * 打开对话框
     * @param {Object} data
     */
    open(data) {
      const { formData = {}, title } = data
      this.formData = { ...this.$options.data.call(this).formData, ...formData }
      this.title = title ?? this.title
      this.dialogVisible = true
    },
    /**
     * 确认
     */
    async onSubmit() {
      await this.$refs.form.validate()
      const { formData } = this
      this.loading = true
      addTable(formData)
        .then(() => {
          this.$emit('handleSearch')
          this.dialogVisible = false
          this.$message.success('操作成功')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
