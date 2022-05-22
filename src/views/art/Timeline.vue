<template>
  <div class="Timeline flex flex-column !overflow-hidden">
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <div class="Timeline-container p-4 flex-1 overflow-auto">
      <vue-timeline-update
        v-for="{ date, achievement, title, description, paint } in timeline"
        :key="date + title"
        :date="new Date()"
        :dateString="date"
        :category="achievement"
        :title="title || ''"
        :description="description"
        color="red"
        icon="code"
        @click:title="handleClick({ paint, title, description })"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  computed: {
    title() {
      return this.$route.query.name
    },
    timeline() {
      return JSON.parse(this.$route.query.timeline || '[]')
    },
  },
  beforeRouteEnter(to, from, next) {
    // 后退缓存
    next((vm) => {
      if (from.name === 'Image') {
        vm.$nextTick(() => {
          vm.$el.querySelector('.Timeline-container').scrollTop =
            to.meta.scrollTop || 0
        })
      }
    })
  },
  methods: {
    handleClick({ paint = {}, title, description }) {
      console.log(this.$el.scrollTop)
      const scrollTop = this.$el.querySelector('.Timeline-container').scrollTop
      this.$route.meta.scrollTop = scrollTop

      this.$router.push({
        path: '/art/image',
        query: {
          title,
          description,
          paint: JSON.stringify(paint),
        },
      })
    },
  },
}
</script>
