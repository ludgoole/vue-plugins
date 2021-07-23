<template>
  <div class="Mine">
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.question"
      :label="getTime(item.timestamp)"
      :value="item.zhigua"
      @click="goAnswer(item)"
      is-link
    />
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment'
import { download } from '@/util'
export default {
  name: 'Mine',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.$bus.$off('global.rightClick').$on('global.rightClick', this.save)
  },
  async mounted() {
    this.list = (await localforage.getItem('MEI_HUA__mine')) || []
  },
  methods: {
    getTime(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    goAnswer(item) {
      const {
        question,
        shangGuaCount,
        xiaGuaCount,
        dongYaoCount,
        timestamp,
        ganwu
      } = item
      this.$router.push({
        path: '/answer',
        query: {
          question,
          shangGuaCount,
          xiaGuaCount,
          dongYaoCount,
          timestamp,
          ganwu
        }
      })
    },
    save() {
      localforage.getItem('MEI_HUA__mine').then(mine => {
        download(mine, '我的卦例')
        // this.$toast('下载成功')
      })
    }
  }
}
</script>
