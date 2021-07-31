<template>
  <div class="Mine">
    <van-swipe-cell v-for="(item, index) in list" :key="index">
      <van-cell
        :title="item.question"
        :label="getTime(item.timestamp)"
        :value="item.zhigua"
        @click="goAnswer(item)"
        is-link
      />
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="toDelete(item)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment'
// import { download } from '@/util'
import localforage from 'localforage'
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
      localforage.clear().then(mine => {
        this.$toast('清除成功')

        localforage.getItem('MEI_HUA__mine').then(mine => {
          this.list = mine || []
          // this.$toast('下载成功')
        })
      })
    },
    toDelete(item) {
      localforage.getItem('MEI_HUA__mine').then(mine => {
        const index = mine.findIndex(v => v.timestamp === item.timestamp)
        this.list.splice(index, 1)
        localforage.setItem('MEI_HUA__mine', this.list)
      })
    }
  }
}
</script>
<style lang="scss">
.Mine {
  .delete-button {
    height: 100%;
  }
}
</style>
