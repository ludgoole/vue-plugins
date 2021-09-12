<template>
  <div class="BaseDirective" v-click-outside="onClickOutside">
    <p>{{ msg }}</p>
    <el-button type="primary" v-copy="msg">复制</el-button>
    <el-button
      type="primary"
      v-download-data="$data"
      v-download-data:type="'json'"
      >download</el-button
    >
  </div>
</template>

<script>
import { copy } from 'v-copy'
import vClickOutside from 'v-click-outside'
import { downloadData } from 'v-download'

export default {
  name: 'BaseDirective',
  directives: {
    copy,
    downloadData,
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      msg: 'BaseDirective'
    }
  },
  methods: {
    onClickOutside(event) {
      console.log('Clicked outside Event: ', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseDirective {
  color: #666;
}
</style>
