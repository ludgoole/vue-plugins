<template>
  <div class="GuaXiang flex flex-column">
    <van-nav-bar
      :title="gua.guaMing"
      :right-text="gua.baGong"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="GuaXiang-container flex-1">
      <div class="GuaXiang-daXiang">{{ gua.daXiang }}</div>
      <div class="GuaXiang-guaXiang">
        <BaseGua
          :gua-xiang="gua.guaXiang"
          :size="200"
          @change="change"
        ></BaseGua>
      </div>
      <div class="GuaXiang-guaCi">{{ gua.guaCi }}</div>
      <div class="GuaXiang-yaoCi">
        <ul>
          <li v-for="(item, index) in gua.yaoCi" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ZHOUYI from '@/mock/zhouyi'
import BaseGua from '@/components/BaseGua.vue'
export default {
  name: 'GuaXiang',
  components: {
    BaseGua
  },
  data() {
    return {
      ZHOUYI,
      gua: {}
    }
  },
  mounted() {
    const search = this.$route.query.search
    this.gua =
      ZHOUYI.find(gua => {
        if (Number.isNaN(+search)) {
          if (search.length === 4) {
            return gua.baGong === search
          } else {
            return gua.guaMing === search
          }
        } else {
          if (search > 64) {
            return gua.guaXiang.join('') === search
          } else {
            return gua.guaXu === +search
          }
        }
      }) || ZHOUYI[0]
  },
  methods: {
    change(guaXiang) {
      this.gua = ZHOUYI.find(gua => gua.guaXiang.join('') === guaXiang)
    }
  }
}
</script>

<style lang="scss" scoped>
.GuaXiang {
  &-container {
    padding: 0 20px;
    overflow-y: auto;

    & > div {
      margin-top: 20px;
      line-height: 1.5;
    }
  }

  &-guaXiang {
    text-align: center;
  }

  &-guaCi {
    font-weight: bold;
  }

  &-yaoCi {
    font-size: 14px;
  }
}
</style>
