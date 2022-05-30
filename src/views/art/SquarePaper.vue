<template>
  <div class="flex flex-column">
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <div class="SquarePaper-container px-4 flex-1 my-4 overflow-auto">
      <ul class="grid grid-cols-4 gap-2">
        <li
          v-for="(paint, i) in paints"
          :key="paint.title + i"
          class="h-80px bg-yellow-50"
        >
          <img
            width="100%"
            class="h-80px"
            :src="paint.image"
            :alt="paint.title"
            @click="onImgClick(paint)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SquarePaper',
  data() {
    return {
      count: 24,
      // paints: [],
    }
  },
  computed: {
    title() {
      return this.$route.query.name
    },
    paints() {
      return JSON.parse(this.$route.query.paints || '[]')
    },
  },
  mounted() {
    // this.refresh()
  },
  methods: {
    onImgClick(paint) {
      console.log(paint)
      this.$router.push({
        path: '/art/image',
        query: {
          paint: JSON.stringify(paint),
        },
      })
    },
    refresh() {
      const paints = JSON.parse(this.$route.query.paints || '[]')
      // const list = Array(this.count)
      //   .fill(1)
      //   .map((v, i) => i)
      //   .sort(() => Math.random() - 0.5)

      // list.forEach((v, i) => {
      //   // this.paints[v] = paints[i] || { title: i }
      //   this.$set(this.paints, v, paints[i] || { title: i })
      // })
      this.paints = Array(this.count)
        .fill(1)
        .map((v, i) => paints[i] || { title: i })
    },
  },
}
</script>
