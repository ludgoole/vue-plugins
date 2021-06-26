<template>
  <div class="BaseDrive">
    <h3 ref="title" id="title">引导页</h3>
    <p>内容区域</p>
    <el-button type="primary" ref="click" id="click">单击</el-button>
    <el-button type="primary" id="dblclick">双击</el-button>
  </div>
</template>

<script>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
export default {
  name: 'BaseDrive',
  data() {
    return {
      driver: null
    }
  },
  computed: {
    steps() {
      return [
        {
          element: '#title',
          popover: {
            className: 'first-step-popover-class',
            title: 'Title on Popover',
            description: 'Body of the popover',
            position: 'bottom'
          }
        },
        {
          element: '#click',
          popover: {
            title: 'Title on Popover',
            description: 'Body of the popover',
            position: 'top'
          }
        },
        {
          element: '#dblclick',
          popover: {
            title: 'Title on Popover',
            description: 'Body of the popover',
            position: 'right'
          }
        }
      ]
    }
  },
  created() {
    this.init()
  },
  mounted() {
    // this.driver.highlight('#title')
    // this.driver.highlight({
    //   element: '#click',
    //   popover: {
    //     title: 'Title for the Popover',
    //     description: 'Description for it',
    //     // position can be left, left-center, left-bottom, top,
    //     // top-center, top-right, right, right-center, right-bottom,
    //     // bottom, bottom-center, bottom-right, mid-center
    //     position: 'left'
    //   }
    // })
    this.driver.defineSteps(this.steps)

    this.$nextTick(() => {
      // 默认 0
      this.driver.start(1)
    })
  },
  methods: {
    init() {
      this.driver = new Driver({
        className: 'base-drive-popover',
        animate: true,
        // 遮罩层透明度
        opacity: 0.75,
        // 指定元素element的白色边框
        padding: 10,
        doneBtnText: 'Done',
        // 关闭按钮
        closeBtnText: 'Close',
        nextBtnText: 'Next →',
        prevBtnText: 'Previous',
        // 是否显示关闭按钮
        showButtons: true,
        keyboardControl: true,
        scrollIntoViewOptions: {},
        onHighlightStarted: Element => {
          console.log('onHighlightStarted', Element)
        },
        onHighlighted: Element => {
          console.log('onHighlighted', Element)
        },
        onDeselected: Element => {
          console.log('onDeselected', Element)
        },
        onReset: Element => {
          console.log('onReset', Element)
        },
        onNext: Element => {
          console.log('onNext', Element)
        },
        onPrevious: Element => {
          console.log('onPrevious', Element)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseDrive {
}
</style>

// 挂载在body下面，无需scoped
<style lang="scss">
.base-drive-popover {
  max-width: initial !important;
}
</style>
