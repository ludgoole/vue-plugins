<template>
  <div>
    <van-nav-bar title="艺术" left-arrow @click-left="$router.go(-1)" />
    <splitpanes class="default-theme text-center !h-auto" horizontal>
      <pane v-for="pai in LIUPAI" :key="pai.id">
        <splitpanes>
          <pane v-for="(child, i) in pai.children" :key="child.name">
            <div
              class="relative flex-center h-60px bg-orange-600 bg-opacity-80"
              :style="{background: '#D99559'}"
              @click="clickHandler(child)"
            >
              <p 
                v-show="i === 0" 
                class="absolute top-0 left-0 px-0.5 text-xs bg-yellow-500 bg-opacity-50"
                :style="{background: '#F2B47E'}"
                >
                {{ pai.name }}
              </p>
              <p 
                :class="['text-yellow-200', pai.id === '03' ? 'text-xs' : 'text-2xl']" 
                :style="{color: '#BF5B45', 'font-family': 'zszd' }">
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
    }
  },
  filters: {
    omit(value) {
      switch(true) {
        case value.includes('主义'):
        case value.includes('画派'):
        case value.includes('艺术'):
          return value.slice(0, -2)
        case value.includes('派'):
          return value.slice(0, -1)
        default:
          return value
      }
    }
  },
  methods: {
    clickHandler({name, timeline}) {
      switch(name) {
        case '圣经':
          this.$router.push({
            path: '/art/timeline',
            query: {
              timeline: JSON.stringify(timeline),
            },
          })
      }
    }
  },
}
</script>
