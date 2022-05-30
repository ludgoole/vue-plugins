<template>
  <div>
    <van-nav-bar title="艺术" left-arrow @click-left="$router.go(-1)" />
    <splitpanes class="default-theme text-center !h-auto" horizontal>
      <pane v-for="pai in LIUPAI" :key="pai.id">
        <splitpanes>
          <pane v-for="(child, i) in pai.children" :key="child.name">
            <div
              class="relative flex-center h-60px bg-orange-600 bg-opacity-80"
              :style="{ background: '#D99559' }"
              @click="clickHandler(child)"
            >
              <p
                v-show="i === 0"
                class="absolute top-0 left-0 px-0.5 text-xs bg-yellow-500 bg-opacity-50"
                :style="{ background: '#F2B47E' }"
              >
                {{ pai.name }}
              </p>
              <p
                :class="[
                  'text-yellow-200',
                  'font-jgw',
                  texts[pai.id] || 'text-5xl',
                ]"
                :style="{
                  color: '#BF5B45',
                  'font-family': 'jgw',
                  transform: 'translateY(3px)',
                }"
              >
                {{ child.name | omit }}
              </p>
            </div>
          </pane>
        </splitpanes>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import LIUPAI from '@/mock/art/liupai'

export default {
  name: 'Art',
  data() {
    return {
      LIUPAI,
      texts: {
        '03': 'text-6xl',
        '07': 'text-4xl',
        '09': 'text-2xl',
      },
    }
  },
  filters: {
    omit(value) {
      switch (true) {
        case value.includes('主义'):
        case value.includes('画派'):
        case value.includes('艺术'):
          return value.slice(0, -2)
        case value.includes('派'):
          return value.slice(0, -1)
        default:
          return value
      }
    },
  },
  methods: {
    clickHandler(child) {
      const { name, timeline } = child
      switch (name) {
        case '洞窟壁画':
          this.$router.push({
            path: '/art/Image',
            query: {
              paint: JSON.stringify(child.paints[0]),
            },
          })
          break
        case '神话':
        case '圣经':
          this.$router.push({
            path: '/art/timeline',
            query: {
              name,
              timeline: JSON.stringify(timeline),
            },
          })
          break
        case '文艺复兴':
          this.$router.push({
            path: '/art/wordcloud',
            query: {
              name,
              paints: JSON.stringify(
                child.liupai.reduce((a, c) => a.concat(c.paints), [])
              ),
            },
          })
          break
        case '样式主义':
          this.$router.push({
            path: '/art/image',
            query: {
              paint: JSON.stringify(child.paints[0]),
            },
          })
          break
        case '极少主义':
          this.$router.push({
            path: '/art/squarepaper',
            query: {
              name: '画展',
              paints: JSON.stringify(
                LIUPAI.reduce((a, c) => a.concat(c.children), [])
                  .filter((children) => children.paints || children.liupai)
                  .reduce(
                    (a, c) =>
                      a.concat(
                        c.paints ||
                          c.liupai.reduce((a, c) => a.concat(c.paints), [])
                      ),
                    []
                  )
              ),
            },
          })
          break
        default:
          this.$router.push({
            path: '/art/wordcloud',
            query: {
              name,
              paints: JSON.stringify(child.paints),
            },
          })
      }
    },
  },
}
</script>
