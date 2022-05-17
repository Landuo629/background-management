<template>
  <div class="language">
    <button @click="setLanguage('en')">切换英文</button>
    <button @click="setLanguage('zh-CN')">切换中文</button>
    <div>{{ $t('public.test') }}</div>
    <el-date-picker
      v-model="date"
      type="datetime"
    />
  </div>
</template>

<script>
import { setLocaleMessage } from '@/lang'
export default {
  name: 'Language',
  data() {
    return {
      date: ''
    }
  },
  methods: {
    setLanguage(lang) {
      setLocaleMessage(lang)
    }
  }
}
</script>

<style lang="scss">

</style>
