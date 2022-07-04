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
      return '心理学派' || this.$route.query.title
    },
    themes() {
      return JSON.parse(this.$route.query.themes || '[]')
    },
    allThemes() {
      return JSON.parse(this.$route.query.allThemes || '[]')
    },
  },
  mounted() {
    this.refresh()
  },
  methods: {
    onWordClick({ text, theme }) {
      let path = ''
      switch (text) {
        case '人格结构':
          path = '/psychology/analysisSpirits'
          break
        case '防御机制':
          path = '/psychology/analysisDefence'
          break
        case '梦的解析':
          path = '/psychology/analysisDream'
          break
        case '乐观':
          path = '/psychology/recognizeOptimism'
          break
        case '平衡':
          path = '/psychology/recognizeBalance'
          break
        case '条件反射':
          path = '/psychology/actionReflection'
          break
        case '微表情':
          path = '/psychology/actionExpression'
          break
        case '微反应':
          path = '/psychology/actionBehavior'
          break
        case '说谎':
          path = '/psychology/actionLie'
          break
      }
      this.$router.push({
        path,
        query: {
          title: text,
          theme: JSON.stringify(theme),
        },
      })
    },
    refresh() {
      this.words = this.allThemes.filter(Boolean).map((theme) => {
        return {
          theme,
          text: theme.theme,
          weight: (Math.random() * 10) | 0,
          rotation: Math.random(),
          color: '#' + Math.random().toString(16).slice(-6),
        }
      })
    },
  },
}
</script>
