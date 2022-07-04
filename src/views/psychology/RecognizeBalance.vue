<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <VeRadar
      class="mt-4"
      :selecteds="selecteds"
      @legendselectchanged="legendselectchanged"
    ></VeRadar>

    <ul class="RecognizeBalance-container px-4 flex-1">
      <li v-for="mode in modes" :key="mode.mode">
        <p :class="{ 'opacity-30 line-through': curMode === mode.mode }">
          {{ mode.mode }}:
          {{ mode.example }}
        </p>
        <p v-if="curMode === mode.mode">
          {{ mode.mode }}:
          {{ mode.change }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import VeRadar from '@/components/VeRadar.vue'
export default {
  name: 'RecognizeBalance',
  components: {
    VeRadar,
  },
  data() {
    return {
      selecteds: [true, false, false, false],
      types: {
        2: 'danger',
        3: 'success',
      },
      curMode: '',
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    },
    theme() {
      return JSON.parse(this.$route.query.theme || '{}')
    },
    modes() {
      return this.theme.modes || []
    },
  },
  mounted() {
    // this.showSeeksGraph()
  },
  methods: {
    legendselectchanged(name) {
      const mode = name.slice(-1)
      if (this.curMode === mode) {
        this.selecteds = [true, false, false, false]
        this.curMode = ''
      } else {
        this.curMode = mode
        this.selecteds = [
          true,
          ...this.modes.map((mode) => mode.mode === this.curMode),
        ]
      }
      console.log(name, this.modes)
    },
  },
}
</script>
