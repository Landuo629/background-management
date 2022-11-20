<template>
  <div class="Search">
    <el-tooltip class="item" effect="dark" :content="isShow ? '收起查询':'展开查询'" placement="top-end">
      <div class="showClass" @click="isShow = !isShow">
        <i :class="isShow ? 'el-icon-zoom-out' : 'el-icon-zoom-in'" />
      </div>
    </el-tooltip>
    <el-collapse-transition>
      <div v-show="isShow" class="content">
        <slot />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      isShow: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .Search {
    position: relative;
    min-height: 16px;
    .showClass {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 99;
      cursor: pointer;
      padding: 3px;
      color: #5a5161;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    }
    .content {
      padding: 10px 10px 0 0;
      background-color: #f0f0f0;
      border-radius: 0.4em;
      ::v-deep .el-date-editor--daterange.el-input__inner {
        width: 250px;
        padding: 3px 6px;
      }
    }
  }
</style>
