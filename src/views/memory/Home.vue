<template>
  <div class="Home">
    <van-nav-bar :title="poem" left-arrow @click-left="$router.go(-1)" />
    <section class="px-5">
      <van-radio-group class="mt-4" v-model="poem" direction="horizontal">
        <van-radio name="虚词">易经</van-radio>
        <van-radio name="静夜诗">论语</van-radio>
      </van-radio-group>
      <ul :class="['grid', `grid-cols-${cols}`, , 'gap-2', 'mt-4']">
        <li
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
import YIJING from '@/mock/memory/yijing'
const map = new Map([
  ['虚词', [YIJING, 4]],
  ['静夜诗', [LUNYU, 5]],
])
export default {
  name: 'Memory',
  data() {
    return {
      poem: '虚词',
    }
  },
  computed: {
    list() {
      return map.get(this.poem)[0]
    },
    cols() {
      return map.get(this.poem)[1]
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
    font-weight: 100;
    text-align: center;
    background: url('https://www.cidianwang.com/images/z_100.gif') center center;
    background-repeat: no-repeat;
    border: 1px solid sandybrown;
  }

  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    font-size: 44px;
    line-height: 78px;
  }

  .grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    font-size: 32px;
    line-height: 60px;
  }

  .grid-cols-7 {
    grid-template-columns: repeat(7, minmax(0, 1fr));
    font-size: 28px;
    line-height: 40px;
  }
}
</style>
