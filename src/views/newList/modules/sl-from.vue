<template>
  <div>
    <el-form
      ref="queryForm"
      class="queryParams"
      :model="value"
      :label-suffix="labelSuffix"
      :label-width="labelWidth"
    >
      <el-row type="flex" class="flex-wrap">
        <el-col v-for="item in option.column" :key="item.prop" :xs="24" :md="12" :lg="8" :xl="6">
          <el-form-item :label="item.label">
            <component :is="'el-'+item.component" v-model="value[item.prop]" v-bind="item.props">
              <component :is="'el-'+item.slot.component" v-if="item.slot" />
            </component>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8" :xl="6">
          <el-form-item>
            <el-button type="primary" @click="queryParams.page=1;onSearch()">查询</el-button>
            <el-button @click="resetForm('queryForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  }
}
</script>
