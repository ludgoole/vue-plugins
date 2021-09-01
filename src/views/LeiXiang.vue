<template>
  <div class="LeiXiang flex flex-column">
    <van-nav-bar
      :title="gua.name"
      :right-text="gua.wuxing"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="save"
    />
    <div class="LeiXiang-container flex-1">
      <div class="LeiXiang-leiXiang">
        <BaseGua
          :gua-xiang="gua.guaXiang"
          :size="200"
          @change="change"
        ></BaseGua>
      </div>
      <div class="LeiXiang-xiang">
        <van-field
          v-model="dangerous"
          rows="1"
          autosize
          clearable
          label="征兆"
          label-width="28"
          type="textarea"
          placeholder="请输入征兆"
        />
        <ul>
          <li v-for="xiang in gua.leixiang" :key="xiang.order">
            <span>{{ xiang.key }}:</span>
            {{ xiang.value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
import BAGUA from '@/mock/bagua'
import BaseGua from '@/components/BaseGua.vue'
export default {
  name: 'LeiXiang',
  components: {
    BaseGua
  },
  data() {
    return {
      BAGUA,
      gua: {},
      dangerous: ''
    }
  },
  computed: {
    search() {
      return this.$route.query.search
    },
    timestamp() {
      return this.$route.query.timestamp
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.toSearch(this.search)
      this.setDangerousList()
    },
    async setDangerousList() {
      const { timestamp } = this
      const mine = await localforage.getItem('MEI_HUA__mine')
      const item = mine.find(item => item.timestamp === +timestamp)

      item && (this.dangerous = item.dangerous)
    },
    toSearch(search) {
      this.gua =
        BAGUA.find(gua => {
          if (Number.isNaN(+search)) {
            return gua.name === search
          } else {
            if (search.length === 3) {
              return gua.guaXiang.join('') === search
            } else {
              return gua.order === +search
            }
          }
        }) || BAGUA[0]
    },
    change(guaXiang) {
      this.gua = BAGUA.find(gua => gua.guaXiang.join('') === guaXiang)
    },
    async save() {
      const { dangerous, timestamp } = this
      const mine = await localforage.getItem('MEI_HUA__mine')
      const item = mine.find(item => item.timestamp === +timestamp)
      const index = mine.findIndex(item => item.timestamp === +timestamp)
      item.dangerous = dangerous

      // 如果存过，覆盖
      // 如果没有，添加
      index > -1 ? mine.splice(index, 1, item) : mine.push(item)

      await localforage.setItem('MEI_HUA__mine', mine)

      this.$toast({ msg: '保存成功', location: 'middle' })
      console.log('mine', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.LeiXiang {
  &-container {
    padding: 0 20px;
    overflow-y: auto;

    & > div {
      margin-top: 20px;
      line-height: 1.5;
    }
  }

  &-leiXiang {
    text-align: center;
  }

  &-guaCi {
    font-weight: bold;
  }

  &-yaoCi {
    margin-top: 10px;
    font-size: 16px;
  }

  &-yaoXiang {
    color: $text-color-regular;
    font-size: 14px;
    // font-style: italic;
  }

  /deep/ .van-field {
    padding: 0;

    &__label {
      color: $color-danger;
    }

    &__control {
      color: $color-danger;
    }
  }
}
</style>
