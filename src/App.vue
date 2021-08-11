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
    <router-view class="router-view flex-1" />
    <div class="navbar">
      <van-grid :column-num="2">
        <van-grid-item
          v-for="item in list"
          :key="item.icon"
          :icon="item.icon"
          :text="item.name"
          :to="item.path"
          :class="{ active: item.name === currName }"
          @click="currName = item.name"
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
      list: [
        {
          name: '首页',
          path: '/home',
          icon: 'question-o'
        },
        {
          name: '关于',
          path: '/about',
          icon: 'gift-o'
        }
      ],
      currName: '首页'
    }
  },
  methods: {
    onClickLeft() {
      this.$route.meta.leftText && this.$router.go(-1)
    },
    onClickRight() {
      this.$route.meta.rightText && this.$bus.$emit('global.save')
    }
  }
}
</script>

<style lang="scss">
#app {
  box-sizing: border-box;
  height: 100%;
  // 顶部电池条高度
  padding-top: 29px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .router-view {
    overflow-y: auto;
  }

  .van-grid-item {
    &.active {
      color: $color-primary;

      .van-grid-item__text {
        color: $color-primary;
      }
    }
  }
}
</style>
