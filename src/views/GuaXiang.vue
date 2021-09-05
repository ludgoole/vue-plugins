<template>
  <div class="GuaXiang flex flex-column">
    <van-nav-bar
      :title="gua.guaMing"
      :right-text="gua.baGong"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="save"
    />
    <div class="GuaXiang-container flex-1">
      <div class="GuaXiang-daXiang">{{ gua.daXiang }}</div>
      <div class="GuaXiang-guaXiang">
        <BaseGua
          :gua-xiang="gua.guaXiang"
          :size="200"
          @change="change"
        ></BaseGua>
      </div>
      <div class="GuaXiang-guaCi">{{ gua.guaCi }}</div>
      <div class="GuaXiang-yao">
        <ul>
          <li v-for="(item, index) in gua.yaoCi" :key="index">
            <p class="GuaXiang-yaoCi">{{ item }}</p>
            <p class="GuaXiang-yaoXiang">按：{{ gua.yaoXiang[index] }}</p>
            <p class="GuaXiang-fengxian" v-if="timestamp">
              <van-field
                v-model="dangerousList[index]"
                rows="1"
                autosize
                clearable
                label="风险"
                label-width="28"
                type="textarea"
                placeholder="请输入危险源"
              />
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
import ZHOUYI from '@/mock/zhouyi'
import BaseGua from '@/components/BaseGua.vue'
export default {
  name: 'GuaXiang',
  components: {
    BaseGua
  },
  data() {
    return {
      ZHOUYI,
      gua: {},
      dangerousList: Array(6).fill('')
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
      const { timestamp, search } = this
      const mine = await localforage.getItem('MEI_HUA__mine')
      const item = mine.find(item => item.timestamp === +timestamp)

      item &&
        item[`${search}.dangerousList`] &&
        (this.dangerousList = item[`${search}.dangerousList`])
    },
    toSearch(search) {
      this.gua =
        ZHOUYI.find(gua => {
          if (Number.isNaN(+search)) {
            // 八宫-乾宫一世
            if (search.length === 4) {
              return gua.baGong === search
            } else {
              // 卦名-乾
              return gua.guaMing === search
            }
          } else {
            // 卦象-111111
            if (search.length === 6) {
              return gua.guaXiang.join('') === search
            } else {
              // 卦序-1
              return gua.guaXu === +search
            }
          }
        }) || ZHOUYI[0]
    },
    change(guaXiang) {
      this.gua = ZHOUYI.find(gua => gua.guaXiang.join('') === guaXiang)
    },
    async save() {
      const { search, dangerousList, timestamp } = this
      const mine = (await localforage.getItem('MEI_HUA__mine')) || []
      const item = mine.find(item => item.timestamp === +timestamp)
      const index = mine.findIndex(item => item.timestamp === +timestamp)

      if (!item) {
        return this.$toast({ msg: '请先保存卦例', location: 'middle' })
      } else {
        item[`${search}.dangerousList`] = dangerousList

        // 如果存过，覆盖
        // 如果没有，添加
        index > -1 ? mine.splice(index, 1, item) : mine.push(item)

        await localforage.setItem('MEI_HUA__mine', mine)

        this.$toast({ msg: '保存成功', location: 'middle' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.GuaXiang {
  &-container {
    padding: 0 20px;
    overflow-y: auto;

    & > div {
      margin-top: 20px;
      line-height: 1.5;
    }
  }

  &-guaXiang {
    text-align: center;
  }

  &-guaCi {
    font-weight: bold;
  }

  &-yao {
    li {
      margin-top: 20px;
    }

    p {
      margin-top: 4px;
      font-size: 14px;
    }
  }

  &-yaoCi {
    font-size: 16px;
  }

  &-yaoXiang {
    color: $text-color-regular;
  }

  &-fengxian {
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
}
</style>
