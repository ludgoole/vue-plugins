<template>
  <div class="Drawing w-full h-full">
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <van-search
      v-model="search"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <van-radio-group v-model="font" direction="horizontal" class="mt-3 ml-6">
      <van-radio name="jwdz">金文</van-radio>
      <van-radio name="zszd">篆书</van-radio>
      <van-radio name="gfls">隶书</van-radio>
    </van-radio-group>
    <div class="Drawing-container relative w-320px h-320px mt-3 mx-auto">
      <p
        class="Drawing-font text-center text-280px"
        :style="{ 'font-family': font }"
      >
        {{ title }}
      </p>
      <sign-canvas
        class="!absolute top-0"
        ref="SignCanvas"
        :options="options"
      />
      <van-icon
        :class="[
          index <= 1 ? 'opacity-50' : 'opacity-100',
          { 'pointer-events-none': index <= 1 }
        ]"
        class="!absolute -left-3 top-35"
        size="40"
        name="arrow-left"
        @click="index--"
      />
      <van-icon
        :class="[
          index > 999 ? 'opacity-50' : 'opacity-100',
          { 'pointer-events-none': index > 999 }
        ]"
        class="!absolute left-73 top-35"
        size="40"
        name="arrow"
        @click="index++"
      />
    </div>
    <div
      class="Drawing-option w-320px mt-5 mx-auto flex justify-between items-center"
    >
      <input type="color" v-model="options.writeColor" />
      <van-field class="!w-20" v-model="index" type="digit" maxlength="4" />
      <span @click="canvasClear()">清空</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import SignCanvas from 'sign-canvas'
import QIAN_ZI_WEN from '@/mock/qianziwen/word'

export default defineComponent({
  components: {
    SignCanvas
  },
  setup(props, { root }) {
    const { word } = root.$route.query
    const index = QIAN_ZI_WEN.findIndex(v => v.cn === word) + 1
    const search = word
    const font = 'jwdz'
    const state = reactive({
      options: {
        canvasWidth: 320, // canvas宽高 [Number] 可选
        canvasHeight: 320, // 高度  [Number] 可选
        isShowBorder: true, // 是否显示边框 [可选]
        bgColor: 'transparent', // 背景色 [String] 可选
        borderWidth: 1, // 网格线宽度  [Number] 可选
        borderColor: 'rgba(255,0,0,0.1)', // 网格颜色  [String] 可选
        writeWidth: 5, // 基础轨迹宽度  [Number] 可选
        writeColor: '#ff787f', // 轨迹颜色  [String] 可选
        isSign: false // 签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
      },
      index,
      search,
      font
    })

    return {
      ...toRefs(state)
    }
  },
  computed: {
    title() {
      const qzw = QIAN_ZI_WEN[this.index - 1] || QIAN_ZI_WEN[0]
      return qzw.cn
    }
  },
  watch: {
    index(val) {
      console.log(val)

      if (val > 1000) {
        this.index = 1000
      } else if (val === '') {
        this.index = 1
      }
      this.canvasClear()
      this.search = this.title
    }
  },
  methods: {
    onSearch(search) {
      const index = QIAN_ZI_WEN.findIndex(v => v.cn === search)

      if (index > -1) {
        this.index = index + 1
      } else {
        this.$toast({ msg: '千字文里面没有这个字~' })
      }
    },
    canvasClear() {
      this.$refs.SignCanvas.canvasClear()
    }
  }
})
</script>
<style lang="scss">
.Drawing {
  &-container {
    canvas {
      width: 20rem !important;
      height: 20rem !important;
    }

    .van-icon {
      position: absolute;
    }
  }

  &-font {
    color: gainsboro;
    line-height: 1.3;
  }

  &-option {
    .van-field__control {
      text-align: center;
    }
  }

  .van-radio__icon--font .van-icon {
    color: #fff;
    background-color: #ff787f;
    border-color: #ff787f;
  }
}
</style>
