<template>
  <div>
    <van-nav-bar :title="pile.name" left-arrow @click-left="$router.go(-1)" />
    <section class="px-5 relative">
      <p class="mt-5">{{ pile.brief }}</p>
      <p class="text-gray-400 text-xs">{{ pile.extend }}</p>
      <p class="text-gray-400 text-xs">{{ pile.association }}</p>
      <p class="mt-10 font-bold">{{ pile.viewpoint }}</p>
      <p class="mt-2">{{ pile.sentence }}</p>
      <p class="text-gray-400 text-xs mt-1">{{ pile.translation }}</p>
      <dl class="mt-5">
        <dt>关联</dt>
        <dd class="text-gray-400 text-xs mt-2">书籍：{{ pile.book }}</dd>
        <dd class="text-gray-400 text-xs mt-1">卦象：{{ pile.gua }}</dd>
      </dl>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Knowledge',
  computed: {
    pile() {
      return JSON.parse(this.$route.query.pile)
    },
  },
  methods: {},
}
</script>
