<template>
  <div class="the-scroll flex flex-center">
    <ul ref="list">
      <li v-for="n in 10" :key="n" @click="scrollTo">{{n}}</li>
    </ul>
    <ul v-scroll="onVueScroll">
      <li v-for="n in 10" :key="n" @click="scrollTo">{{n}}</li>
    </ul>
    <ul ref="scrollbar">
      <li v-for="n in 10" :key="n" @click="scrollTo">{{n}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      container: null,
      scrollbar: null
    }
  },
  methods: {
    scrollTo (e) {
      const container = this.container
      const el = e.target

      if (container.scrollTop < container.scrollHeight - container.offsetHeight) {
        container.scrollTo(0, el.offsetTop - container.offsetTop)
      } else {
        console.log('我是有底线的~~')
      }
    },
    onScroll () {
      const container = this.container
      if (container.scrollTop <= 0) {
        console.log('别拉了，到顶了--')
      } else if (container.scrollTop >= container.scrollHeight - container.offsetHeight) {
        console.log('别拉了，到底了--')
      } else {
        console.log('我要开始滚啦--')
      }
    },
    onVueScroll (e, position) {
      console.log('position >>>', position)
    },
    onScrollbarScroll ({ limit, offset }) {
      if (offset.y === 0) {
        console.log('到顶了~~')
      } else if (offset.y === limit.y) {
        console.log('到底了~~')
      }
    }
  },
  mounted () {
    this.container = this.$refs.list
    this.container.addEventListener('scroll', this.onScroll)

    this.$once('hook:beforeDestory', () => {
      this.container.removeEventListener('scroll', this.onScroll)
    })

    // 初始化滚动条
    this.scrollbar = this.$Scrollbar.init(this.$refs.scrollbar, {
      alwaysShowTracks: true
    })

    // 滚动到指定位置
    this.scrollbar.scrollTo(0, 50, 600)

    // 事件监听
    this.scrollbar.addListener(this.onScrollbarScroll)

    this.$once('hook:beforeDestroy', () => {
      this.scrollbar.removeListener(this.onScrollbarScroll)
    })
  }
}
</script>

<style lang="scss" scoped>
.the-scroll {
  ul {
    width: 200px;
    height: 200px;
    overflow-y: scroll;
    li {
      line-height: 30px;
      &:nth-child(2n + 1) {
        background: lightblue;
      }
      &:nth-child(2n) {
        background: lightcoral;
      }
    }
  }
}
</style>
