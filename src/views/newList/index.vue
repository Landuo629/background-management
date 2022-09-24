<template>
  <div>
    <List :quert-option="quertOption" />
  </div>
</template>

<script>
import List from './modules/index'
export default {
  name: 'NewList',
  components: {
    List
  },
  data() {
    const quertOption = [
      {
        label: '姓名',
        props: 'name',
        render: () => (<el-input clearable />)
      }
    ]
    return {
      quertOption
    }
  },
  methods: {

  }
}
</script>
