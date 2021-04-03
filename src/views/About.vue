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
    <BaseSvg v-if="true"></BaseSvg>
  </div>
</template>

<script>
// @ is an alias to /src
import components from '@/components/plugins'

console.log('MathJax', components)

export default {
  name: 'Home',
  components
}
</script>
