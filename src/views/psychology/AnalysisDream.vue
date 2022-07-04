<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <div class="AnalysisDream-container px-4 flex-1">
      <section class="mt-2">
        <van-tag class="!py-1 !px-2">编码</van-tag>
        <van-tag
          type="primary"
          v-for="item in encode"
          :key="item"
          class="ml-2 !py-1 !px-2"
        >
          {{ item }}
        </van-tag>
      </section>
      <section class="mt-2">
        <van-tag class="!py-1 !px-2">解码</van-tag>
        <van-tag
          type="success"
          v-for="item in decode"
          :key="item"
          class="ml-2 !py-1 !px-2"
        >
          {{ item }}
        </van-tag>
      </section>
      <section
        class="mt-2 text-justify leading-normal text-gray-400 text-size-14px"
      >
        {{ example.dream }}
      </section>
      <section class="mt-2">
        <van-tag class="!py-1 !px-2">关键词</van-tag>
        <ul>
          <li v-for="item in keywords" :key="item.keyword">
            <template v-if="item.association">
              {{ item.keyword }}: {{ item.association }}
              <van-tag type="danger">{{ item.encode }}</van-tag>
            </template>
          </li>
        </ul>
      </section>

      <section class="mt-2 mb-4">
        <van-tag class="!py-1 !px-2">目的</van-tag>
        <p class="whitespace-pre-line">{{ example.target.trim() }}</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalysisDream',

  computed: {
    title() {
      return this.$route.query.title
    },
    theme() {
      return JSON.parse(this.$route.query.theme || '{}')
    },
    encode() {
      return this.theme.encode || []
    },
    decode() {
      return this.theme.decode || []
    },
    example() {
      return this.theme.example || {}
    },
    keywords() {
      const { persons, goods, actions, emotions } = this.example
      return [...persons, ...goods, ...actions, ...emotions]
    },
  },
}
</script>
