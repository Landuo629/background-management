<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <div class="page">
        <router-view :key="key" />
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
.page {
  margin: 10px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.3);
  min-height: calc(100vh - 70px);
  padding: 16px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
