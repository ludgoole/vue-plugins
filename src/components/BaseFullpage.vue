<template>
  <div class="BaseFullpage">
    <div class="fullpage-wp" v-fullpage="opts">
      <div class="page-1 page">
        <p class="part-1" v-animate="{ value: 'bounceInLeft' }">
          vue-fullpage1
        </p>
      </div>
      <div class="page-2 page">
        <p class="part-2" v-animate="{ value: 'bounceInRight' }">
          vue-fullpage2
        </p>
        <el-button @click="lock">锁定</el-button>
        <el-button @click="unlock">解锁</el-button>
      </div>
      <div class="page-3 page">
        <p class="part-3" v-animate="{ value: 'bounceInLeft', delay: 0 }">
          vue-fullpage3
        </p>
        <p class="part-3" v-animate="{ value: 'bounceInRight', delay: 600 }">
          vue-fullpage4
        </p>
        <p class="part-3" v-animate="{ value: 'zoomInDown', delay: 1200 }">
          vue-fullpage5
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import 'vue-fullpage/vue-fullpage.css'
import VueFullpage from 'vue-fullpage'
Vue.use(VueFullpage)
export default {
  data() {
    return {
      isLock: true,
      opts: {
        start: 0,
        dir: 'h',
        duration: 500,
        beforeChange: this.beforeChange,
        afterChange: this.afterChange
      }
    }
  },
  methods: {
    beforeChange(prev, next) {
      console.log('before', prev, next)

      // 默认锁定
      if (next === 2 && this.isLock) return false
    },
    afterChange(prev, next) {
      console.log('after', prev, next)
    },
    lock() {
      this.isLock = true
    },
    unlock() {
      this.isLock = false
    }
  }
}
</script>

<style lang="scss" scoped>
.fullpage-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .page {
    width: 100%;
    height: 100%;
    background: chocolate;
  }
}
</style>
