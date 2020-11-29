<template>
  <div class="home">
    <TheScroll></TheScroll>
  </div>
</template>

<script>
// @ is an alias to /src
import TheScroll from '@/components/plugins/TheScroll.vue'

export default {
  name: 'Home',
  components: {
    TheScroll
  }
}
</script>
