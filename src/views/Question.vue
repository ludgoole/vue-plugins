<template>
  <div class="Question">
    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in list"
        :key="item.type"
        :icon="item.icon"
        :text="item.text"
        :class="{ active: item.type === currItem.type }"
        @click="handleClick(item)"
      />
    </van-grid>
    <div class="gap"></div>
    <van-form v-if="currItem.type" @submit="onSubmit">
      <van-field
        v-model.trim="question"
        name="question"
        label="所问何事"
        placeholder="今日动静如何？"
      />
      <van-field
        v-if="!['random', 'time'].includes(currItem.type)"
        v-model.trim="text"
        name="text"
        :label="currItem.text"
        :placeholder="currItem.ext ? currItem.ext : currItem.text"
        :rules="[{ required: true, message: `请填写${currItem.text}` }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >解卦</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment'
import _ from 'lodash'
import cnchar from 'cnchar'

export default {
  name: 'Question',
  components: {},
  data() {
    return {
      list: [
        {
          type: 'random',
          text: '随机',
          icon: 'like-o',
          ext: '随机数'
        },
        {
          type: 'time',
          text: '时间',
          icon: 'clock-o',
          ext: '当前时间'
        },
        {
          type: 'number',
          text: '数字',
          icon: 'info-o',
          ext: '13 14'
        },
        {
          type: 'character',
          text: '汉字',
          icon: 'comment-circle-o',
          ext: '一帆风顺'
        },
        {
          type: 'phone',
          text: '电话',
          icon: 'phone-circle-o',
          ext: '18672793439'
        },
        {
          type: 'car',
          text: '车牌',
          icon: 'logistics',
          ext: '鄂A8W888'
        },
        {
          type: 'id',
          text: '工号',
          icon: 'label-o',
          ext: '2018009'
        },
        {
          type: 'birthday',
          text: '生日',
          icon: 'birthday-cake-o',
          ext: '12-19'
        },
        {
          type: 'home',
          text: '房号',
          icon: 'wap-home-o',
          ext: '1-1-1101'
        }
      ],
      currItem: {},
      question: '',
      text: ''
    }
  },
  mounted() {},
  methods: {
    handleClick(item) {
      this.currItem = item
      this.text = ''
    },
    onSubmit({ question, text }) {
      const params = { question }
      switch (this.currItem.type) {
        case 'random':
          params.shangGuaCount = _.random(0, 99)
          params.xiaGuaCount = _.random(0, 99)
          break
        case 'time':
          params.shangGuaCount = moment(Date.now()).format('hh') * 1
          params.xiaGuaCount = moment(Date.now()).format('mm') * 1
          params.dongYaoCount = params.shangGuaCount + params.xiaGuaCount
          break
        case 'number':
          if (text.split(' ').length === 1) {
            params.shangGuaCount = Math.floor(text / 2)
            params.xiaGuaCount = Math.ceil(text / 2)
          } else if (text.split(' ').length === 2) {
            const [first, second] = text.split(' ')
            params.shangGuaCount = first * 1
            params.xiaGuaCount = second * 1
            params.dongYaoCount = params.shangGuaCount + params.xiaGuaCount
          } else {
            const [first, second, third, fourth] = text.split(' ')
            params.shangGuaCount = first * 1
            params.xiaGuaCount = second * 1

            if (third.length >= 4) {
              params.dongYaoCount = params.shangGuaCount + params.xiaGuaCount
              params.timestamp = +new Date(third)
            } else {
              params.dongYaoCount = third
              params.timestamp = +new Date(fourth)
            }
          }
          break
        case 'character':
          if (!text.match(/^[\u4e00-\u9fa5]+$/))
            return this.$toast({ msg: '必须为汉字', location: 'middle' })

          if (text.length === 1) {
            const bh = cnchar.stroke(text)
            params.shangGuaCount = Math.floor(bh / 2)
            params.xiaGuaCount = Math.ceil(bh / 2)
          } else {
            const len = text.length
            const half = Math.floor(len / 2)
            params.shangGuaCount = text.slice(0, half)
            params.xiaGuaCount = text.slice(half)
          }
          break
        case 'phone':
        case 'id':
          params.shangGuaCount = text.slice(-4, -2)
          params.xiaGuaCount = text.slice(-2)
          break
        case 'car':
          text = text.split('').map(c => {
            return c.charCodeAt() > 57
              ? c.toUpperCase().charCodeAt() - 55
              : c * 1
          })
          params.shangGuaCount = text.slice(-4, -2).reduce((a, c) => c + a)
          params.xiaGuaCount = text.slice(-2).reduce((a, c) => c + a)
          break
        case 'birthday':
        case 'home':
          params.shangGuaCount = text
            .split(/[-_]/g)
            .join('')
            .slice(-2, -1)
          params.xiaGuaCount = text
            .split(/[-_]/g)
            .join('')
            .slice(-1)
          break
        // default:
      }
      Object.entries(params).forEach(([key, value]) => {
        if (key.includes('Count')) {
          value = Number(value)
          params[key] = Number.isNaN(value) ? _.random(0, 99) : value
        }
      })
      this.goAnswer(params)
    },
    goAnswer(query) {
      switch (this.question) {
        case '聊天':
          this.$router.push('/chat')
          break
        case '游戏':
          this.$router.push('/game')
          break
        default:
          this.$router.push({
            path: '/answer',
            query: {
              question: this.question,
              timestamp: Date.now(),
              ...query
            }
          })
      }
    }
  }
}
</script>
<style lang="scss" scope>
.Question {
  font-size: 24px;

  .gap {
    height: 60px;
  }

  .active {
    // color: $color-primary;
    color: #409eff;
  }
}
</style>
