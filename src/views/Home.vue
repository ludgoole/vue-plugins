<template>
  <div class="home">
    <p>{{ now }}</p>
  </div>
</template>

<script>
// @ is an alias to /src

import moment from 'moment'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      now: Date.now()
    }
  },
  mounted() {
    setInterval(() => {
      this.now = moment(Date.now()).format('YYYY-MM-DD hh:mm:ss')
    }, 1000)
  }
}
</script>
<style lang="scss">
.home {
  font-size: 24px;
}
</style>
