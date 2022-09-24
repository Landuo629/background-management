<template>
  <div>
    <header>
      <div v-for="item in quertOption" :key="item.props">
        {{ render(item.render) }}
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    quertOption: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
