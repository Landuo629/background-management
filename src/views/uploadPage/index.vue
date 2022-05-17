<template>
  <div>
    <upload
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </upload>

  </div>
</template>

<script>
import upload from '@/components/commons/upload'
export default {
  components: {
    upload
  },
  data() {
    return {
    }
  }
}
</script>

<style>

</style>
