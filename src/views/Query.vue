<template>
  <div class="Query">
    <van-search
      v-model="value"
      placeholder="111111 | 乾 | 1 | 乾宫一世"
      @search="onSearch"
    />
    <van-grid :column-num="4">
      <van-grid-item
        v-for="gua in ZHOUYI"
        :key="gua.order"
        @click="onSearch(gua.guaMing)"
      >
        <div class="text-center">
          <BaseGua :gua-xiang="gua.guaXiang" :size="55"></BaseGua>
          <p class="Query-guaming">{{ gua.guaMing }}</p>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
// @ is an alias to /src
import ZHOUYI from '@/mock/zhouyi'
import BaseGua from '@/components/BaseGua.vue'
export default {
  name: 'Query',
  components: {
    BaseGua
  },
  data() {
    return {
      value: '',
      ZHOUYI
    }
  },
  provide() {
    return {}
  },
  methods: {
    onSearch(search) {
      this.$router.push({
        path: '/guaXiang',
        query: {
          search
        }
      })
    }
  }
}
</script>
<style lang="scss" scope>
.Query {
  &-guaming {
    margin-top: 10px;
  }
}
</style>
