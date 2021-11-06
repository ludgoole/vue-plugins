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
    <div class="GuaQi-yun-cheng">
      <VeLine
        color="#7232dd"
        :title="`运程(一生)`"
        :xAxisData="lifes"
        :data="yunChengs"
        :markLine="yunCheng"
        :areaStyle="true"
        @click="lifesClick"
      ></VeLine>
    </div>
    <div class="GuaQi-yun-cheng">
      <VeBar
        :color="colors[status]"
        :title="`${age}岁(${status})`"
        :xAxisData="ages"
        :data="tenYears"
      ></VeBar>
    </div>

    <div class="GuaQi-liu-nian">
      <VeLine
        color="#F56C6C"
        :title="`流年(${year}年)`"
        :xAxisData="years"
        :data="liuNians"
        :markLine="liuNian"
        @click="val => (year = val)"
      ></VeLine>
    </div>

    <div class="GuaQi-liu-yue">
      <VeLine
        color="#E6A23C"
        :title="`流月(${month}月)`"
        :xAxisData="months"
        :data="liuYues"
        :markLine="liuYue"
        @click="val => (month = val)"
      ></VeLine>
    </div>

    <div class="GuaQi-liu-ri">
      <VeLine
        color="#67C23A"
        :title="`流日(${day}日)`"
        :xAxisData="days"
        :data="liuRis"
        :markLine="liuRi"
        @click="val => (day = val)"
      ></VeLine>
    </div>

    <div class="GuaQi-liu-shi">
      <VeLine
        color="#409EFF"
        :title="`流时(${hour}时)`"
        :xAxisData="hours"
        :data="liuShis"
        :markLine="liuShi"
        @click="val => (hour = val)"
      ></VeLine>
    </div>
  </div>
</template>

<script>
import WUXING from '@/mock/wuxing'
import DIZHI from '@/mock/dizhi'
import ZHOUYI from '@/mock/zhouyi'
import { Lunar } from 'lunar-javascript'
import moment from 'moment'
import VeLine from '@/components/VeLine.vue'
import VeBar from '@/components/VeBar.vue'

export default {
  name: 'GuaQi',
  components: {
    VeLine,
    VeBar
  },
  data() {
    return {
      wuxing: ['木', '土', '金'],
      colors: {
        旺: '#91cc75',
        相: '#73c0de',
        休: '#fac858',
        囚: '#5470c6',
        死: '#ee6666'
      },
      status: '旺',
      ti: '金',
      year: 2021,
      age: 10,
      minYear: 2000,
      maxYear: 2030,
      month: 9,
      minMonth: 1,
      maxMonth: 12,
      day: 25,
      minDay: 1,
      maxDay: 31,
      hour: 22,
      minHour: 0,
      maxHour: 23
    }
  },
  computed: {
    date() {
      return moment(+this.$route.query.timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    lifes() {
      // return [
      //   '10-19',
      //   '20-29',
      //   '30-39',
      //   '40-49',
      //   '50-59',
      //   '60-69',
      //   '70-79',
      //   '80-89',
      //   '90-99'
      // ]
      return ['15', '25', '35', '45', '55', '65', '75', '85', '95']
    },
    ages() {
      return Array(10)
        .fill(1)
        .map((v, i) => i + this.age)
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
    yunChengs() {
      const wuxings = ['金', '金', '火', '木', '木', '水', '土', '土', '金']

      return wuxings.map(wuxing => this.getJiXiongAction(this.ti, wuxing))
    },
    tenYears() {
      const baGuas = [
        '',
        '111',
        '011',
        '101',
        '001',
        '110',
        '010',
        '100',
        '000'
      ]
      const wuxings = [
        '土',
        '金',
        '金',
        '火',
        '木',
        '木',
        '水',
        '土',
        '土',
        '金'
      ]
      const guaMings = this.ages.map(age => {
        const shi = Math.floor(age / 10) % 8
        const ge = (age % 10) % 8
        const shangGuaOrder = shi === 0 ? 8 : shi
        const xiaGuaOrder = ge === 0 ? 8 : ge
        return ZHOUYI.find(
          gua =>
            gua.guaXiang.join('') ===
            baGuas[shangGuaOrder] + baGuas[xiaGuaOrder]
        ).guaMing
      })

      return wuxings.map((wuxing, i) => {
        return {
          value: this.getJiXiongScore(this.ti, wuxing),
          guaMing: guaMings[i]
        }
      })
    },
    liuNians() {
      return this.years
        .map(year => {
          return Lunar.fromDate(
            new Date(this.date.replace(/\d{4}-(.*)/, `${year}-$1`))
          )
        })
        .map(lunar => {
          const dizhi = DIZHI.find(
            dizhi => dizhi.name === lunar.getYearInGanZhi().slice(-1)
          )

          return this.getJiXiongAction(this.ti, dizhi.wuxing)
        })
    },
    liuYues() {
      return this.months
        .map(month => {
          return Lunar.fromDate(
            new Date(this.date.replace(/(\d{4})-\d{2}-(.*)/, `$1-${month}-$2`))
          )
        })
        .map(lunar => {
          const dizhi = DIZHI.find(
            dizhi => dizhi.name === lunar.getMonthInGanZhi().slice(-1)
          )
          return this.getJiXiongAction(this.ti, dizhi.wuxing)
        })
    },
    liuRis() {
      return this.days
        .map(day => {
          return Lunar.fromDate(
            new Date(
              this.date.replace(/(\d{4}-\d{2})-\d{2} (.*)/, `$1-${day} $2`)
            )
          )
        })
        .map(lunar => {
          const dizhi = DIZHI.find(
            dizhi => dizhi.name === lunar.getDayInGanZhi().slice(-1)
          )

          return this.getJiXiongAction(this.ti, dizhi.wuxing)
        })
    },
    liuShis() {
      return this.hours
        .map(hour => {
          return Lunar.fromDate(
            new Date(this.date.replace(/(.*) \d{2}:(.*)/, `$1 ${hour}:$2`))
          )
        })
        .map(lunar => {
          const dizhi = DIZHI.find(
            dizhi => dizhi.name === lunar.getTimeInGanZhi().slice(-1)
          )

          return this.getJiXiongAction(this.ti, dizhi.wuxing)
        })
    },
    yunCheng() {
      // 30岁
      return this.liuNians[2]
    },
    liuNian() {
      const index = this.years.findIndex(year => year === this.year * 1)
      return this.liuNians[index]
    },
    liuYue() {
      const index = this.months.findIndex(month => month === Number(this.month))
      return this.liuYues[index]
    },
    liuRi() {
      const index = this.days.findIndex(day => day === Number(this.day))
      return this.liuRis[index]
    },
    liuShi() {
      const index = this.hours.findIndex(hour => hour === Number(this.hour))
      return this.liuShis[index]
    }
  },
  created() {
    ;[this.year, this.month, this.day] = this.date.split(' ')[0].split('-')
    this.hour = this.date.split(' ')[1].split(':')[0]

    this.ti = this.$route.query.ti || '金'
  },
  methods: {
    lifesClick(val, status) {
      this.age = val - 5
      this.status = status
    },
    getArray(min, max) {
      return Array(max - min + 1)
        .fill(1)
        .map((v, i) => min + i)
    },
    getJiXiongAction(ti, yong) {
      const wuxing = WUXING.find(wuxing => wuxing.name === ti)
      const jixiong = wuxing.relation.find(jixiong => jixiong.name === yong)
      return jixiong.action
    },
    getJiXiongScore(ti, yong) {
      const wuxing = WUXING.find(wuxing => wuxing.name === ti)
      const jixiong = wuxing.relation.find(jixiong => jixiong.name === yong)
      return jixiong.score
    }
  }
}
</script>

<style lang="scss" scoped>
.GuaQi {
  text-align: center;
}
</style>
