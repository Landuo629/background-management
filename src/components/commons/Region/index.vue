<template>
  <div class="Region">
    <el-cascader
      :props="props"
      @change="onChange"
      v-model="data.value"
      placeholder=""
    ></el-cascader>
  </div>
</template>

<script>
import { getRegionList } from "@/api/ommonRegionController";
export default {
  name: "Region",
  props: {
    data: Object,
    level: {
      type: Number,
      default: 2,
    },
  },
  data() {
    const that = this;
    return {
      props: {
        lazy: true,
        async lazyLoad(node, resolve) {
          const { level, value = "" } = node;
          const { data } = await getRegionList({
            level: level + 1,
            parentId: value,
          });
          resolve(
            data.map((item) => ({
              value: item.id,
              label: item.name,
              leaf: level >= that.level,
            }))
          );
        },
      },
    };
  },
  methods: {
    onChange(e) {
      this.$emit("change", e);
    },
  },
};
</script>

<style lang="scss">
.Region {
  .el-cascader {
    width: 100%;
  }
}
</style>
