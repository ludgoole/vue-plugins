<template>
  <div class="Palce">
    <van-nav-bar :title="place" left-arrow @click-left="$router.go(-1)" />
    <div class="Palce-container px-5 mt-5">
      <h3 class="font-bold text-green-500">{{ title }}</h3>
      <p class="text-warm-gray-500">{{ story }}</p>
      <ul class="mt-5">
        <li
          class="mt-2"
          v-for="(sentence, index) in sentences"
          :key="index"
          @click="goToSentence(sentence)"
        >
          <p>{{ sentence.py }}</p>
          <p>{{ sentence.cn }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import QIAN_ZI_WEN from '@/mock/qianziwen/sentence'
export default defineComponent({
  name: 'Place',
  setup(props, { root }) {
    const { place, title, story } = root.$route.query
    const sentences = QIAN_ZI_WEN.filter(sentence =>
      title.includes(sentence.cn[0])
    )

    return {
      place,
      title,
      story,
      sentences
    }
  },
  methods: {
    goToSentence({ cn, js, jw = [] }) {
      this.$router.push({
        path: '/character/sentence',
        query: {
          sentence: cn,
          detail: js
        }
      })
    }
  }
})
</script>
