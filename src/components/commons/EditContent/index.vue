<template>
  <div class="wrapper">
    <span v-show="inSideVisible" class="showContent">
      <span>{{ content }}</span>
      <img src="@/assets/edit.png" @click="edit">
    </span>
    <span v-show="!inSideVisible" class="content">
      <slot name="content"/>
      <svg-icon class="tableSvgIcon svgGreen" icon-class="confirm" @click="confirm"/>
      <svg-icon class="tableSvgIcon svgRed" icon-class="cancel" @click="close"/>
    </span>
  </div>
</template>
<script>
export default {
  name: 'EditContent',
  props: {
    content: {
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inSideVisible: true
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.inSideVisible = !val
      },
      immediate: true
    }
  },
  methods: {
    confirm() {
      this.$emit('operate', true)
    },
    close() {
      this.visible = true
      this.$emit('operate', false)
    },
    edit() {
      this.$emit('edit', true)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  align-items: center;

  .input {
    width: 100%;
  }
}

.tableSvgIcon {
  margin-left: 5px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.showContent {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  img {
    margin-left: 5px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.svgGreen {
  fill: #0af331 !important;
}

.svgRed {
  fill: #ff40ac !important;
}

.input {
  width: 60px;
}
</style>
