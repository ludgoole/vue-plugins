<template>
  <div class="Pile">
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <section class="px-5 relative">
      <img v-show="isShow" ref="img" :src="image" />
      <canvas ref="canvas" id="canvas"></canvas>
    </section>
  </div>
</template>

<script>
import { fabric } from 'fabric'
export default {
  name: 'Image',
  data() {
    return {
      isShow: true,
    }
  },
  computed: {
    paint() {
      return JSON.parse(this.$route.query.paint || '{}')
    },
    title() {
      return this.paint.name || '油画'
    },
    image() {
      return this.paint.image || 'https://img0.baidu.com/it/u=1519050398,2562977859&fm=253&fmt=auto&app=138&f=JPEG?w=879&h=500'
    }
  },
  mounted() {
    this.resetCanvasSize()
    this.initCanvans()
    this.isShow = false
  },
  methods: {
    resetCanvasSize() {
      this.$refs.canvas.width = this.$refs.img.width
      this.$refs.canvas.height = this.$refs.img.height
    },
    initCanvans() {
      const canvas = new fabric.Canvas('canvas', {
        isDrawingMode: false, // 开启绘图模式
      })
      
      const circle = this.createCircle()
      this.setPen(canvas)
      this.setBgImage(canvas).then((scale) => {
        const image = this.createImage(canvas, scale)
        canvas.add(image, circle)

        circle.on('moving', ({ e, transform, pointer }) => {
          //  only because they are absolutePositioned
          // console.log(circle.getCenterPoint(), this.scale);
          // image.clipPath.setPositionByOrigin(
          //   circle.getCenterPoint(),
          //   'center',
          //   'center'
          // )
          image.clipPath.left = circle.getCenterPoint().x * this.scale - canvas.width * scale / 2
          image.clipPath.top = circle.getCenterPoint().y * this.scale - canvas.height * scale / 2 
          image.left = - circle.getCenterPoint().x * (this.scale - 1)
          image.top = - circle.getCenterPoint().y * (this.scale - 1)
          image.set('dirty', true)
        })
      })
    },
    createImage(canvas, scale) {
      console.log(canvas.width * scale / 2, canvas.height * scale / 2 );
      const image = new fabric.Image(this.$refs.img, {
        left: 0,
        top: 0,
        // scaleX: 0.5,
        // scaleY: 0.2,
        // width: 335,
        // height: 191,
        // angle: 50, // 旋转
        clipPath: new fabric.Circle({
          left: -canvas.width * scale / 2,
          top: -canvas.height * scale / 2 ,
          radius: 50,
          originX: 'center',
          originY: 'center',
        }),
      })

      return image
    },
    createCircle() {
      const circle = new fabric.Circle({
        left: 0,
        top: 0,
        originX: 'center',
        originY: 'center',
        radius: 50,
        fill: 'rgba(253, 230, 138, 0.2)',
        stroke: 'rgba(253, 230, 138, 1)',
        strokeWidth: 2
      })

      // 取消边框
      circle.hasBorders = false
      // 取消控制角
      circle.hasControls = false

      return circle
    },
    setPen(canvas) {
      // 设置画笔颜色
      canvas.freeDrawingBrush.color = '#11999e'

      // 设置画笔粗细
      canvas.freeDrawingBrush.width = 10

      // 画笔投影
      canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: 10,
        offsetX: 10,
        offsetY: 10,
        affectStroke: true,
        color: '#30e3ca',
      })
    },
    setBgImage(canvas) {
      return new Promise(resolve => {
       console.log(this.image);

        fabric.Image.fromURL(this.image, (img) => {
          this.scale = img.width / canvas.width 

          // 设置背景图
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height,
          })

          resolve(this.scale)
        })
      })
    },
  },
}
</script>
