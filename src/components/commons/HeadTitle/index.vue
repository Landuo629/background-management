<template>
  <div class="headTitle">
    <div class="head">
      <span>{{ headTitle }}</span
      ><span class="tips" v-if="tips">({{ tips }})</span>
      <el-button type="text" class="show" v-if="buttonVisible" size="mini" @click="show"
        >预览</el-button
      >
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
export default {
  name: "HeadTitle",
  props: {
    headTitle: {
      type: String,
      default: "章节标题",
    },
    size: {
      type: String,
      default: "primary",
    },
    tips: {
      type: String,
    },
    buttonVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    show() {
      this.$emit("show", true);
    },
  },
};
</script>
<style lang="scss">
.headTitle {
  margin: 10px 0;
  .head {
    width: 100%;
    padding: 10px 30px 10px 30px;
    background: #f5f7fa;
    color: #20a0ff;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    position: relative;
    .show {
      position: absolute;
      top: 4px;
      right: 50px;
    }
  }
  .content {
    background: #ffffff;
  }
  .tips {
    margin-left: 5px;
    color: #5a5e66;
    font-size: 12px;
  }
}
</style>
