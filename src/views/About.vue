<template>
  <div class="about">
    <h1>This is an about page</h1>
    <BScroll v-if="false"></BScroll>
    <BaseSwiper v-if="false"></BaseSwiper>
    <VView v-if="false"></VView>
    <Hammer v-if="true"></Hammer>
    <ImageCompose></ImageCompose>
  </div>
</template>

<script>
// @ is an alias to /src
import BScroll from '@/components/plugins/BScroll.vue'
import BaseSwiper from '@/components/plugins/BaseSwiper.vue'
import VView from '@/components/plugins/VView.vue'
import Hammer from '@/components/plugins/Hammer.vue'
import ImageCompose from '@/components/plugins/ImageCompose.vue'

console.log('MathJax', window.MathJax)

export default {
  name: 'Home',
  components: {
    BScroll,
    BaseSwiper,
    VView,
    Hammer,
    ImageCompose
  }
}
</script>
