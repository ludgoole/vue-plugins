<template>
  <swiper
    ref="mySwiper"
    :options="swiperOption"
    @slideChange="slideChange"
    @slideNextTransitionStart="slideNextTransitionStart"
    @slidePrevTransitionStart="slidePrevTransitionStart"
  >
    <!-- slides -->
    <swiper-slide>I'm Slide 1</swiper-slide>
    <swiper-slide>I'm Slide 2</swiper-slide>
    <swiper-slide>I'm Slide 3</swiper-slide>
    <swiper-slide>I'm Slide 4</swiper-slide>
    <swiper-slide>I'm Slide 5</swiper-slide>
    <swiper-slide>I'm Slide 6</swiper-slide>
    <swiper-slide>I'm Slide 7</swiper-slide>
    <!-- Optional controls -->
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    <div slot="button-prev" class="swiper-button-prev" @click="prevClick" />
    <div slot="button-next" class="swiper-button-next" @click="nextClick" />
    <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

// Import Swiper styles
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        direction: 'vertical',
        // slidesPerView: 'auto',
        // slidesPerView: 3,
        // slidesPerGroup: 3,
        // spaceBetween: 30,
        // 参数选项,显示小点
        // pagination: '.swiper-pagination',
        // 循环
        loop: false,
        // 每张播放时长3秒，自动播放
        autoplay: 2000,
        // 滑动速度
        speed: 1000,
        // eslint-disable-next-line no-dupe-keys
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
        // pagination: '.swiper-pagination',
        // paginationClickable: true,
        // prevButton: '.swiper-button-prev',
        // nextButton: '.swiper-button-next'
      },
      index: 0
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(2, 1000, false)
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper)
    },
    onSlideChange() {
      console.log('slide change')
    },
    slideNextTransitionStart(swiper) {
      console.log('slideNextTransitionStart', this.$refs.mySwiper.swiper)
      // this.$refs.mySwiper.swiper.allowSlidePrev = false
      this.$refs.mySwiper.swiper.allowSlideNext = false
      console.log(
        'slideNextTransitionStart',
        this.$refs.mySwiper.swiper.allowSlideNext
      )
    },
    slidePrevTransitionStart(swiper) {
      console.log('slidePrevTransitionStart', this.$refs.mySwiper.swiper)
      // this.$refs.mySwiper.swiper.allowSlidePrev = false
      this.$refs.mySwiper.swiper.allowSlideNext = true
      console.log(
        'slidePrevTransitionStart',
        this.$refs.mySwiper.swiper.allowSlideNext
      )
    },
    prevClick() {
      !this.swiper.isBeginning && (this.index -= 2)
      this.index = Math.max(0, this.index)
      this.swiper.slideTo(this.index, 1000, false)
      console.log(this.index)
      console.log(this.swiper.isBeginning)
    },
    nextClick() {
      !this.swiper.isEnd && this.index++
      this.swiper.slideNext()
      console.log(this.swiper.isEnd)
      console.log(this.index)
    },
    slideChange() {
      this.index = this.swiper.activeIndex
      console.log(this.index)
    }
  }
}
</script>
<style>
* {
  touch-action: none;
}
.swiper-slide {
  width: 100%;
  height: 100vh;
}
/* .swiper-slide:nth-child(2n) {
  width: 60%;
}

.swiper-slide:nth-child(3n) {
  width: 40%;
} */
</style>
