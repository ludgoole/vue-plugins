<template>
  <div id="app" class="flex flex-column">
    <van-nav-bar
      v-if="$route.meta.title"
      :title="$route.meta.title"
      :left-text="$route.meta.leftText"
      :right-text="$route.meta.rightText"
      :left-arrow="$route.meta.leftArrow"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <keep-alive :include="keepAlive">
      <router-view class="router-view flex-1" />
    </keep-alive>
    <div class="navbar">
      <van-grid>
        <van-grid-item
          v-for="item in list"
          :key="item.icon"
          :icon="item.icon"
          :text="item.name"
          :class="{ active: item.name === currName }"
          @click="switchTo(item)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      keepAlive: ['Star'],
      list: [
        {
          name: '卜卦',
          path: '/question',
          icon: 'question-o'
        },
        {
          name: '查卦',
          path: '/query',
          icon: 'gift-o'
        },
        {
          name: '名卦',
          path: '/star',
          icon: 'medal-o'
        },
        {
          name: '我的',
          path: '/mine',
          icon: 'user-circle-o'
        }
      ],
      currName: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$route.meta.leftArrow && this.$router.go(-1)
      this.$bus.$emit('global.leftClick', this.$route.query)
      // this.$toast('返回')
    },
    onClickRight() {
      this.$route.meta.rightText && this.$bus.$emit('global.save')
      this.$bus.$emit('global.rightClick')
      // this.$toast('保存')
    },
    switchTo({ name, path }) {
      this.currName !== name && this.$router.push(path)
      this.currName = name
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  padding-top: 24px;
  // color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .router-view {
    margin-bottom: 90px;
    overflow-y: auto;
  }

  .navbar {
    position: absolute;
    bottom: 0;
    z-index: 999;
    width: 100%;

    .active {
      color: #409eff;
    }
  }

  .van-nav-bar__title {
    font-weight: bold;
    font-size: 20px;
  }

  .van-nav-bar__text {
    color: #333;
  }

  .van-nav-bar .van-icon {
    color: #333;
  }
}
</style>
