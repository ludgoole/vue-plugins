<template>
  <div id="app" class="flex flex-column">
    <van-nav-bar
      v-if="$route.meta.title"
      :title="$route.meta.title"
      :left-text="$route.meta.leftText"
      :right-text="$route.meta.rightText"
      :left-arrow="!!$route.meta.leftArrow"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view class="router-view" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$route.meta.leftArrow && this.$router.go(-1)
    },
    onClickRight() {
      this.$route.meta.rightText && this.$bus.$emit('global.rightClick')
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
