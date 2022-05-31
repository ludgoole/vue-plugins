<template>
  <div class="flex flex-column !overflow-hidden">
    <van-nav-bar
      :title="title"
      right-text="刷新"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="refresh"
    />
    <div class="WordCloud-container px-4 flex-1">
      <VueWordCloud :words="words">
        <template slot-scope="{ text, word }">
          <div @click="onWordClick(word)">
            {{ text }}
          </div>
        </template>
      </VueWordCloud>
    </div>
  </div>
</template>

<script>
import VueWordCloud from 'vuewordcloud'
export default {
  name: 'WordCloud',
  components: {
    VueWordCloud,
  },
  data() {
    return {
      words: [],
    }
  },
  computed: {
    title() {
      return this.$route.query.name
    },
    paints() {
      return JSON.parse(this.$route.query.paints || '[]')
    },
  },
  mounted() {
    this.refresh()
  },
  methods: {
    onWordClick(word) {
      console.log(word)
      this.$router.push({
        path: '/art/image',
        query: {
          paint: JSON.stringify(word.paint),
        },
      })
    },
    refresh() {
      this.words = this.paints.filter(Boolean).map((paint) => {
        return {
          paint,
          text: paint.author,
          weight: (Math.random() * 10) | 0,
          'font-family': 'jgw',
          rotation: Math.random(),
          color: '#' + Math.random().toString(16).slice(-6),
        }
      })
    },
  },
}
</script>
