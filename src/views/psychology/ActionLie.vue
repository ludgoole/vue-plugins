<template>
  <div class="relative">
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <template v-if="type === 'language'">
      <section class="mt-2 px-4">
        <van-tag class="!py-1 !px-2">编码</van-tag>
        <van-tag
          type="danger"
          v-for="item in language.decode"
          :key="item"
          class="ml-2 !py-1 !px-2"
        >
          {{ item }}
        </van-tag>
        <van-tag type="primary" class="ml-2 !py-1 !px-2" @click="type = 'body'"
          >肢体</van-tag
        >
      </section>
      <section class="mt-2">
        <van-cell-group>
          <van-cell
            v-for="lie in language.lies"
            :key="lie.lie"
            :title="lie.lie"
            :value="lie.example"
            :label="lie.decode"
          />
        </van-cell-group>
      </section>
    </template>
    <template v-else>
      <section class="mt-2 px-4">
        <van-tag class="!py-1 !px-2">编码</van-tag>
        <van-tag
          type="danger"
          v-for="item in language.decode"
          :key="item"
          class="ml-2 !py-1 !px-2"
        >
          {{ item }}
        </van-tag>
        <van-tag
          type="primary"
          class="ml-2 !py-1 !px-2"
          @click="type = 'language'"
          >语言</van-tag
        >
      </section>
      <section class="mt-2">
        <van-cell-group>
          <van-cell
            v-for="lie in body"
            :key="lie.lie"
            :title="lie.lie"
            :value="lie.action"
          />
        </van-cell-group>
      </section>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ActionLie',
  data() {
    return {
      type: 'language',
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    },
    theme() {
      return JSON.parse(this.$route.query.theme || '{}')
    },
    language() {
      return this.theme.language || {}
    },
    body() {
      return this.theme.body || []
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/ .van-cell__value {
  flex: 4;
}
</style>
