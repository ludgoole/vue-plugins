<template>
  <div class="Drawing w-full h-full">
    <van-nav-bar :title="qzw.cn" left-arrow @click-left="$router.go(-1)" />
    <van-search
      v-model="search"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <div class="Drawing-option flex justify-between align-middle mt-3 mx-6">
      <van-radio-group v-model="font" direction="horizontal">
        <van-radio name="jgw">甲骨文</van-radio>
        <van-radio name="jwdz">金文</van-radio>
        <van-radio name="zszd">篆书</van-radio>
        <van-radio name="gfls">隶书</van-radio>
      </van-radio-group>
      <span @click="canvasClear()">清空</span>
    </div>
    <div
      class="Drawing-container relative w-320px h-320px mt-3 mx-auto"
      :style="{
        background:
          font === 'jgw'
            ? `url(${require(`@/assets/font/jgw/${index}.png`)}) no-repeat center/cover`
            : 'transparent'
      }"
    >
      <p
        v-show="font !== 'jgw'"
        class="Drawing-font text-center text-280px"
        :style="{ 'font-family': font }"
      >
        {{ qzw.cn }}
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
    <!-- <div
      class="Drawing-option w-320px mt-5 mx-auto flex justify-between items-center"
    >
      <input type="color" v-model="options.writeColor" />
      <van-field class="!w-20" v-model="index" type="digit" maxlength="4" />
      <span @click="canvasClear()">清空</span>
    </div> -->
    <div class="Drawing-detail mt-3 mx-6 text-justify">
      <p class="Drawing-ls -ml-2">
        <van-tag
          class="ml-2"
          v-for="ls in qzw.ls.split(' ')"
          :key="ls"
          type="warning"
          @click="showXD = !showXD"
          >{{ ls || '形声' }}</van-tag
        >
        <van-tag class="ml-2" type="danger">{{
          qzw.bs || `${qzw.cn}部`
        }}</van-tag>
        <van-tag class="ml-2" plain>{{ index }}</van-tag>
      </p>
      <p class="Drawing-sw text-warm-gray-400 text-xs">{{ qzw.sm }}</p>
      <p
        class="Drawing-sw text-warm-gray-600 text-sm my-1 leading-tight"
        @click="toggleSW = !toggleSW"
      >
        {{ toggleSW ? qzw.swy : qzw.sw }}
      </p>
      <p v-show="showXD" class="Drawing-sw text-warm-gray-500 text-xs">
        {{ qzw.xd }}
      </p>
      <!-- <ul v-show="showXD" class="Drawing-sw text-warm-gray-500 text-xs mt-2">
        <li v-for="xd in qzw.xd.split('\n')" :key="xd">{{ xd }}</li>
      </ul> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SignCanvas from 'sign-canvas'
import QIAN_ZI_WEN from '@/mock/qianziwen/word'

export default defineComponent({
  components: {
    SignCanvas
  },
  data() {
    const { word } = this.$route.query
    const index = QIAN_ZI_WEN.findIndex(v => v.cn === word) + 1
    return {
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
      search: word,
      font: 'jwdz',
      toggleSW: false,
      showXD: false
    }
  },
  computed: {
    qzw() {
      return QIAN_ZI_WEN[this.index - 1] || QIAN_ZI_WEN[0]
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
      this.search = this.qzw.cn
    }
  },
  methods: {
    onSearch(search) {
      const index = isNaN(search)
        ? QIAN_ZI_WEN.findIndex(v => v.cn === search)
        : search - 1

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
    // color: gainsboro;
    line-height: 1.3;
    filter: blur(1.5px);
  }

  &-option {
    .van-field__control {
      text-align: center;
    }
  }

  .van-radio--horizontal {
    margin-right: 6px;
  }

  .van-radio__label {
    margin-left: 2px;
  }

  .van-radio__icon--checked .van-icon {
    color: #fff;
    background-color: #ff787f;
    border-color: #ff787f;
  }
}
</style>
