<template>
  <div>
    <el-card>
      <searchForm>
        <el-form
          ref="queryForm"
          class="search-form"
          :model="searchForm"
          v-bind="formAttributes"
        >
          <el-row
            type="flex"
            class="flex-wrap"
            @keydown.enter.native="handleSearch"
          >
            <el-form-item label="输入框" prop="text">
              <el-input
                v-model="searchForm.text"
                clearable
                placeholder="请输入输入框"
              />
            </el-form-item>
            <el-form-item label="数字输入框" prop="number">
              <el-input
                v-model.number="searchForm.number"
                type="number"
                title=" "
                clearable
                placeholder="请输入数字输入框"
              />
            </el-form-item>
            <el-form-item label="输入框" prop="select">
              <el-select v-model="searchForm.select" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="时间框" prop="date">
              <el-date-picker
                v-model="searchForm.date"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="handleSearch"
              >查询</el-button>
              <el-button
                icon="el-icon-refresh-left"
                @click="resetForm('queryForm')"
              >重置</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </searchForm>

      <el-row class="operation">
        <el-button type="primary" size="small" @click="addData">新增</el-button>
      </el-row>

      <el-table v-loading="loading" :data="tableData.records" v-bind="tableAttributes">
        <el-table-column
          type="selection"
          align="center"
          width="55"
        />
        <!-- 序号 -->
        <el-table-column
          v-bind="tableColumnAttributes"
          label="序号"
          type="index"
          width="55"
        />
        <el-table-column
          prop="nickName"
          v-bind="tableColumnAttributes"
          label="昵称"
          min-width="150"
        />
        <el-table-column
          prop="userName"
          v-bind="tableColumnAttributes"
          label="姓名"
          min-width="150"
        />
        <el-table-column
          prop="sex"
          v-bind="tableColumnAttributes"
          label="性别"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ sexEnum[scope.row.sex] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="birthday"
          v-bind="tableColumnAttributes"
          label="生日"
          min-width="150"
        />
        <el-table-column
          prop="phone"
          v-bind="tableColumnAttributes"
          label="电话"
          min-width="150"
        />
        <el-table-column
          prop="remark"
          v-bind="tableColumnAttributes"
          label="备注"
          min-width="150"
        />
        <el-table-column
          fixed="right"
          v-bind="tableColumnAttributes"
          align="center"
          label="操作"
          width="220"
        >
          <template v-slot="scope">
            <el-button size="mini" type="success" @click="tableEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="tableDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-bind="paginationAttributes"
        :current-page.sync="tableData.current"
        :page-size="searchForm.size"
        :total="tableData.total"
        @size-change="changePageSize"
        @current-change="changePage"
      />
    </el-card>

    <edit-form :title="editData.title" :visible.sync="editData.visible" :form-data="editData.formData" :sex-enum="sexEnum" />
  </div>
</template>

<script>
import searchForm from '@/commons/search_form'
import editForm from './edit_form'

import { searchAttr } from '@/utils/minix'

import { getuserList } from '@/api/table'
export default {
  name: 'PageList',
  components: { searchForm, editForm },
  mixins: [searchAttr],
  data() {
    this.options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]
    this.sexEnum = {
      0: '男',
      1: '女'
    }
    return {
      searchForm: {
        text: '',
        number: '',
        select: '',
        date: [],
        pageNum: 1,
        size: 10
      },
      tableData: {
        records: [],
        total: 100,
        current: 1
      },
      loading: false,
      editData: {
        formData: {
          nickName: '',
          sex: '',
          sort: 0
        },
        visible: false,
        title: ''
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    /**
     * 新增数据
     */
    addData() {
      this.editData = {
        formData: this.$options.data.call(this).editData.formData,
        visible: true,
        title: '新增'
      }
    },
    /**
     * 编辑数据
     */
    tableEdit(row) {
      this.editData = {
        formData: { ...row },
        visible: true,
        title: '编辑'
      }
    },
    /**
     * 删除数据
     */
    tableDel(row) {
      this.$confirm('此操作将删除此数据, 是否继续?', '确认操作', {
        type: 'warning'
      }).then(() => {
        this.$message.success('操作成功!')
      }).catch(() => {
        this.$message.info('已取消操作')
      })
    },
    /**
     * 获取列表数据
     */
    async getTableData() {
      this.loading = true
      const { data } = await getuserList(this.searchForm)
      this.tableData = data
      this.loading = false
    },
    /**
     * 分页 改变页码
     */
    changePage(v) {
      this.searchForm.pageNum = v
      this.getTableData()
    },
    /**
     * 分页 改变页数
     */
    changePageSize(v) {
      this.searchForm.size = v
      this.getTableData()
    },
    /**
     * 搜索
     */
    handleSearch() {
      const { pageNum } = this.$options.data.call(this).searchForm
      this.tableData.current = pageNum
      this.getTableData()
    },
    /**
     * 重置
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      const { pageNum, size } = this.$options.data.call(this).searchForm
      this.tableData.current = pageNum
      this.searchForm.size = size
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
