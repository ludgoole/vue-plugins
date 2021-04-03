<template>
  <div class="BasePullTo">
    <pull-to
      :bottomConfig="bottomConfig"
      :top-load-method="refresh"
      :bottom-load-method="loadMore"
      @bottom-pull="bottomPull"
      @bottom-state-change="bottomStateChange"
    >
      <ul class="list">
        <li class="item" v-for="item in dataList" :key="item">
          <template v-if="item % 4 === 0">
            <ul class="flex flex-justify">
              <li v-for="n in item" :key="n">{{ item }}_{{ n }}</li>
            </ul>
          </template>
          <template v-else>
            {{ item }}
          </template>
        </li>
      </ul>
      <template #bottom-block="{stateText, state}">
        <p class="default-text">
          {{ noMore ? '没有更多了' : stateText }} - {{ state }}
        </p>
      </template>
    </pull-to>
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'

export default {
  name: 'example',
  components: {
    PullTo
  },
  data() {
    return {
      bottomConfig: {
        pullText: '上拉加载',
        triggerText: '释放更新',
        loadingText: '加载中...',
        doneText: '加载完成',
        failText: '加载失败',
        // 加载成功停留时间
        loadedStayTime: 400,
        // 加载成功停留距离
        stayDistance: 50,
        // 触发加载更多上拉距离
        triggerDistance: 70
      },
      dataList: [],
      page: 1,
      maxPage: 3,
      noMore: false
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    fetchDataList(max) {
      return new Promise(resolve => {
        const list = Array(max)
          .fill(1)
          .map((v, i) => i + 1)

        setTimeout(() => {
          resolve({ list })
        }, 1000)
      })
    },
    refresh(loaded) {
      this.fetchDataList(10).then(data => {
        this.dataList = data.list
        loaded && loaded('done')
      })
    },
    loadMore(loaded) {
      if (this.page > this.maxPage) {
        loaded('done')
        this.noMore = true
        return
      }
      this.page++
      this.fetchDataList(this.page * 10).then(data => {
        this.dataList = data.list
        loaded('done')
      })
    },
    bottomPull(pos) {
      console.log('bottomPull', pos)
    },
    bottomStateChange(state) {
      // pull trigger loading loaded-done
      console.log('bottomStateChange', state)
    }
  }
}
</script>

<style lang="scss" scoped>
.BasePullTo {
  height: 400px;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  .item {
    height: 40px;
    line-height: 40px;
    background: rgba(0, 0, 0, 0.03);
    & + li {
      margin-top: 20px;
    }
    ul {
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
    }
    li {
      // width: 100px;
      // flex-basis: 100px;
      flex: 0 0 100px;
      margin: 0 20px;
      background: burlywood;
    }
  }
}
</style>
