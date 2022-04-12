<template>
  <div class="Sentence">
    <van-nav-bar :title="sentence" left-arrow @click-left="$router.go(-1)" />
    <div class="Palce-container px-5 mt-5">
      <van-grid square :column-num="4">
        <van-grid-item
          class="text-rose-400"
          v-for="word in words"
          :key="word"
          :text="word"
          @click="goToDrawing(word)"
        />
      </van-grid>
      <div class="mt-5 text-justify">{{ detail }}</div>
      <div class="mt-5 text-warm-gray-500">
        <p class="font-bold">[注]</p>
        <p class="text-sm mt-2 leading-4" v-for="word in zhu" :key="word">
          {{ word }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'Sentence',
  data() {
    const { sentence, detail, zhu } = this.$route.query
    const words = sentence.replace(' ', '')
    return {
      sentence,
      detail: detail.replace(/\s/g, ''),
      zhu: zhu.split('。').filter(Boolean),
      words
    }
  },
  methods: {
    goToDrawing(word, image = '') {
      this.$router.push({
        path: '/character/drawing',
        query: {
          word
        }
      })
    }
  }
})
</script>
<style lang="scss">
.Sentence {
  .van-grid {
    border: 1px solid #ccc;
  }

  .van-grid-item {
    position: relative;
    border: 1px solid #ccc;

    &::before {
      position: absolute;
      top: 50%;
      right: 0;
      left: 0;
      z-index: 1;
      border-top: 1px solid #dcdcdc;
      content: '';
    }

    &::after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      z-index: 1;
      border-left: 1px solid #dcdcdc;
      content: '';
    }

    &__content {
      z-index: 2;
      background: transparent;
    }

    &__text {
      color: inherit;
      font-size: 32px;
    }
  }
}
</style>
