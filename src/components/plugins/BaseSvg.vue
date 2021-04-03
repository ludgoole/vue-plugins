<template>
  <div class="BaseSvg">
    <div id="container"></div>
    <div id="progress"></div>
    <div id="custom"></div>

    <!-- 自定义路径 -->
    <svg
      width="100%"
      height="200"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="path"
        d="M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z"
        fill="#ccc"
        stroke="red"
        stroke-width="3"
        stroke-linecap="round"
        transform="translate(130, 50) scale(1.5)"
      />

      <!-- <path
        id="path"
        stroke-dasharray="2,4"
        stroke-width="1"
        stroke="blue"
        d="M100 100 L300 100"
      /> -->
    </svg>
  </div>
</template>

<script>
import ProgressBar from 'progressbar.js'
export default {
  mounted() {
    console.log('ProgressBar', ProgressBar)
    this.drawLine()
    this.drawCircle()
    this.drawPath()
  },
  methods: {
    // Line Circle SemiCircle Square
    drawLine() {
      const line = new ProgressBar.Line('#container', {
        color: '#409EFF'
        // strokeLinecap: 'round'
        // strokeDasharray: '20, 4'
      })
      console.log('line', line)

      line.animate(1)
    },
    drawCircle() {
      const circle = new ProgressBar.Circle('#progress', {
        color: '#555',
        trailColor: '#eee',
        strokeWidth: 10,
        duration: 2500,
        easing: 'easeInOut',
        // fill: 'rgba(0, 0, 0, 0.5)',
        text: {
          // Default: null
          value: '100',

          // Default: 'progressbar-text'
          className: 'progressbar__label',

          // Default: object speficied below
          style: {
            // Default: same as stroke color (options.color)
            color: '#f00',
            position: 'absolute',
            left: '50%',
            top: '50%',
            padding: 0,
            margin: 0,
            fontSize: '2rem',
            // You can specify styles which will be browser prefixed
            transform: {
              prefix: true,
              value: 'translate(-50%, -50%)'
            }
          },

          // Only effective if the text.style is not null
          // By default position: relative is applied to container if text
          // is set. Setting this to false disables that feature.
          autoStyleContainer: true,

          // Default: true
          alignToBottom: true
        },

        from: { color: '#eee', width: 1 },
        to: { color: '#000', width: 10 },
        step: function(state, circle, attachment) {
          // console.log('step:state', state)
          // console.log('step:circle', circle)
          // console.log('step:attachment', attachment)
          const { color, width } = state
          const value = Math.round(circle.value() * 100)

          circle.setText(value + '%')
          circle.path.setAttribute('stroke', color)
          circle.path.setAttribute('stroke-width', width)
        }
      })

      // 初始化进度
      circle.set(0.05)

      setTimeout(function() {
        circle.animate(0.3)
      }, 1000)

      setTimeout(function() {
        circle.animate(0.4)
      }, 3500)

      setTimeout(function() {
        circle.animate(0.8)
      }, 5500)

      setTimeout(function() {
        circle.animate(1)
      }, 8000)
    },
    drawPath() {
      const custom = new ProgressBar.Path('#path')
      custom.animate(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseSvg {
  & > div {
    margin-top: 40px;
  }
}
</style>
