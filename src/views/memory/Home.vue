<template>
  <div class="Home">
    <van-nav-bar :title="poem" left-arrow @click-left="$router.go(-1)" />
    <section class="px-5">
      <ul class="flex justify-between flex-wrap mt-4">
        <li
          class="mt-2"
          v-for="(item, index) in list"
          :key="item.word + index"
          @click="goWord(item)"
        >
          {{ item.word }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import LUNYU from '@/mock/memory/lunyu'
export default {
  name: 'Memory',
  data() {
    return {
      LUNYU,
      poem: '静夜诗',
    }
  },
  computed: {
    list() {
      return LUNYU
    },
  },
  created() {
    console.log(this.$route)
  },
  methods: {
    goWord(item) {
      this.$router.push({
        path: '/memory/word',
        query: {
          chapter: JSON.stringify(item),
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.Home {
  li {
    width: 60px;
    font-weight: 100;
    font-size: 32px;
    line-height: 60px;
    text-align: center;
    background: url('https://www.cidianwang.com/images/z_100.gif') center center;
    background-repeat: no-repeat;
    border: 1px solid sandybrown;
  }
}
</style>
