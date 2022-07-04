<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <van-steps :active="ative" class="!px-4 mt-4" @click-step="clickStep">
      <van-step v-for="way in ways" :key="way.way">
        {{ way.way }}
      </van-step>
    </van-steps>
    <van-steps
      direction="vertical"
      :active="ative"
      active-color="#f43f5e"
      class="ml-2"
      @click-step="clickStep"
    >
      <van-step v-for="way in ways.slice(0, ative + 1)" :key="way.example">
        {{ way.example }}
      </van-step>
    </van-steps>
  </div>
</template>

<script>
export default {
  name: 'ActionReflection',
  data() {
    return {
      ative: 0,
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    },
    theme() {
      return JSON.parse(this.$route.query.theme || '{}')
    },
    ways() {
      return this.theme.ways || []
    },
    // strengthens() {
    //   return this.ways[0].split('-') || []
    // },
    // weakens() {
    //   return this.ways[1].split('-') || []
    // },
  },
  methods: {
    clickStep(index) {
      this.ative = index
    },
  },
}
</script>
