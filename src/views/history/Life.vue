<template>
  <div class="Life flex flex-column !overflow-hidden">
    <van-nav-bar
      :title="name"
      right-text="足迹"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="toMap"
    />
    <div class="p-4 flex-1 overflow-auto">
      <vue-timeline-update
        v-for="{ date, achievement, title, description } in life"
        :key="date + achievement"
        :date="new Date()"
        :dateString="date"
        :category="achievement"
        :title="title || ''"
        :description="description"
        color="red"
        icon="code"
      />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  onMounted
} from '@vue/composition-api'

export default defineComponent({
  name: 'Life',
  setup() {
    const { proxy: self } = getCurrentInstance()
    const { chao, minister, name } = self.$route.query

    const state = reactive({
      life: [],
      chao,
      minister,
      name,
      colors: [
        '',
        'red',
        'orange',
        'green',
        'turquoise',
        'blue',
        'purple',
        'black'
      ]
    })

    onMounted(async () => {
      const { default: life } = await import(
        `@/mock/history/${chao}/${minister}`
      )

      state.life = life
    })

    const toMap = () => {
      self.$router.push({
        path: '/history/map',
        query: self.$route.query
      })
    }

    return { ...toRefs(state), toMap }
  }
})
</script>
