<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    v-bind="dialogAttributes"
    @close="dialogVisible = false"
    @closed="$refs.form.resetFields()"
  >
    <el-form ref="form" :model="formData" :rules="rules" v-bind="formAttributes">
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="formData.nickName" />
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
import { dialogOption } from '@/utils/minix'

import { addTable } from '@/api/table'
export default {
  name: 'EditForm',
  mixins: [dialogOption],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    formData: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
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
      loading: false
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    /**
     * 确认
     */
    onSubmit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          const { formData } = this
          this.loading = true
          try {
            await addTable(formData)
            this.$emit('handleSearch')
            this.dialogVisible = false
            this.$message.success('操作成功')
          } catch (err) {
            console.error(err)
          }
          this.loading = false
        }
      })
    }
  }
}
</script>
