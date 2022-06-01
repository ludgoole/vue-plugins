<template>
  <div class="px-5 mt-4">
    <h3 class="mt-4 font-bold">{{ yaoCi }}</h3>
    <ul class="mt-4">
      <li v-for="(value, key, index) in yiLi" :key="key" class="mt-2">
        <p>{{ keys[index] }}</p>
        <p class="text-gray-400 text-xs">{{ value }}</p>
      </li>
      <!-- <li>情境: {{ yiLi.situation }}</li>
      <li>方案: {{ yiLi.how }}</li>
      <li>前提: {{ yiLi.premise }}</li>
      <li>原因: {{ yiLi.why }}</li>
      <li>意外: {{ yiLi.or }}</li>
      <li>故事: {{ yiLi.story }}</li>
      <li>备注: {{ yiLi.note }}</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'YiLi',
  data() {
    return {
      keys: ['情境', '方案', '前提', '原因', '意外', '故事', '备注'],
    }
  },
  computed: {
    yaoCi() {
      return this.$route.query.yaoCi
    },
    yiLi() {
      return JSON.parse(this.$route.query.yiLi || '{}')
    },
  },
}
</script>

<style lang="scss" scoped></style>
