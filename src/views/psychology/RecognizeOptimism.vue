<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <van-steps
      direction="vertical"
      :active="4"
      class="RecognizeOptimism-container px-4 flex-1"
    >
      <van-step v-for="(mode, i) in modes" :key="mode.mode">
        <h3>{{ mode.mode.slice(0, 1) }} ({{ mode.translate }})</h3>
        <ul v-if="mode.examples">
          <li
            v-for="example in mode.examples"
            :key="example.example"
            class="mt-2"
          >
            <van-tag class="!py-1 !px-2" :type="types[i]">{{
              example.tag
            }}</van-tag>
            {{ example.example }}
          </li>
        </ul>
        <p v-else>{{ mode.example || '' }}</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
export default {
  name: 'RecognizeOptimism',
  data() {
    return {
      types: {
        2: 'danger',
        3: 'success',
      },
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    },
    theme() {
      return JSON.parse(this.$route.query.theme || '{}')
    },
    modes() {
      return this.theme.modes || []
    },
  },
}
</script>
