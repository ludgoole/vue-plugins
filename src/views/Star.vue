<template>
  <div class="Star">
    <van-cell
      class="text-justify"
      v-for="(item, index) in MINGGUA"
      :key="index"
      :title="item.question"
      :label="item.describle"
      @click="goAnswer(item)"
      is-link
    />
  </div>
</template>

<script>
// @ is an alias to /src
import MINGGUA from '@/mock/minggua'
export default {
  name: 'Star',
  data() {
    return {
      MINGGUA
    }
  },
  methods: {
    goAnswer(item) {
      const {
        question,
        shangGuaCount,
        xiaGuaCount,
        dongYaoCount,
        jianyu
      } = item
      this.$router.push({
        path: '/answer',
        query: {
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
