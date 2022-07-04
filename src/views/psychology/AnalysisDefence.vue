<template>
  <div class="relative">
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-cell
        v-for="defence in defences"
        :key="defence.defence"
        :title="defence.defence"
        :label="defence.example"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'AnalysisDefence',
  computed: {
    title() {
      return this.$route.query.title
    },
    theme() {
      return JSON.parse(this.$route.query.theme || '{}')
    },
    defences() {
      return this.theme.defences || []
    },
  },
}
</script>
