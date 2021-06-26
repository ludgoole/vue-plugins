<template>
  <div class="type-chose">
    <div class="type-chose-left">
      <div
        v-for="item in dataList"
        :class="item.chose_status === true ? 'itemActive' : ''"
        @click="dealItemClick(item)"
        :key="item.id"
      >
        {{ item.name }}-{{ item.chose_status }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test1',
  data() {
    return {
      dataList: [
        {
          id: 1,
          name: '小时工'
        },
        {
          id: 2,
          name: '开荒保洁'
        },
        {
          id: 3,
          name: '擦玻璃'
        },
        {
          id: 4,
          name: '除甲醛'
        }
      ]
    }
  },
  mounted() {
    // for (const obj of this.dataList) {
    //   obj.chose_status = false
    // }
  },
  methods: {
    dealItemClick(item) {
      // 属性变化，重新渲染
      // 对象增减属性，数组长度变化均会被重新渲染
      item.id = '123'
      item.chose_status = true
      for (const obj of this.dataList) {
        if (obj !== item) obj.chose_status = false
      }
      console.log(this.dataList)
    }
  }
}
</script>
