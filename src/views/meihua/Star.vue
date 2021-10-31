<template>
  <div class="Star">
    <van-tabs sticky offset-top="66" v-model="active" @change="change">
      <van-tab v-for="item in DIANJI" :key="item.name" :title="item.name">
        <van-cell
          class="text-justify"
          v-for="(item, index) in item.data"
          :key="index"
          :title="item.question"
          :label="item.describle"
          @click="goAnswer(item, index)"
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
      active: 1,
      DIANJI
    }
  },
  mounted() {
    this.$bus
      .$off('Answer.goBack')
      .$on('Answer.goBack', ({ index }) => index && this.scrollTo(index))
  },
  methods: {
    change() {
      this.scrollTo(0)
    },
    goAnswer(item, index) {
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
          index,
          dateTime,
          question,
          shangGuaCount,
          xiaGuaCount,
          dongYaoCount,
          jianyu
        }
      })
    },
    scrollTo(index) {
      const tabs = this.$el.querySelectorAll('.van-tab__pane')[this.active]
      setTimeout(() => {
        const el = tabs.querySelectorAll('.van-cell')[index]
        el.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }, 100)
    }
  }
}
</script>
