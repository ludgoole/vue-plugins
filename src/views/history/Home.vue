<template>
  <div>
    pos: {{ x }}, {{ y }}
    <div class="p-5px mt-[0.3px] flex-center"></div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useMouse, usePreferredDark, useLocalStorage } from '@vueuse/core'

export default defineComponent({
  name: 'radio-buttons',
  setup() {
    // tracks mouse position
    const { x, y } = useMouse()

    // is user prefers dark theme
    const isDark = usePreferredDark()

    // persist state in localStorage
    const store = useLocalStorage('my-storage', {
      name: 'Apple',
      color: 'red'
    })

    return { x, y, isDark, store }
  }
})
</script>
