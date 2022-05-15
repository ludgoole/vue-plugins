<template>
  <div class="Pile">
    <van-nav-bar
      :title="chapter.chapter"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <section class="px-5 relative">
      <img ref="img" :src="chapter.image" />
      <canvas ref="canvas" id="canvas"></canvas>

      <van-grid class="mt-5" square :column-num="5">
        <van-grid-item
          v-for="pile in chapter.piles"
          :key="pile.name"
          :text="pile.name"
          :class="{ active: curPile.id === pile.id }"
          @click="clickHandler(pile)"
        />
      </van-grid>
    </section>
  </div>
</template>

<script>
import { fabric } from 'fabric'
export default {
  name: 'Pile',
  computed: {
    chapter() {
      return JSON.parse(this.$route.query.chapter)
    },
  },
  data() {
    return {
      curPile: {},
      points: [],
    }
  },
  created() {
    this.curPile = this.chapter.piles[0]
  },
  mounted() {
    this.resetCanvasSize()
    this.initCanvans()
  },
  methods: {
    resetCanvasSize() {
      this.$refs.canvas.width = this.$refs.img.width
      this.$refs.canvas.height = this.$refs.img.height
    },
    initCanvans() {
      const canvas = new fabric.Canvas('canvas')
      const polyline = this.createPolygon()
      const circle = this.createCircle()
      const animate = () => {
        window.abort = fabric.util.animate({
          startValue: 5,
          endValue: 15,
          duration: 2000,
          onChange: (value) => {
            circle.set('radius', value)
            canvas.renderAll()
          },
          onComplete: animate,
        })
      }

      this.circle = circle
      animate()
      canvas.add(polyline, circle)

      canvas.on('mouse:down', (options) => {
        this.points.push({ x: options.pointer.x | 0, y: options.pointer.y | 0 })
        console.log(this.points)
      })
      circle.on('mousedown', () => {
        console.log(111, polyline)
        polyline.set({ strokeWidth: polyline.strokeWidth === 0 ? 3 : 0 })
      })
    },
    createPolygon() {
      // [
      //   { x: 30, y: 30 },
      //   { x: 150, y: 140 },
      //   { x: 240, y: 150 },
      //   { x: 100, y: 30 },
      // ],
      const points = this.chapter.piles.map((pile) => pile.point)
      const polyline = new fabric.Polyline(points, {
        fill: 'transparent', // 如果画折线，需要填充透明
        stroke: '#c2350f', // 线段颜色：紫色
        strokeWidth: 3, // 线段粗细 5
      })
      // 取消边框
      // polyline.hasBorders = false
      // 取消控制角
      // polyline.hasControls = false
      // 元素禁止选中
      polyline.selectable = false

      return polyline
    },
    createCircle() {
      const circle = new fabric.Circle({
        left: this.chapter.piles[0].point.x,
        top: this.chapter.piles[0].point.y,
        originX: 'center',
        originY: 'center',
        radius: 10, // 圆的半径 50
        fill: 'rgba(0, 255, 0, 0.8)',
        transparent: 0.5,
      })

      // 取消边框
      circle.hasBorders = false
      // 取消控制角
      circle.hasControls = false

      return circle
    },
    clickHandler(pile) {
      if (this.curPile === pile) {
        this.goKnowledge(pile)
      } else {
        this.curPile = pile

        this.circle.set({
          left: pile.point.x,
          top: pile.point.y,
        })
      }
    },
    goKnowledge(pile) {
      this.$router.push({
        path: '/memory/knowledge',
        name: 'Knowledge',
        query: {
          pile: JSON.stringify(pile),
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.Pile {
  /deep/ .canvas-container {
    position: absolute !important;
    top: 0;
  }

  /deep/ .van-grid-item {
    background: sandybrown;

    .van-grid-item__text {
      font-size: 16px;
    }

    &.active {
      .van-grid-item__text {
        color: #fff;
      }

      .van-grid-item__content {
        background: rgba(0, 255, 0, 0.4);
      }
    }
  }
}
</style>
