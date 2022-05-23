<template>
  <div class="detail">
    <quillEditor slot="content" class="quillEditor" :course-form="formData" />
  </div>
</template>

<script>
import quillEditor from '@/components/commons/quillEditor'
export default {
  name: 'Details',
  components: { quillEditor },
  data() {
    return {
      formData: {}
    }
  }
}
</script>

<style lang="scss">

</style>
