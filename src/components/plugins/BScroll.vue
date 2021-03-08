<template>
  <div class="BScroll" ref="BScroll">
    <div class="content">
      <div class="pull-down" v-show="!isLoading">
        {{ pullDownMsg }}
      </div>
      <p v-show="isLoading">加载中...</p>
      <ul>
        <li v-for="(item, index) in list" :key="index">{{ item }}</li>
      </ul>
      <div class="pull-up" v-show="!isLoading">
        {{ pullUpMsg }}
      </div>
      <p v-show="isLoading">加载中...</p>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'BScroll',
  data() {
    return {
      bs: null,
      options: {
        // 允许派发滚动事件
        probeType: 1,
        // 允许原生点击事件
        click: true
      },
      threshold: 50,
      pullDownMsg: '下拉刷新',
      pullUpMsg: '上拉加载',
      list: Array.from({ length: 10 }, (v, i) => i),
      total: 20,
      isLoading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    fetchData() {
      return new Promise(resolve => {
        const list = Array.from({ length: 10 }, (v, i) => i + 1)
        setTimeout(() => resolve(list), 1000)
      })
    },
    init() {
      this.bs = new BScroll(this.$refs.BScroll, this.options)

      this.bs.on('scroll', pos => {
        if (pos.y > this.threshold) {
          this.pullDownMsg = '释放开始刷新'
        } else if (pos.y > 0) {
          this.pullDownMsg = '下拉刷新'
        } else if (pos.y < this.bs.maxScrollY - this.threshold) {
          this.pullUpMsg = '释放加载更多'
        } else if (pos.y < this.bs.maxScrollY) {
          this.pullUpMsg = '上拉加载'
        }
        console.log('scroll', pos.y, this.pullDownMsg)
      })

      this.bs.on('touchEnd', async pos => {
        if (this.list.length >= this.total) {
          this.pullUpMsg = '我是有底线的'
          return
        }

        if (pos.y > this.threshold) {
          this.isLoading = true
          console.log('pullingDown', pos)
          const list = await this.fetchData()
          this.isLoading = false
          this.list = list
          this.$nextTick(() => this.bs.refresh())
        } else if (pos.y < this.bs.maxScrollY - this.threshold) {
          this.isLoading = true
          console.log('pullingUp', pos)
          const list = await this.fetchData()
          this.isLoading = false
          this.list.push(...list)
          this.$nextTick(() => this.bs.refresh())
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.BScroll {
  height: 500px;
  overflow: hidden;
  .pull-down {
    line-height: 40px;
    transform: translateY(-100%);
  }
  .pull-up {
    line-height: 40px;
    transform: translateY(100%);
  }
  li {
    line-height: 60px;
  }
}
</style>
