<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">

.pointer {
  cursor: pointer;
}

.textOverflow {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.textOverflow1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.textOverflow2 {
  @extend .textOverflow;
  -webkit-line-clamp: 2;
}

.textOverflow3 {
  @extend .textOverflow;
  -webkit-line-clamp: 3;
}

.textOverflow4 {
  @extend .textOverflow;
  -webkit-line-clamp: 4;
}
</style>
