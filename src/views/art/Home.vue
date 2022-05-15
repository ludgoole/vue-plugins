<template>
  <div>
    <van-nav-bar title="艺术" left-arrow @click-left="$router.go(-1)" />
    <splitpanes class="default-theme text-center !h-auto" horizontal>
      <pane v-for="(pai, i) in LIUPAI" :key="i">
        <div
          :class="[pai.children ? 'bg-orange-600 bg-opacity-80' : '']"
          class="relative flex-center h-60px"
          @click="clickHandler(pai)"
        >
          <p
            v-if="pai.time"
            class="absolute top-0 left-0 p-1 text-xs bg-yellow-500 bg-opacity-50"
          >
            {{ pai.time }}
          </p>
          <p
            :class="[pai.diwang ? 'text-yellow-700' : '']"
            @click.stop="gotoHandler(pai)"
          >
            {{ pai.name }}
          </p>
        </div>
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
}
</script>
