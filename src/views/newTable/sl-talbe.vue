<template>
  <div>
    <el-table :data="data">
      <el-table-column
        v-for="item in column"
        :key="item.prop"
        :show-overflow-tooltip="showOverflowTooltip"
        align="center"
        v-bind="item"
      />
      <slot />
    </el-table>
  </div>
</template>

<script>
import minix from "@/utils/minix";
export default {
  name: "SlTable",
  mixins: [minix],
  props: {
    data: {
      type: Array,
      required: true,
    },
    column: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
