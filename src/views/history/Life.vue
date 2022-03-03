<template>
  <div class="Life flex flex-column !overflow-hidden">
    <van-nav-bar :title="name" left-arrow @click-left="$router.go(-1)" />
    <div class="p-4 flex-1 overflow-auto">
      <vue-timeline-update
        v-for="(experience, i) in life"
        :key="experience.age"
        :date="new Date()"
        :dateString="experience.age + '岁'"
        :category="experience.achievement"
        :title="experience.title || ''"
        :description="experience.description"
        :color="colors[i]"
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
      colors: ['red', 'orange', 'green', 'turquoise', 'blue', 'purple', 'black']
    })

    onMounted(async () => {
      const { default: life } = await import(
        `@/mock/history/${chao}/${minister}`
      )

      state.life = life
    })

    return { ...toRefs(state) }
  }
})
</script>
