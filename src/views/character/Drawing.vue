<template>
  <div class="Drawing w-full h-full">
    <van-nav-bar :title="qzw.cn" left-arrow @click-left="$router.go(-1)" />
    <div
      class="Drawing-container relative w-320px h-320px mt-5 mx-auto"
      :style="{
        background: `url(${qzw.jw}) no-repeat center/cover`
      }"
    >
      <sign-canvas class="absolute top-0" ref="SignCanvas" :options="options" />
      <van-icon
        :class="[
          index <= 0 ? 'opacity-50' : 'opacity-100',
          { 'pointer-events-none': index <= 0 }
        ]"
        class="absolute -left-8 top-35"
        size="40"
        name="arrow-left"
        @click="index--"
      />
      <van-icon
        :class="[
          index >= 999 ? 'opacity-50' : 'opacity-100',
          { 'pointer-events-none': index >= 999 }
        ]"
        class="absolute left-68 top-35"
        size="40"
        name="arrow"
        @click="index++"
      />
    </div>
    <div class="w-320px mt-5 mx-auto flex justify-between">
      <input type="color" v-model="options.writeColor" />
      <span @click="canvasClear()">清空</span>
    </div>
    {{ index }}
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed
} from '@vue/composition-api'
import SignCanvas from 'sign-canvas'
import QIAN_ZI_WEN from '@/mock/qianziwen/word'

export default defineComponent({
  components: {
    SignCanvas
  },
  setup(props, { root }) {
    const { word } = root.$route.query
    const index = ref(QIAN_ZI_WEN.findIndex(v => v.cn === word))
    const qzw = computed(() => QIAN_ZI_WEN[index.value])
    const state = reactive({
      options: {
        canvasWidth: 320, // canvas宽高 [Number] 可选
        canvasHeight: 320, // 高度  [Number] 可选
        isShowBorder: true, // 是否显示边框 [可选]
        bgColor: 'transparent', // 背景色 [String] 可选
        borderWidth: 1, // 网格线宽度  [Number] 可选
        borderColor: '#ff787f', // 网格颜色  [String] 可选
        writeWidth: 5, // 基础轨迹宽度  [Number] 可选
        writeColor: '#ff787f', // 轨迹颜色  [String] 可选
        isSign: false, // 签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
        imgType: 'png' // 下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
      }
    })

    return {
      ...toRefs(state),
      index,
      qzw
    }
  },
  methods: {
    canvasClear() {
      this.$refs.SignCanvas.canvasClear()
    }
  }
})
</script>
