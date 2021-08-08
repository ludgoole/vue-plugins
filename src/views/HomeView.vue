<template>
  <div class="HomeView">
    <img alt="Vue logo" src="@/assets/image/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style>
.HomeView {
  color: #2c3e50;
  text-align: center;
}
</style>
