<template>
  <div class="Star">
    <van-tabs v-model="active">
      <van-tab v-for="item in DIANJI" :key="item.name" :title="item.name">
        <van-cell
          class="text-justify"
          v-for="(item, index) in item.data"
          :key="index"
          :title="item.question"
          :label="item.describle"
          @click="goAnswer(item)"
          is-link
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import DIANJI from '@/mock/dianji'
export default {
  name: 'Star',
  data() {
    return {
      active: 0,
      DIANJI
    }
  },
  methods: {
    goAnswer(item) {
      const {
        dateTime,
        question,
        shangGuaCount,
        xiaGuaCount,
        dongYaoCount,
        jianyu
      } = item
      this.$router.push({
        path: '/answer',
        query: {
          dateTime,
          question,
          shangGuaCount,
          xiaGuaCount,
          dongYaoCount,
          jianyu
        }
      })
    }
  }
}
</script>
