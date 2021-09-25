<template>
  <div class="GuaQi">
    <div class="GuaQi-header">
      <van-button :plain="'火' !== ti" color="#7232dd" @click="ti = '火'"
        >火</van-button
      >
      <p>
        <van-button
          color="#7232dd"
          :plain="item !== ti"
          v-for="(item, index) in wuxing"
          :key="index"
          @click="ti = item"
          >{{ item }}</van-button
        >
      </p>
      <van-button :plain="'水' !== ti" color="#7232dd" @click="ti = '水'"
        >水</van-button
      >
    </div>
    <div class="GuaQi-liu-nian">
      <VeLine
        title="流年"
        color="#F56C6C"
        :xAxisData="years"
        :data="liuNian"
      ></VeLine>
    </div>

    <div class="GuaQi-liu-yue">
      <VeLine
        title="流月"
        color="#E6A23C"
        :xAxisData="months"
        :data="liuYue"
        @click="val => (month = val)"
      ></VeLine>
      {{ month }}
    </div>

    <div class="GuaQi-liu-ri">
      <VeLine
        title="流日"
        color="#67C23A"
        :xAxisData="days"
        :data="liuRi"
      ></VeLine>
    </div>

    <div class="GuaQi-liu-shi">
      <VeLine
        title="流时"
        color="#409EFF"
        :xAxisData="hours"
        :data="liuShi"
      ></VeLine>
    </div>
  </div>
</template>

<script>
import WUXING from '@/mock/wuxing'
import DIZHI from '@/mock/dizhi'
import { Lunar } from 'lunar-javascript'
import moment from 'moment'
import VeLine from '@/components/VeLine.vue'

export default {
  name: 'GuaQi',
  components: {
    VeLine
  },
  data() {
    return {
      wuxing: ['木', '土', '金'],
      ti: '金',
      year: 2021,
      minYear: 2000,
      maxYear: 2030,
      month: 9,
      minMonth: 1,
      maxMonth: 12,
      day: 25,
      minDay: 1,
      maxDay: 30,
      minHour: 0,
      maxHour: 24
    }
  },
  computed: {
    date() {
      return moment(+this.$route.query.timestamp)
        .format('YYYY-MM-DD-HH')
        .split('-')
    },
    years() {
      return this.getArray(this.minYear, this.maxYear)
    },
    months() {
      return this.getArray(this.minMonth, this.maxMonth)
    },
    days() {
      return this.getArray(this.minDay, this.maxDay)
    },
    hours() {
      return this.getArray(this.minHour, this.maxHour)
    },
    liuNian() {
      return this.years
        .map(year => Lunar.fromDate(new Date(year, '01', '01')))
        .map(lunar => {
          const dizhi = DIZHI.find(
            dizhi => dizhi.name === lunar.getYearInGanZhi().slice(-1)
          )

          return this.getJiXiongAction(this.ti, dizhi.wuxing)
        })
    },
    liuYue() {
      return this.months
        .map(month => Lunar.fromDate(new Date(this.year, month, '01')))
        .map(lunar => {
          const dizhi = DIZHI.find(
            dizhi => dizhi.name === lunar.getMonthInGanZhi().slice(-1)
          )

          return this.getJiXiongAction(this.ti, dizhi.wuxing)
        })
    },
    liuRi() {
      return this.days
        .map(day => Lunar.fromDate(new Date(this.year, this.month, day)))
        .map(lunar => {
          const dizhi = DIZHI.find(
            dizhi => dizhi.name === lunar.getDayInGanZhi().slice(-1)
          )

          return this.getJiXiongAction(this.ti, dizhi.wuxing)
        })
    },
    liuShi() {
      return this.hours
        .map(hour =>
          Lunar.fromDate(new Date(this.year, this.month, this.day, hour))
        )
        .map(lunar => {
          const dizhi = DIZHI.find(
            dizhi => dizhi.name === lunar.getTimeInGanZhi().slice(-1)
          )

          return this.getJiXiongAction(this.ti, dizhi.wuxing)
        })
    }
  },
  mounted() {
    ;[this.year, this.month, this.day, this.hour] = this.date

    this.ti = this.$route.query.ti || '金'
  },
  methods: {
    getArray(min, max) {
      return Array(max - min + 1)
        .fill(1)
        .map((v, i) => min + i)
    },
    getJiXiongAction(ti, yong) {
      const wuxing = WUXING.find(wuxing => wuxing.name === ti)
      const jixiong = wuxing.relation.find(jixiong => jixiong.name === yong)
      return jixiong.action
    }
  }
}
</script>

<style lang="scss" scoped>
.GuaQi {
  text-align: center;
}
</style>
