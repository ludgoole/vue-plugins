<template>
  <div class="BaseScreenshot" ref="baseScreenshot">
    <p><span>希望</span>是个好东西，也许是世间最好的东西</p>
    <p>
      希望是个好东西，也许是世间最好的东西
    </p>

    <img width="100%" :src="src" />
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  data() {
    return {
      src: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      const BaseScreenshot = this.$refs.baseScreenshot
      // 保存滚动位置
      const [x, y] = [window.scrollX, window.scrollY]

      // 滚动的初始位置
      window.scrollTo(0, 0)

      // 生成截图
      html2canvas(BaseScreenshot, {
        scrollY: 0,
        scrollX: 0,
        // 开启跨域配置
        useCORS: true,
        // canvas高
        height: BaseScreenshot.scrollHeight,
        // canvas宽
        width: BaseScreenshot.scrollWidth
      }).then(canvas => {
        // document.body.appendChild(canvas)
        this.src = canvas.toDataURL('image/jpeg', 1.0)

        // 恢复滚动位置
        window.scrollTo(x, y)
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.BaseScreenshot {
  position: relative;
  width: 110vw;
  height: 110vh;
  background-image: linear-gradient(45deg, chocolate, lightpink, red);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  p {
    white-space: nowrap;
    margin-top: 20px;
    span {
      font-size: 24px;
    }
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
  }
}
</style>
