<template>
  <div class="editUserInfo">
    <header>
      <el-page-header :content="titel" @back="goBack" />
    </header>
    <main>
      <HeadTitle head-title="个人信息" size="primary">
        <template slot="content">
          <el-form
            ref="form"
            :model="formData"
            :rules="formDataRules"
            class="formData"
            label-width="auto"
            :label-suffix="labelSuffix"
          >
            <el-row type="flex" justify="space-around">
              <el-col :xs="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="姓名" prop="userName">
                  <span v-if="!operate || isOperation">{{ formData.userName }}</span>
                  <el-input v-else v-model="formData.userName" type="text" clearable />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="昵称" prop="nickName">
                  <span>{{ formData.nickName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :xs="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="性别" prop="sex">
                  <span>{{
                    formData.sex === null ? "" : formData.sex === 0 ? "女" : "男"
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="出生日期" prop="birthday">
                  <span>{{ formData.birthday }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :xs="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="公司职位" prop="position">
                  <span>{{ positionTypeName(formData.position) }}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="手机号" prop="phone">
                  <span v-if="!operate || isOperation">{{ formData.phone }}</span>
                  <el-input v-else v-model="formData.phone" type="number" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :xs="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="用户类型" prop="type">
                  <span>{{
                    formData.type === 0
                      ? "普通用户"
                      : formData.type === 1
                        ? "试听用户"
                        : "会员用户"
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="剩余选课次数" prop="courseTicket">
                  <span v-if="!operate">{{ formData.courseTicket }}</span>
                  <el-input
                    v-else
                    v-model="formData.courseTicket"
                    type="number"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :xs="24" :md="24" :lg="18" :xl="18">
                <el-form-item label="常住地址" prop="address">
                  <span>{{ formData.address }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :xs="24" :md="24" :lg="18" :xl="18">
                <el-form-item label="企业名称" prop="companyName">
                  <span v-if="!operate">{{ formData.companyName }}</span>
                  <el-input
                    v-else
                    v-model="formData.companyName"
                    type="text"
                    clearable
                    class="companyName"
                  />
                </el-form-item>
              </el-col>
              <!-- <el-col :xs="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="成立时间" prop="establishmentTime">
                  <span>{{ formData.establishmentTime }}</span>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :xs="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="所属行业" prop="industry">
                  <span>{{ industryName(formData.industry) }}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12" :lg="6" :xl="6">
                <el-form-item label="企业规模" prop="companyScale">
                  <span>{{ companyScaleName(formData.companyScale) }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :xs="24" :md="24" :lg="18" :xl="18">
                <el-form-item label="期望学习" prop="expectTarget">
                  <span>{{ expectTargetName(formData.expectTarget) }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :xs="24" :md="24" :lg="18" :xl="18">
                <el-form-item label="备注" prop="remark">
                  <span v-if="!operate">{{ formData.remark }}</span>
                  <el-input v-else v-model="formData.remark" type="textarea" clearable />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </HeadTitle>
    </main>
    <footer class="layoutFooter">
      <el-button type="primary" @click="confirmForm('form')">提 交</el-button>
    </footer>
  </div>
</template>
<script>
import minix from '@/utils/minix'
import HeadTitle from '@/components/commons/HeadTitle'
export default {
  name: 'ListPageDetail',
  components: { HeadTitle },
  mixins: [minix],
  data() {
    return {
    }
  },
  confirmForm(formName) {
    const { id } = this.demoLessonData // 课程id
    this.$refs[formName].validate((valid) => {
      if (valid) {
        (async() => {
          await updateUsers({ ...this.formData, auditionCourseId: id })
          this.goBack() // 返回页面
        })()
      }
    })
  }
}
</script>
<style lang="scss">
.el-form-item__content .companyName {
  width: 21%;
}
.addCourse {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
}
.single-select-table thead .el-table-column--selection .cell {
  display: none;
}
</style>
