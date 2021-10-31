<template>
  <div class="Calendar mt-20">
    <van-search
      v-if="isShowSearsh"
      v-model="value"
      show-action
      placeholder="2020-02-02 12:00:00"
      v-click-outside="onClickOutside"
      @focus="onFocus"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch(value)">搜索</div>
      </template>
    </van-search>
    <p v-else class="Calendar-date-time" @click="isShowSearsh = true">
      <span>
        {{ moment.format('YYYY-MM-DD') }}
        <van-icon name="edit" />
      </span>
    </p>
    <p class="Calendar-day mt-20">
      <van-tag type="primary" size="large" @click="onSearch(dateTime)">{{
        moment.format('DD')
      }}</van-tag>
    </p>
    <div class="Calendar-full-time mt-20">
      <p class="mt-10">
        {{ lunar.getMonthInChinese() }}月 {{ lunar.getDayInChinese() }}
      </p>
      <p class="mt-10 color-secondary">
        <span> {{ lunar.getYearInGanZhi() }}年 </span>
        <span> {{ lunar.getYearShengXiaoByLiChun() }}年 </span>
        <span> {{ taiSui.year }}年 </span>
      </p>
      <p class="mt-10 color-secondary">
        <span>
          {{ lunar.getMonthInGanZhi() }}月 {{ lunar.getDayInGanZhi() }}日
          {{ lunar.getTimeInGanZhi() }}时
        </span>
      </p>
    </div>
    <div class="Calendar-yi flex mt-20">
      <van-tag type="success" size="large">宜</van-tag>
      <p class="flex flex-1 flex-wrap">
        <span
          v-for="(item, index) in lunar.getDayYi()"
          :key="index"
          class="flex-1-of-4"
          >{{ item }}</span
        >
      </p>
    </div>
    <div class="Calendar-ji flex mt-20">
      <van-tag type="danger" size="large">忌</van-tag>
      <p class="flex flex-1 flex-wrap">
        <span
          v-for="(item, index) in lunar.getDayJi()"
          :key="index"
          class="flex-1-of-4"
          >{{ item }}</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import { Lunar } from 'lunar-javascript'
import moment from 'moment'
import { directive as clickOutside } from 'v-click-outside'
import DIZHI from '@/mock/dizhi'

export default {
  name: 'Calendar',
  directives: {
    clickOutside
  },
  data() {
    return {
      moment: {},
      lunar: {},
      value: '',
      oldValue: '',
      isShowSearsh: false
    }
  },
  computed: {
    timestamp() {
      return +this.$route.query.timestamp
    },
    dateTime() {
      return moment(this.timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    taiSui() {
      return DIZHI.find(
        dizhi => dizhi.name === this.lunar.getYearInGanZhi().slice(-1)
      )
    }
  },
  created() {
    this.moment = moment(this.timestamp)
    this.value = this.moment.format('YYYY-MM-DD HH:mm:ss')
    this.oldValue = this.value
    this.lunar = Lunar.fromDate(new Date(this.value))
  },
  methods: {
    onFocus() {
      this.oldValue = this.value
    },
    onSearch(value) {
      this.value = value
      this.moment = moment(new Date(this.value))
      this.lunar = Lunar.fromDate(new Date(this.value))
      this.isShowSearsh = false
    },
    onClickOutside() {
      this.onSearch(this.oldValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.Calendar {
  padding: 0 20px;
  text-align: center;

  .mt-10 {
    margin-top: 10px;
  }

  .mt-20 {
    margin-top: 20px;
  }

  .color-secondary {
    color: $text-color-secondary;
  }

  &-date-time {
    font-weight: 500;
    font-size: 24px;
  }

  &-day {
    /deep/ .van-tag {
      display: inline-block;
      width: 100px;
      font-size: 40px;
      line-height: 100px;
      text-align: center;
      border-radius: 20px;
    }
  }
}
</style>
