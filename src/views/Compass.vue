<template>
  <div class="Compass flex flex-center flex-middle">
    <VeGauge :direction="direction" :alpha="alpha"></VeGauge>
  </div>
</template>

<script>
import _ from 'lodash'
import VeGauge from '@/components/VeGauge.vue'
export default {
  name: 'Compass',
  components: {
    VeGauge
  },
  data() {
    return {
      direction: 1,
      alpha: 0,
      beta: 0,
      gamma: 0,
      timeStamp: 0
    }
  },
  created() {
    window.addEventListener(
      'deviceorientation',
      _.throttle(this.handleOrientation, 100),
      true
    )
  },
  mounted() {},
  methods: {
    handleOrientation(event) {
      this.alpha = 360 - Math.round(event.alpha)
      this.beta = event.beta
      this.gamma = event.gamma
      this.timeStamp = event.timeStamp

      this.direction = (this.alpha / 45).toFixed(1)
      console.log(event)
    }
  }
}
</script>

<style lang="scss" scoped>
.Compass {
  height: 100%;
}
</style>
