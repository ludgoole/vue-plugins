<template>
  <div class="about">
    <h1>This is an about page</h1>
    <BScroll v-if="false"></BScroll>
    <BaseSwiper v-if="false"></BaseSwiper>
    <VView v-if="false"></VView>
    <Hammer v-if="false"></Hammer>
    <ImageCompose v-if="false"></ImageCompose>
    <BasePlayer v-if="false"></BasePlayer>
    <BaseDrag v-if="false"></BaseDrag>
    <BaseDragResize v-if="false"></BaseDragResize>
    <BaseFullpage v-if="false"></BaseFullpage>
    <BaseScreenshot v-if="false"></BaseScreenshot>
    <BasePullTo v-if="false"></BasePullTo>
    <BasePlaceholder v-if="false"></BasePlaceholder>
    <BaseVideo v-if="false"></BaseVideo>
    <BaseRecorder v-if="false"></BaseRecorder>
    <BaseTreeSelect v-if="false"></BaseTreeSelect>
    <BaseSvg v-if="false"></BaseSvg>
    <BaseDrive v-if="false"></BaseDrive>
    <DefineReactive v-if="false" :count="count"></DefineReactive>
    <template v-if="false">
      <p>{{ price }}</p>
      <el-button type="primary" @click="count++">add</el-button>
      <el-button type="primary" @click="price--">
        changePrice
      </el-button>
    </template>
    <ReHome v-if="false"></ReHome>
    <!-- <BaseSocket v-if="false"></BaseSocket> -->
    <BaseDirective v-if="false"></BaseDirective>
    <TopicList></TopicList>
  </div>
</template>

<script>
// @ is an alias to /src
import components from '@/components/plugins'
import renders from '@/components/renders'
import TopicList from '@/components/reactive/TopicList.vue'

console.log('MathJax', components, renders)

export default {
  name: 'Home',
  components: {
    ...components,
    ...renders,
    TopicList
  },
  data() {
    return {
      count: 1,
      price: 12
    }
  },
  mounted() {
    // this.$axios.post('/api/login').then(data => {
    //   console.log('/api/login', data)
    // })
  },
  provide() {
    return {
      price: this.price
    }
  }
}
</script>
