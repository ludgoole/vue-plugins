<template>
  <div class="relative">
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-cell
        v-for="behavior in behaviors"
        :key="behavior.behavior"
        :title="behavior.behavior"
        :value="behavior.action"
        :label="behavior.status"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'ActionBehavior',
  computed: {
    title() {
      return this.$route.query.title
    },
    theme() {
      return JSON.parse(this.$route.query.theme || '{}')
    },
    behaviors() {
      return this.theme.behaviors || []
    },
  },
}
</script>
