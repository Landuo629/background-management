<template>
  <div class="Dashboard">
    <img :src="emptyGif" class="emptyGif">
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  }
}
</script>

<style lang="scss" scoped>
.Dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e3e3e3;
  height: calc(100vh - 100px);
  img {
    width: 40%;
  }
}
</style>
