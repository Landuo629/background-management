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
        <el-col
          v-for="item in option"
          :key="item.prop"
          :xs="24"
          :md="12"
          :lg="8"
          :xl="6"
        >
          <el-form-item :label="item.label" :prop="item.prop">
            <component
              :is="'el-' + item.component"
              v-model="value[item.prop]"
              clearable="true"
              v-bind="item.attrs"
            >
              <div v-if="item.component === 'select'">
                <el-option
                  v-for="_item in item.optionList"
                  :key="_item.value"
                  :label="_item.label"
                  :value="_item.value"
                />
              </div>
            </component>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8" :xl="6">
          <el-form-item>
            <el-button type="primary" @click="onSearch()">查询</el-button>
            <el-button @click="resetForm('queryForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import minix from "@/utils/minix";
export default {
  mixins: [minix],
  props: {
    option: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /**
     * 查询
     */
    onSearch() {
      this.$emit("onSearch");
    },
    /**
     * 重置
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("resetForm");
    },
  },
};
</script>
