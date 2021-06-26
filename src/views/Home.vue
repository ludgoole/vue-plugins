<template>
  <div class="home">
    <TheScroll></TheScroll>
    <el-button type="primary" @click="click">储存</el-button>
    {{ this.$store.state.token }}
    {{ this.$store.state.auth }}
    {{ this.$store.state.menu.menu }}
  </div>
</template>

<script>
// @ is an alias to /src
import TheScroll from '@/components/plugins/TheScroll.vue'

export default {
  name: 'Home',
  components: {
    TheScroll
  },
  methods: {
    click() {
      this.$store.commit('setToken', 'token')
      this.$store.commit('setAuth', 'true')
      this.$store.commit('menu/SET_MENU', [1, 2, 3])
    }
  }
}
</script>
