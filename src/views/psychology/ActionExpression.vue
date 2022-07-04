<template>
  <div class="relative">
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-cell
        v-for="expression in expressions"
        :key="expression.expression"
        :title="expression.expression"
        :value="expression.example"
        :label="expression.status"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'ActionExpression',
  computed: {
    title() {
      return this.$route.query.title
    },
    theme() {
      return JSON.parse(this.$route.query.theme || '{}')
    },
    expressions() {
      return this.theme.expressions || []
    },
  },
}
</script>
