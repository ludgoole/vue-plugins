<template>
  <div class="Hammer">
    <div class="box" ref="box"></div>
  </div>
</template>

<script>
import Hammer from 'hammerjs'
export default {
  data() {
    return {
      hammer: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 默认事件
      // tap doubletap press
      // pan panleft panright panup pandown panend
      // swipe swipeleft swiperight

      // 手动添加
      // swipeup swipedown
      // panup pandown

      // 特殊事件，避免卡死
      // pinch rotate

      this.hammer = new Hammer(this.$refs.box)

      // 需识别事件
      this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL })
      this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL })

      // 需特殊处理事件
      this.hammer.get('pinch').set({ enable: true })
      this.hammer.get('rotate').set({ enable: true })

      //   this.hammer.on(
      //     `tap doubletap press
      //      pan panleft panright panup pandown panend
      //      swipe swipeleft swiperight swipeup swipedown
      //      pinch pinchend
      //     `,
      //     evt => {
      //       console.log(evt.type, evt)
      //     }
      //   )
      // }
      this.hammer.on('pan', evt => {
        // deltaTime
        // deltaX deltaY distance
        // angle
        console.log(evt.type, evt)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Hammer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  border: 1px solid #ccc;
  .box {
    width: 200px;
    height: 200px;
    background: brown;
  }
}
</style>
