<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <ul class="AnalysisSpirits-container px-4 flex-1">
      <li
        v-for="(spirit, i) in spirits"
        :key="spirit.spirit"
        class="flex px-4 py-6 text-warm-gray-200"
        :style="{ background: colors[i] }"
        @click="onSpiritClick(spirit)"
      >
        <p class="text-size-48px">{{ spirit.spirit }}</p>
        <div class="ml-4 text-warm-gray-300">
          <p>存在于{{ spirit.consciousness }}中</p>
          <p>遵循{{ spirit.principle }}原则</p>
        </div>
        <img
          class="ml-auto ounded-1/2 opacity-30"
          width="50"
          :src="spirit.image"
          alt="spirit.character"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AnalysisSpirits',
  data() {
    return {
      colors: [
        '#94c66b', // 葱绿
        '#abcc89', // 浅草绿
        '#88d5b9', // 玉绿
        '#569597', // 碧玉石
        '#5c8987', // 灰绿
        '#647372', // 暗灰
      ],
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    },
    theme() {
      return JSON.parse(this.$route.query.theme || '{}')
    },
    spirits() {
      return this.theme.spirits || []
    },
  },
  methods: {
    onSpiritClick({ prototypes }) {
      prototypes &&
        this.$router.push({
          path: '/psychology/analysisPrototype',
          query: {
            title: '原型',
            prototypes: JSON.stringify(prototypes),
          },
        })
    },
  },
}
</script>
