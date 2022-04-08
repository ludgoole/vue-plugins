<template>
  <div class="Sentence">
    <van-nav-bar :title="sentence" left-arrow @click-left="$router.go(-1)" />
    <div class="Palce-container px-5 mt-5">
      <van-grid square :column-num="4">
        <van-grid-item
          v-for="word in words"
          :key="word"
          :text="word"
          @click="goToDrawing(word)"
        />
      </van-grid>
      <p class="mt-5 text-warm-gray-500">{{ detail }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'Sentence',
  setup(props, { root }) {
    const { sentence, detail } = root.$route.query
    const words = sentence.replace(' ', '')

    return {
      sentence,
      detail,
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
      // height: 100%;
      border-left: 1px solid #dcdcdc;
      content: '';
    }

    &__content {
      z-index: 2;
      background: transparent;
    }

    &__text {
      // background: rgba(16, 185, 129, 0.4);
      font-size: 32px;
    }

    // &__content::after {
    //   border-color: #f2f2f2;
    // }
  }

  // .van-hairline--top::before {
  //   position: absolute;
  //   top: -50%;
  //   right: 0;
  //   bottom: -50%;
  //   left: -50%;
  //   box-sizing: border-box;
  //   border: 0 solid red;
  //   border-left-width: 1px;
  //   transform: scale(0.5);
  //   content: ' ';
  //   pointer-events: none;
  // }

  // .van-hairline--top::after {
  //   border-color: #ccc;
  // }
}
</style>
