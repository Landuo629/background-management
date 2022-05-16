<!--
 * @Description: 列表测试页
-->
<template>
  <div class="listPage">
    <header>
      <el-form
        ref="queryForm"
        class="queryParams"
        :model="queryParams"
        :label-suffix="labelSuffix"
        :label-width="labelWidth"
      >
        <el-row type="flex" class="flex-wrap">
          <el-col :xs="24" :md="12" :lg="8" :xl="6">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="queryParams.userName" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8" :xl="6">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="queryParams.phone" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8" :xl="6">
            <el-form-item label="企业名称" prop="companyName">
              <el-input v-model="queryParams.companyName" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8" :xl="6">
            <el-form-item>
              <el-button type="primary" @click="queryParams.page=1;onSearch()">查询</el-button>
              <el-button @click="resetForm('queryForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="operate">
          <el-button
            v-permission="['superAdmin']"
            type="primary"
            class="import"
          >新增</el-button>
        </el-row>
      </el-form>
    </header>
    <main>
      <el-table :data="tableData" header-cell-class-name="tableHead">
        <el-table-column
          prop="nickName"
          :show-overflow-tooltip="showOverflowTooltip"
          align="center"
          label="昵称"
          min-width="150"
        />
        <el-table-column
          prop="userName"
          :show-overflow-tooltip="showOverflowTooltip"
          align="center"
          label="姓名"
          min-width="120"
        />
        <el-table-column
          prop="sex"
          :show-overflow-tooltip="showOverflowTooltip"
          align="center"
          label="性别"
          min-width="120"
        >
          <template slot-scope="scope">
            {{
              scope.row.sex === null ? "" : scope.row.sex === 0 ? "女" : "男"
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="birthday"
          :show-overflow-tooltip="showOverflowTooltip"
          align="center"
          label="出生日期"
          min-width="120"
        />
        <el-table-column
          prop="phone"
          :show-overflow-tooltip="showOverflowTooltip"
          align="center"
          label="手机号"
          min-width="120"
        />
        <el-table-column
          prop="image"
          :show-overflow-tooltip="showOverflowTooltip"
          align="center"
          label="图片"
          min-width="120"
        >
          <template slot-scope="scope">
            <img :src="scope.row.image">
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          :show-overflow-tooltip="showOverflowTooltip"
          align="center"
          label="备注"
          min-width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.remark === null ? "" : scope.row.remark }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="edit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="delForm(scope.row)"
            >删除</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <footer class="commonFooter">
      <el-pagination
        :current-page.sync="tableCurrent"
        :page-size="queryParams.size"
        :layout="tableLayout"
        :total="total"
        @size-change="
          queryParams.page = $event;
          onSearch();
        "
        @current-change="
          queryParams.page = $event;
          onSearch();
        "
      />
    </footer>
  </div>
</template>

<script>
import minix from '@/utils/minix'
import {
  getuserList,
  deleteUser
} from '@/api/UserInformation'

export default {
  name: 'ListPage',
  mixins: [minix],
  data() {
    return {
      total: 0,
      tableCurrent: 1,
      dialogVisible: false,
      queryParams: {
        userName: '',
        phone: '',
        companyName: '',
        expectTarget: '',
        type: '',
        page: 1,
        size: 10
      },
      tableData: []
    }
  },
  mounted() {
    this.onSearch()
  },
  methods: {
    // 查询
    async onSearch() {
      const {
        data: { records, total }
      } = await getuserList(this.queryParams)
      this.total = total
      this.tableData = records
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 详情
    handleClick(val) {
      this.$router.push(`/listPageDetail?operate=check&id=${val.id}`)
    },
    // 删除用户
    delForm(val) {
      this.$confirm('确认删除', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteUser({ id: val.id })
          this.$message.success('操作成功')
          this.onSearch()
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    // 编辑
    edit(val) {
      this.$router.push(`/listPageDetail?operate=edit&id=${val.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.operate {
  margin-bottom: 10px;
  .import {
    margin-right: 10px;
  }
}
</style>
