<template>
  <div class="home">
    <p>{{ now }}</p>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import Vue from 'vue'
// import { Button } from 'vant'
import moment from 'moment'

// Vue.use(Button)

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
