<template>
  <div>
    <el-form
      ref="queryForm"
      class="queryParams"
      :model="queryParams"
      :label-suffix="labelSuffix"
      :label-width="labelWidth"
    >
      <el-row type="flex" class="flex-wrap">
        <slot />
      </el-row>
    </el-form>
  </div>
</template>

<script>
import minix from '@/utils/minix'
export default {
  name: 'SlFrom',
  mixins: [minix],
  model: {
    type: Object,
    required: true
  }
}
</script>
