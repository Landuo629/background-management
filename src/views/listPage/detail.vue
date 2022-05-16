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
            <div v-if="!operate">
              <el-row type="flex" justify="space-around">
                <el-col :xs="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="姓名" prop="userName">
                    <span>{{ formData.userName }}</span>
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
                  <el-form-item label="图片" prop="image">
                    <img :src="formData.image">
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="备注" prop="remark">
                    <span>{{ formData.remark }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div v-else>
              <el-row type="flex" justify="space-around">
                <el-col :xs="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="姓名" prop="userName">
                    <el-input v-model="formData.userName" type="text" clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="昵称" prop="nickName">
                    <el-input v-model="formData.nickName" type="text" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-around">
                <el-col :xs="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="性别" prop="sex">
                    <el-select v-model="formData.sex" clearable>
                      <el-option label="女" :value="0" />
                      <el-option label="男" :value="1" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="出生日期" prop="birthday">
                    <el-date-picker
                      v-model="formData.birthday"
                      type="date"
                      placeholder="选择日期"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-around">
                <el-col :xs="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="图片" prop="image">
                    <el-upload
                      v-model="formData.image"
                      class="avatar-uploader"
                      :action="baseURL"
                      :show-file-list="false"
                      accept="image/jpg,image/jpeg,image/png"
                      :before-upload="handleBeforeUpload"
                      :on-success="handleAvatarSuccess"
                      :headers="headers"
                      :on-progress="onProgress"
                    >
                      <img
                        v-if="formData.image"
                        :src="formData.image"
                        class="avatar"
                      >
                      <i v-else class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="备注" prop="remark">
                    <el-input v-model="formData.remark" type="textarea" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
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
import options from '@/utils/loadingOption'
import { getToken } from '@/utils/auth'
import { getDetail } from '@/api/table'

export default {
  name: 'ListPageDetail',
  components: { HeadTitle },
  mixins: [minix],
  data() {
    return {
      headers: { token: getToken() },
      baseURL: process.env.VUE_APP_BASE_API + '/admin/oss/oss/upload',
      formData: {},
      operate: ''
    }
  },
  mounted() {
    const { operate, id } = this.$route.query
    this.operate = operate === 'edit'
    this.titel = operate === 'edit' ? '编辑页面' : '详情页面'
    this.getDetail(id)
  },
  methods: {
    async getDetail(id) {
      const { data } = await getDetail({ id })
      this.formData = data
    },
    goBack() {
      this.$router.go(-1)
    },
    // 判断上传的是否为图片
    handleBeforeUpload(file) {
      var img = file.name.substring(file.name.lastIndexOf('.') + 1)
      const suffix = img === 'jpg'
      const suffix2 = img === 'png'
      const suffix3 = img === 'jpeg'
      if (!suffix && !suffix2 && !suffix3) {
        this.$message.error('只能上传图片！')
        return false
      }
      return suffix || suffix2 || suffix3
    },
    // 图片上传成功回调
    handleAvatarSuccess(file) {
      const { data, code } = file
      if (code === 10000) {
        this.ruleForm.mainPicUrl = data
        this.$refs.ruleForm.clearValidate('mainPicUrl')
      } else {
        this.$message.errer(file.msg)
      }
      this.gobalLoading.close()
    },
    onProgress() {
      this.gobalLoading = this.$loading(options)
    }
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
