<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <van-collapse
      v-model="activeNames"
      class="Analysisprototype-container px-1 flex-1"
    >
      <van-collapse-item
        v-for="prototype in prototypes.sort((a, b) => a.order - b.order)"
        :key="prototype.prototype"
        :title="prototype.prototype"
      >
        <p><b>目标：</b>{{ prototype.dream }}</p>
        <p><b>恐惧：</b>{{ prototype.fear }}</p>
        <p><b>个性：</b>{{ prototype.personality }}</p>
        <p><b>典型：</b>{{ prototype.character }}</p>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  name: 'Analysisprototype',
  data() {
    return {
      activeNames: [],
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    },
    prototypes() {
      return JSON.parse(this.$route.query.prototypes || '[]')
    },
  },
  methods: {
    onprototypeClick({ prototypes }) {
      prototypes &&
        this.$router.push({
          path: '/psychology/prototype',
          query: {
            title: '原型',
            prototypes: JSON.stringify(prototypes),
          },
        })
    },
  },
}
</script>
