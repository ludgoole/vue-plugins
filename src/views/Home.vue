<template>
  <div class="home">
    <p>{{ moment.format('YYYY-MM-DD hh:mm:ss') }}</p>
  </div>
</template>

<script>
// @ is an alias to /src

import moment from 'moment'

export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  },
  computed: {
    moment() {
      return moment()
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.home {
  background: chocolate;
}
</style>
