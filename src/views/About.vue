<template>
  <div class="about">
    <h1>This is an about page</h1>
    <BaseSwiper v-if="false"></BaseSwiper>
    <VView v-if="false"></VView>
    <BaseFullpage></BaseFullpage>
  </div>
</template>

<script>
// @ is an alias to /src
import components from '@/components'
export default {
  name: 'Home',
  components: {
    ...components
  },
  data() {
    return {}
  },
  provide() {
    return {}
  }
}
</script>
