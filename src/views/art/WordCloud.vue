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
            <!-- <img
              ref="img"
              src="https://img0.baidu.com/it/u=1519050398,2562977859&fm=253&fmt=auto&app=138&f=JPEG?w=879&h=500"
            /> -->
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
      // words: [1, 2, 3, 4, 5, 6, 7].map((text, i) => {
      //   return {
      //     text,
      //     weight: (Math.random() * 10) | 0,
      //     rotation: Math.random(),
      //     color: '#' + Math.random().toString(16).slice(-6),
      //   }
      // }),
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
    // words: {
    //   get() {
    //     return this.paints.map(({ name }) => {
    //       return {
    //         text: name.slice(0, -2),
    //         weight: (Math.random() * 10) | 0,
    //         'font-family': 'jgw',
    //         rotation: Math.random(),
    //         color: '#' + Math.random().toString(16).slice(-6),
    //       }
    //     })
    //   },
    //   set(a, val) {
    //     console.log(a, val)
    //   },
    // },
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

<style></style>
