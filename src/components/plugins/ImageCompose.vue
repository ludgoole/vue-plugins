<template>
  <div>
    <div class="qrcode" ref="qrCodeUrl" v-show="false"></div>
    <img :src="b64" />
  </div>
</template>

<script>
import { MCanvas } from 'mcanvas'
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      isShowBtn: false,
      value: 10,
      b64: ''
    }
  },
  mounted() {
    this.creatQrCode().then(() => {
      // 使用nextTick无法获取到实例
      // 必须使用 setTimeout 延迟
      setTimeout(this.init, 0)
    })
  },
  methods: {
    init() {
      const mc = new MCanvas({
        width: 500,
        height: 500,
        backgroundColor: 'black'
      })

      // background : 准备底图；提供多种模式
      mc.background(
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3744052883,4237116621&fm=26&gp=0.jpg',
        {
          left: 0,
          top: 0,
          color: '#000000',
          type: 'origin'
        }
      )

      // add 添加图片素材基础函数；
      mc.add(
        'https://img1.360buyimg.com/n6/jfs/t1/170673/4/2913/244729/6002af29E86fbc8f4/a678f2fedc23b5cc.jpg',
        {
          width: 160,
          pos: {
            x: 'center',
            y: 'center',
            scale: 0.84,
            rotate: 1
          }
        }
      )

      // text 添加文字数据基础函数；
      mc.text('落霞与孤鹜齐飞<br>秋水共长天一色', {
        // width: '300px',
        // align: 'center',
        normalStyle: {
          font: 'italic small-caps bold 24px arial',
          color: '#ffffff'
        },
        pos: {
          x: '40%',
          y: 0
        }
      })

      // watermark 添加水印函数，基于 add 函数封装；
      mc.watermark(this.$refs.qrCodeUrl.querySelector('img').src, {
        width: 60,
        pos: 'rightBottom'
      })

      // draw 最终绘制函数，用于最终的绘制；
      mc.draw({
        type: 'jpg',
        quality: 0.8,

        success: b64 => {
          console.log('b64', b64)
        },
        error: err => {
          console.log('b64', err)
        }
      }).then(b64 => {
        this.b64 = b64
      })
    },
    creatQrCode() {
      const qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: 'https://static-alias-1.360buyimg.com/jzt/md/images/re-logo.png',
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        // 纠错等级
        // 纠错级别越高，整体需要携带的信息越多
        // L : 1, M : 0, Q : 3, H : 2
        correctLevel: QRCode.CorrectLevel.H
      })
      console.log('qrcode', qrcode)

      return Promise.resolve(qrcode)
    }
  }
}
</script>

<style lang="scss" scoped></style>
