<template>
  <div
    class="BaseDirective"
    v-click-outside="onClickOutside"
    v-contextmenu="contextmenus"
    v-touch
    @swipeLeft="swipeLeft"
    @longTap="longTap"
  >
    <p>{{ msg }}</p>
    <el-button type="primary" v-copy="msg">复制</el-button>
    <el-button
      type="primary"
      v-download-data="$data"
      v-download-data:type="'json'"
      >download</el-button
    >
    <el-button type="primary" v-debounce="debounce">防抖</el-button>
    <el-button type="primary" v-throttle="throttle">节流</el-button>

    <div v-ellipsis="{ placement: 'bottom', text, line: 1 }">
      {{ text }}
    </div>

    <div v-contextmenu="contextmenus">右键菜单</div>

    <el-input v-model="value" v-decimal="2" />

    <div v-permission:noDrop="noDrop" @click="click">
      我是被禁止的
    </div>
    <div v-permission:remove="remove">
      我是被移除指令，渲染后不可见
    </div>
    <p v-tips="tips">tips</p>

    <!-- <p v-title="title" title-max-width="100" title-placement="bottom">
      hover me!hover me!hover me!hover me!hover me!hover me!
    </p> -->

    <!-- <button
      v-tooltip="{
        content: 'Tooltip content here',
        placement: 'bottom'
      }"
    >
      A button
    </button> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { copy } from 'v-copy'
import { directive as clickOutside } from 'v-click-outside'
import { downloadData } from 'v-download'
import vDebounceThrottle from 'v-debounce-throttle'

import ellipsis from 'v-directive-ellipsis'
import 'v-directive-ellipsis/dist/ellipsis.css'

import vPickUpScroll from 'v-pick-up-scroll'
import 'v-pick-up-scroll/css/v-pick-up-scroll.css'

import vContextmenu from 'v-contextmenu-directive'
import vTouch from 'yg-v-touch'
import VDecimal from 'v-decimal'
import vPermission from 'v-permission'
import vTips from 'v-tips'
import title from 'v-title'
import { VTooltip as tooltip } from 'v-tooltip'

Vue.use(vContextmenu)

Vue.use(vDebounceThrottle)

Vue.use(vTouch)
Vue.use(VDecimal)
Vue.use(vPickUpScroll)
Vue.use(vPermission)
Vue.use(vTips)

export default {
  name: 'BaseDirective',
  directives: {
    copy,
    downloadData,
    clickOutside,
    ellipsis,
    title,
    tooltip
  },
  data() {
    return {
      noDrop: true,
      remove: true,
      value: 0,
      msg: 'BaseDirective',
      // tips: 'hello tips',
      title:
        'hello title hello title hello title hello title hello title hello title',
      tips: {
        message: 'hello tips',
        show: 'show'
      },
      // index_info__1Mzor index_tips__1Mzor
      // index_tips__2GSni
      text:
        '我是一段很长很长的文字，我是一段很长很长的文字，我是一段很长很长的文字'
    }
  },
  computed: {
    // tips() {
    //   return {
    //     message: this.message,
    //     show: this.message % 2 === 0
    //   }
    // }
  },
  methods: {
    onClickOutside(event) {
      console.log('Clicked outside Event: ', event)
      // this.$set(this.tips, 'show', true)
      this.tips = {
        message: 'hello tips',
        show: true
      }
      // this.tips.show = true
    },
    debounce(event) {
      console.log('debounce', event)
    },
    throttle(event) {
      console.log('throttle', event)
    },
    contextmenus() {
      return [
        {
          text: '剪切',
          subText: 'Ctrl + X',
          action: () => console.log('你点击了剪切')
        },
        {
          text: '复制',
          subText: 'Ctrl + C'
        },
        {
          text: '粘贴',
          subText: 'Ctrl + V'
        },
        { divider: true },
        {
          text: '删除',
          subText: 'Delete'
        }
      ]
    },
    swipeLeft(e) {
      console.log('swipeLeft', e)
    },
    longTap(e) {
      console.log('longTap', e)
    },
    click(e) {
      console.log('noDrop', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseDirective {
  color: #666;
  background: burlywood;
}
</style>
