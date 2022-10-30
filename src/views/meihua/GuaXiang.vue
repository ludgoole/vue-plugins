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
      <div class="GuaXiang-daXiang">
        <p>{{ gua.daXiang }}</p>
        <p class="font-size-10">{{ gua.yiXiang }}</p>
      </div>
      <div
        class="GuaXiang-guaXiang"
        v-touch
        @swipeLeft="next"
        @swipeRight="prev"
      >
        <BaseGua
          :gua-xiang="gua.guaXiang"
          :na-jia="gua.naJia"
          :shi-ying="gua.shiYing"
          :size="160"
          @change="change"
        ></BaseGua>
      </div>
      <div class="GuaXiang-leixiang font-size-10" @click="toGame">
        {{ gua.leiXiang }}
      </div>
      <div class="GuaXiang-guaCi">{{ gua.guaCi }}</div>
      <div class="GuaXiang-yao">
        <ul>
          <li v-for="(item, index) in gua.yaoCi" :key="index">
            <p class="GuaXiang-yaoCi text-bold">{{ item }}</p>
            <p class="GuaXiang-yaoXiang">按：{{ gua.yaoXiang[index] }}</p>
            <p class="GuaXiang-yaoXiang" @click="toYiLi(item, gua.yiLi[index])">
              析：{{ gua.yiLi[index].how }}
            </p>
            <p class="GuaXiang-fengxian" v-if="$route.query.timestamp">
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
            <p class="GuaXiang-note" v-else>
              <van-field
                v-model="dangerousList[index]"
                rows="1"
                autosize
                clearable
                label="笔记"
                label-width="28"
                type="textarea"
                placeholder="请输入笔记"
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
    BaseGua,
  },
  data() {
    return {
      ZHOUYI,
      gua: {},
      dangerousList: Array(6).fill(''),
    }
  },
  computed: {
    search() {
      return this.$route.query.search
    },
    timestamp() {
      return this.$route.query.timestamp || this.gua.guaXu
    },
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
      const mine = (await localforage.getItem('MEI_HUA__mine')) || []
      const item = mine.find((item) => item.timestamp === +timestamp)

      item &&
        item[`${search}.dangerousList`] &&
        (this.dangerousList = item[`${search}.dangerousList`])
    },
    toSearch(search) {
      this.gua =
        ZHOUYI.find((gua) => {
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
    toGame() {
      this.$router.push({
        path: '/game',
        query: {
          guaXu: this.gua.guaXu,
        },
      })
    },
    toYiLi(yaoCi, yiLi) {
      this.$router.push({
        path: '/yili',
        query: {
          yaoCi,
          yiLi: JSON.stringify(yiLi),
        },
      })
    },
    change(guaXiang) {
      this.gua = ZHOUYI.find((gua) => gua.guaXiang.join('') === guaXiang)
    },
    prev(e) {
      const guaXu = this.gua.guaXu === 1 ? 64 : this.gua.guaXu - 1
      this.gua = ZHOUYI.find((gua) => gua.guaXu === guaXu)
    },
    next(e) {
      const guaXu = this.gua.guaXu === 64 ? 1 : this.gua.guaXu + 1
      this.gua = ZHOUYI.find((gua) => gua.guaXu === guaXu)
    },
    async save() {
      const { search, dangerousList, timestamp } = this
      const mine = (await localforage.getItem('MEI_HUA__mine')) || []
      const item = mine.find((item) => item.timestamp === +timestamp) || {}
      const index = mine.findIndex((item) => item.timestamp === +timestamp)

      if (this.$route.query.timestamp) {
        if (!item) {
          if (timestamp) {
            return this.$toast({ msg: '请先保存卦例', location: 'middle' })
          } else {
            let baGongOrder = this.gua.baGongOrder + 1
            baGongOrder % 10 >= 8 && (baGongOrder = baGongOrder - 8)
            this.gua = ZHOUYI.find((gua) => gua.baGongOrder === baGongOrder)
          }
        } else {
          item[`${search}.dangerousList`] = dangerousList

          // 如果存过，覆盖
          // 如果没有，添加
          index > -1 ? mine.splice(index, 1, item) : mine.push(item)

          await localforage.setItem('MEI_HUA__mine', mine)

          this.$toast({ msg: '保存成功', location: 'middle' })
        }
      } else {
        // 增加笔记
        item.timestamp = timestamp
        item[`${search}.dangerousList`] = dangerousList

        // 如果存过，覆盖
        // 如果没有，添加
        index > -1 ? mine.splice(index, 1, item) : mine.push(item)

        await localforage.setItem('MEI_HUA__mine', mine)

        this.$toast({ msg: '保存成功', location: 'middle' })
      }
    },
  },
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

  &-note {
    /deep/ .van-field {
      padding: 0;

      &__label {
        color: $color-primary;
      }

      &__control {
        color: $color-primary;
      }
    }
  }
}
</style>
