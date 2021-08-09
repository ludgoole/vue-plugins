<template>
  <div class="HomeView">
    <img alt="Vue logo" src="@/assets/image/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  computed: {
    ...mapState('home', ['contentList'])
  },
  async created() {
    await this.getOne()
    console.log('contentList', this.contentList)
  },
  methods: {
    ...mapActions('home', ['getOne'])
  }
}
</script>

<style>
.HomeView {
  color: #2c3e50;
  text-align: center;
}
</style>
