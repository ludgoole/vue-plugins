import AnyTouch from 'any-touch'
export default {
  data() {
    return {
      start: false,
      displacementX: 0,
      displacementY: 0
    }
  },
  computed: {
    canvas() {
      return this.$el.querySelector('.rel-map-canvas')
    }
  },
  mounted() {
    const touch = new AnyTouch(this.$el, {
      // 不阻止默认事件
      preventDefault(e) {
        return false
      }
    })

    this.$on('hook:destroyed', () => {
      touch.destroy()
    })
  },
  methods: {
    onPan(data) {
      const { displacementX, displacementY } = data
      const el = this.canvas
      // console.log('[ data ] >', data)

      // panstart 记录起始位置
      if (!this.start) {
        this.displacementX = parseFloat(el.style.marginLeft)
        this.displacementY = parseFloat(el.style.marginTop)
        this.start = true
      }

      // panmove 移动位置
      el.style.marginLeft = this.displacementX + displacementX + 'px'
      el.style.marginTop = this.displacementY + displacementY + 'px'

      // panend 恢复状态
      if (data.phase === 'end') {
        this.start = false
      }
    }
  }
}
