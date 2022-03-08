<template>
  <div>
    <van-nav-bar
      title="历史"
      right-text="退出"
      left-arrow
      @click-left="goBackHandler"
      @click-right="$router.go(-1)"
    />
    <splitpanes class="default-theme text-center !h-auto" horizontal>
      <pane v-for="(chao, i) in chaodai" :key="i">
        <div
          :class="[chao.children ? 'bg-teal-500 bg-opacity-50' : '']"
          class="relative flex-center h-60px"
          @click="clickHandler(chao)"
        >
          <p
            v-if="chao.time"
            class="absolute top-0 left-0 p-1 text-xs bg-yellow-500 bg-opacity-50"
          >
            {{ chao.time }}
          </p>
          <p
            :class="[chao.diwang ? 'text-yellow-700' : '']"
            @click="gotoHandler(chao)"
          >
            {{ chao.name }}
          </p>
        </div>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance
} from '@vue/composition-api'
import CHAODAI from '@/mock/history/chaodai'

export default defineComponent({
  name: 'History',
  setup() {
    const { proxy: self } = getCurrentInstance()
    const state = reactive({
      cache: [CHAODAI],
      chaodai: CHAODAI
    })

    const clickHandler = chao => {
      if (chao.children) {
        state.cache.push(chao.children)
        state.chaodai = chao.children
      }
    }
    const goBackHandler = () => {
      if (state.cache.length > 1) {
        state.cache.pop()
        state.chaodai = state.cache[state.cache.length - 1]
      }
    }
    const gotoHandler = data => {
      const { id: chao, name, diwang: emperor } = data

      emperor &&
        self.$router.push({
          path: '/history/emperor',
          query: {
            chao,
            name
          }
        })
    }
    return { ...toRefs(state), clickHandler, goBackHandler, gotoHandler }
  }
})
</script>
