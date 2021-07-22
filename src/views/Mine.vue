<template>
  <div class="Mine">
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.question"
      :label="getTime(item.timestamp)"
      :value="`${item.benGua.guaMing}之${item.bianGua.guaMing}`"
      @click="goAnswer(item)"
      is-link
    />
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment'
export default {
  name: 'Mine',
  components: {
    // ...components
  },
  data() {
    return {
      list: []
    }
  },
  async mounted() {
    this.list = (await localforage.getItem('MEI_HUA__mine')) || []
  },
  provide() {
    return {}
  },
  methods: {
    getTime(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    goAnswer(item) {
      const { question, shangGua, xiaGua, dongYao, timestamp, ganwu } = item
      this.$router.push({
        path: '/answer',
        query: {
          question,
          shangGuaCount: shangGua.order,
          xiaGuaCount: xiaGua.order,
          dongYaoCount: dongYao.order,
          timestamp,
          ganwu
        }
      })
    }
  }
}
</script>
