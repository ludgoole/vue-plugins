<template>
  <div class="Answer flex flex-column">
    <van-nav-bar
      :title="question"
      right-text="保存"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="save"
    />
    <div class="Answer-container flex-1">
      <template>
        <div class="Answer-time">
          <p @click="toCalendar">
            时间：<span>{{ dateTime }} </span>
            <span>(老黄历)</span>
          </p>
          <p @click="toCompass">
            旧历：
            <span> {{ lunar.toString() }}{{ lunar.getTimeZhi() }}时 </span>
            <span>(罗盘)</span>
          </p>
          <p @click="toGuaQi">
            太岁：
            <span>{{ lunar.getYearShengXiao() }}年 属{{ taiSui.wuxing }} </span>
            <span>{{ getJiXiong(tiGua.wuxing, taiSui.wuxing).action }} </span>
            <span>{{ getJiXiong(tiGua.wuxing, taiSui.wuxing).liuqin }} </span>
            <span>(流年)</span>
          </p>
          <p>
            月建：
            <span>{{ lunar.getMonthZhi() }}月 属{{ yueJian.wuxing }} </span>
            <span>{{ getJiXiong(tiGua.wuxing, yueJian.wuxing).action }} </span>
            <span>{{ getJiXiong(tiGua.wuxing, yueJian.wuxing).liuqin }}</span>
          </p>
          <p>
            日辰：
            <span>{{ lunar.getDayZhi() }}日 属{{ riChen.wuxing }} </span>
            <span>{{ getJiXiong(tiGua.wuxing, riChen.wuxing).action }} </span>
            <span>{{ getJiXiong(tiGua.wuxing, riChen.wuxing).liuqin }}</span>
          </p>
        </div>
      </template>
      <template>
        <div class="Answer-chenggua flex flex-justify flex-bottom">
          <BaseGua
            :gua-xiang="benGua.guaXiang"
            :size="40"
            :dong-yao-order="dongYao.order"
            @click="toGuaXiang"
          ></BaseGua>
          <BaseGua
            :gua-xiang="dongYao.guaXiang"
            :size="40"
            @click="toLeiXiang"
          ></BaseGua>
          <BaseGua
            :gua-xiang="bianGua.guaXiang"
            :size="40"
            @click="toGuaXiang"
          ></BaseGua>
        </div>
        <p class="Answer-zhigua text-center">
          {{ benGua.guaMing }}之{{ bianGua.guaMing }}
        </p>
      </template>
      <template>
        <p class="Answer-tiyong flex flex-justify text-center">
          <span>体卦</span>
          <span>用卦</span>
          <span>互卦</span>
          <span>互卦</span>
          <span>变卦</span>
        </p>
        <div class="Answer-bagua flex flex-justify flex-bottom">
          <BaseGua
            :gua-xiang="tiGua.guaXiang"
            :size="44"
            @click="toLeiXiang"
          ></BaseGua>
          <BaseGua
            :gua-xiang="yongGua.guaXiang"
            :size="44"
            @click="toLeiXiang"
          ></BaseGua>
          <BaseGua
            :gua-xiang="shangHuGua.guaXiang"
            :size="44"
            @click="toLeiXiang"
          ></BaseGua>
          <BaseGua
            :gua-xiang="xiaHuGua.guaXiang"
            :size="44"
            @click="toLeiXiang"
          ></BaseGua>
          <BaseGua
            :gua-xiang="bianYongGua.guaXiang"
            :size="44"
            @click="toLeiXiang"
          ></BaseGua>
        </div>
        <p class="Answer-leixiang flex flex-justify text-center">
          <span>{{ tiGua.name }}</span>
          <span>{{ yongGua.name }}</span>
          <span>{{ shangHuGua.name }}</span>
          <span>{{ xiaHuGua.name }}</span>
          <span>{{ bianYongGua.name }}</span>
        </p>
        <p class="Answer-liuqin flex flex-justify text-center">
          <span>自己</span>
          <span>{{ getJiXiong(tiGua.wuxing, yongGua.wuxing).liuqin }}</span>
          <span>{{ getJiXiong(tiGua.wuxing, shangHuGua.wuxing).liuqin }}</span>
          <span>{{ getJiXiong(tiGua.wuxing, xiaHuGua.wuxing).liuqin }}</span>
          <span>{{ getJiXiong(tiGua.wuxing, bianYongGua.wuxing).liuqin }}</span>
        </p>
        <p class="Answer-wuxing flex flex-justify text-center">
          <span>{{ tiGua.wuxing }}</span>
          <span>{{ yongGua.wuxing }}</span>
          <span>{{ shangHuGua.wuxing }}</span>
          <span>{{ xiaHuGua.wuxing }}</span>
          <span>{{ bianYongGua.wuxing }}</span>
        </p>
        <p class="Answer-shengke flex flex-justify text-center">
          <span>{{ getJiXiong(tiGua.wuxing, riChen.wuxing).affect }} </span>
          <span>{{ getRelation(tiGua.wuxing, yongGua.wuxing) }}</span>
          <span>{{ getRelation(tiGua.wuxing, shangHuGua.wuxing) }}</span>
          <span>{{ getRelation(tiGua.wuxing, xiaHuGua.wuxing) }}</span>
          <span>{{ getRelation(tiGua.wuxing, bianYongGua.wuxing) }}</span>
        </p>
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item title="断卦" name="0">
            <p class="text-justify" v-html="jianYu"></p>
          </van-collapse-item>
          <van-collapse-item title="吉凶" name="1">
            <p>流年，{{ liuNian }}</p>
            <p>近来，{{ jixiong }}</p>
          </van-collapse-item>
          <van-collapse-item title="细节" name="2">
            <van-tabs v-model="active">
              <van-tab v-for="tab in tabs" :key="tab" :title="tab">
                <ul>
                  <li v-for="xiang in getLeiXiang(tab)" :key="xiang.key">
                    <span>{{ xiang.key }}:</span>
                    {{ xiang.value }}
                  </li>
                </ul>
              </van-tab>
            </van-tabs>
          </van-collapse-item>
          <van-collapse-item title="应期" name="3">
            <p>时辰：{{ today }}</p>
            <p>
              天数：
              <span>{{
                dongYaoCount > -1
                  ? dongYaoCount
                  : tiGua.order + yongGua.order + riChen.order
              }}</span>
              | <span>{{ dongYao.order }}</span> |
              <span>{{ tiGua.order + bianYongGua.order }}</span> |
              <span>{{ `${tiGua.order}${bianYongGua.order}` }}</span> |
              <span>{{ `${bianYongGua.order}${tiGua.order}` }}</span>
            </p>
          </van-collapse-item>
          <van-collapse-item title="感悟" name="4">
            <van-field
              v-model="ganwu"
              rows="1"
              autosize
              label=""
              type="textarea"
              placeholder="写点什么吧"
            />
          </van-collapse-item>
        </van-collapse>
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import components from '@/components'
import moment from 'moment'
import { Lunar } from 'lunar-javascript'
import _ from 'lodash'
import localforage from 'localforage'
import DIZHI from '@/mock/dizhi'
import BAGUA from '@/mock/bagua'
import ZHOUYI from '@/mock/zhouyi'
import WUXING from '@/mock/wuxing'
import JIXIONG from '@/mock/jixiong'
import BaseGua from '@/components/BaseGua.vue'
export default {
  name: 'Home',
  components: {
    BaseGua
  },
  data() {
    return {
      activeName: '0',
      active: 0,
      ganwu: ''
    }
  },
  mounted() {
    this.ganwu = this.query.ganwu || ''
  },
  computed: {
    query() {
      return this.$route.query
    },
    question() {
      return this.query.question || '今日动静如何？'
    },
    shangGuaCount() {
      return this.query.shangGuaCount || 1
    },
    xiaGuaCount() {
      return this.query.xiaGuaCount || 1
    },
    dongYaoCount() {
      return this.query.dongYaoCount || -1
    },
    timestamp() {
      return (
        Number(this.query.timestamp) ||
        +new Date(this.query.dateTime) ||
        Date.now()
      )
    },
    lunar() {
      return Lunar.fromDate(new Date(this.timestamp))
    },
    dateTime() {
      return moment(this.timestamp).format('YYYY年MM月DD日HH时mm分')
    },
    taiSui() {
      return DIZHI.find(
        dizhi => dizhi.name === this.lunar.getYearInGanZhi().slice(-1)
      )
    },
    yueJian() {
      return DIZHI.find(
        dizhi => dizhi.name === this.lunar.getMonthInGanZhi().slice(-1)
      )
    },
    riChen() {
      return DIZHI.find(
        dizhi => dizhi.name === this.lunar.getDayInGanZhi().slice(-1)
      )
    },
    shangGua() {
      const order = this.shangGuaCount % 8
      return BAGUA[order === 0 ? 7 : order - 1]
    },
    xiaGua() {
      const order = this.xiaGuaCount % 8
      return BAGUA[order === 0 ? 7 : order - 1]
    },
    dongYao() {
      const { dongYaoCount, shangGuaCount, xiaGuaCount, riChen } = this
      const order =
        dongYaoCount > -1
          ? dongYaoCount % 6
          : (shangGuaCount + xiaGuaCount + riChen.order) % 6

      return BAGUA[order === 0 ? 5 : order - 1]
    },
    benGua() {
      const guaXiang = [...this.shangGua.guaXiang, ...this.xiaGua.guaXiang]
      return ZHOUYI.find(gua => gua.guaXiang.join() === guaXiang.join())
    },
    huGua() {
      const guaXiang = [
        ...this.shangGua.guaXiang.slice(1),
        ...this.xiaGua.guaXiang.slice(0, 1),
        ...this.shangGua.guaXiang.slice(-1),
        ...this.xiaGua.guaXiang.slice(0, 2)
      ]
      return ZHOUYI.find(gua => gua.guaXiang.join() === guaXiang.join())
    },
    bianGua() {
      const order = this.dongYao.order === 0 ? 6 : this.dongYao.order
      const guaXiang = _.cloneDeep(this.benGua.guaXiang)
      guaXiang[6 - order] = guaXiang[6 - order] === 0 ? 1 : 0

      return ZHOUYI.find(gua => gua.guaXiang.join() === guaXiang.join())
    },
    tiGua() {
      return this.dongYao.order > 3 ? this.xiaGua : this.shangGua
    },
    yongGua() {
      return this.dongYao.order > 3 ? this.shangGua : this.xiaGua
    },
    shangHuGua() {
      return BAGUA.find(
        gua => gua.guaXiang.join() === this.huGua.guaXiang.slice(0, 3).join()
      )
    },
    xiaHuGua() {
      return BAGUA.find(
        gua => gua.guaXiang.join() === this.huGua.guaXiang.slice(3).join()
      )
    },
    bianYongGua() {
      let guaXiang = _.cloneDeep(this.bianGua.guaXiang)
      guaXiang =
        this.dongYao.order > 3 ? guaXiang.slice(0, 3) : guaXiang.slice(3)
      return BAGUA.find(gua => gua.guaXiang.join() === guaXiang.join())
    },
    jianYu() {
      const { benGua, dongYao } = this
      const yaoCi = benGua.yaoCi[dongYao.order - 1]
      return this.query.jianyu || yaoCi.split('：')[1].slice(0, -1)
    },
    liuNian() {
      const { tiGua, taiSui, getJiXiong } = this
      const affect = getJiXiong(tiGua.wuxing, taiSui.wuxing).affect
      const jixiong = JIXIONG.find(jixiong => jixiong.forture === affect)
      return jixiong.detail
    },
    jixiong() {
      const {
        tiGua,
        yongGua,
        shangHuGua,
        xiaHuGua,
        bianYongGua,
        getRelation
      } = this
      const fortures = [yongGua, shangHuGua, xiaHuGua, bianYongGua].map(gua =>
        getRelation(tiGua.wuxing, gua.wuxing)
      )
      const bads = fortures.filter(forture => forture === '凶')
      const jixiong = JIXIONG[bads.length]

      return jixiong.detail
    },
    today() {
      const xiang = this.dongYao.leixiang.find(xiang => xiang.key === '时辰')
      return xiang.ext
    },
    tabs() {
      const { tiGua, yongGua, shangHuGua, xiaHuGua, bianYongGua } = this
      return [
        ...new Set([
          tiGua.name,
          yongGua.name,
          shangHuGua.name,
          xiaHuGua.name,
          bianYongGua.name
        ])
      ]
    }
  },
  methods: {
    getJiXiong(ti, yong) {
      const wuxing = WUXING.find(wuxing => wuxing.name === ti)
      const jixiong = wuxing.relation.find(jixiong => jixiong.name === yong)
      return jixiong
    },
    getRelation(ti, yong) {
      return this.getJiXiong(ti, yong).fortune
    },
    getLeiXiang(name) {
      return BAGUA.find(gua => gua.name === name).leixiang
    },
    async save() {
      const {
        question,
        shangGuaCount,
        xiaGuaCount,
        dongYaoCount,
        tiGua,
        yongGua,
        riChen,
        benGua,
        bianGua,
        timestamp,
        ganwu
      } = this
      const answer = {
        question,
        shangGuaCount,
        xiaGuaCount,
        dongYaoCount:
          dongYaoCount > -1
            ? dongYaoCount
            : tiGua.order + yongGua.order + riChen.order,
        zhigua: `${benGua.guaMing}之${bianGua.guaMing}`,
        timestamp,
        ganwu
      }
      const mine = (await localforage.getItem('MEI_HUA__mine')) || []
      const currAnswerIndex = mine.findIndex(
        answer => answer.timestamp === +this.timestamp
      )

      // 如果存过，覆盖
      // 如果没有，添加
      currAnswerIndex > -1
        ? mine.splice(currAnswerIndex, 1, answer)
        : mine.push(answer)

      localforage
        .setItem('MEI_HUA__mine', mine)
        .then(mine => this.$toast({ msg: '保存成功', location: 'middle' }))
    },
    toCalendar() {
      this.$router.push({
        path: '/calendar',
        query: {
          timestamp: this.timestamp
        }
      })
    },
    toCompass() {
      this.$router.push({
        path: '/compass',
        query: {
          timestamp: this.timestamp
        }
      })
    },
    toGuaQi() {
      this.$router.push({
        path: '/guaQi',
        query: {
          timestamp: this.timestamp,
          ti: this.tiGua.wuxing
        }
      })
    },
    toGuaXiang(search) {
      this.$router.push({
        path: '/guaXiang',
        query: {
          search,
          timestamp: this.timestamp,
          dateTime: this.dateTime
        }
      })
    },
    toLeiXiang(search) {
      this.$router.push({
        path: '/leiXiang',
        query: {
          search,
          timestamp: this.timestamp
        }
      })
    }
  }
}
</script>
<style lang="scss">
.Answer {
  &-container {
    padding: 0 20px;
    overflow-y: auto;
  }

  &-time {
    font-weight: bold;

    p {
      margin: 10px 0;
    }

    span {
      font-weight: normal;
    }
  }

  &-chenggua {
    width: 150px;
    margin: 40px auto 0;
  }

  &-zhigua {
    margin: 10px 0 20px 0;
  }

  &-tiyong {
    margin: 10px 0 0;

    span {
      width: 44px;
    }
  }

  &-leixiang {
    margin: 10px 0;

    span {
      width: 44px;
    }
  }

  &-liuqin {
    font-size: 10px;

    span {
      width: 44px;
    }
  }

  &-wuxing {
    margin: 10px 0;

    span {
      width: 44px;
    }
  }

  &-shengke {
    span {
      width: 44px;
    }
  }

  .van-collapse {
    margin-top: 40px;

    .van-cell__title {
      font-weight: bold;
      font-size: 16px;
    }

    &-item__content {
      color: #666;
      font-size: 16px;

      .van-cell {
        padding: 0;
      }
    }
  }

  .van-tab__pane {
    margin-top: 10px;
    color: #666;
    font-size: 14px;

    span {
      color: #333;
    }
  }
}
</style>
