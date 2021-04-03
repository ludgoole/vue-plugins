<template>
  <div>
    <ul>
      <li class="item" v-for="n in max" :key="n">{{ n }}</li>
    </ul>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      max: 0
    }
  },
  methods: {
    onInfinite(data) {
      console.log('onInfinite', data)
      // this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      if (this.max < 100) {
        this.max += 20
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        // if (this.list.length / 20 === 10) {
        //     this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        // }
      } else {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  // height: 20px;
  line-height: 80px;
  text-align: center;
  background: chocolate;
  margin: 10px 0;
}
</style>
