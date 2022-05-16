<template>
  <div class="Timeline flex flex-column !overflow-hidden">
    <van-nav-bar
      :title="name"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="p-4 flex-1 overflow-auto">
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
        @click:title="handleClick(paint)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  data() {
    return {
      name: 'name'
    }
  },
  computed: {
    timeline() {
      return JSON.parse(this.$route.query.timeline || '[]') 
    }
  },
  methods: {
    handleClick(paint = {}) {
      this.$router.push({
        path: '/art/image',
        query: {
          paint: JSON.stringify(paint)
        },
      })
    }
  },
}
</script>
