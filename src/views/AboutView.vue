<template>
  <div class="AboutView">this is a About view</div>
</template>

<script>
export default {
  name: 'AboutView',
  mounted() {
    // apicloud
    // 全局toast
    this.$toast({ msg: '页面已经打开', location: 'top' })

    // webpack.ProvidePlugin
    // 全局变量
    console.log('lodash', _)
    console.log('localforage', localforage)
    console.log('Util', Util)
  }
}
</script>

<style lang="scss" scoped>
.AboutView {
  width: 100%;
  height: 375px;
  text-align: center;
  background: $color-primary;
}
</style>
