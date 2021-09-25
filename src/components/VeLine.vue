<template>
  <div class="VeLine"></div>
</template>

<script>
// import * as echarts from 'echarts'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  // TooltipComponent,
  GridComponent
  // DatasetComponent,
  // DatasetComponentOption,
  // TransformComponent
} from 'echarts/components'

echarts.use([LineChart, CanvasRenderer, TitleComponent, GridComponent])

export default {
  name: 'VeLine',
  props: {
    color: {
      value: String,
      default: '#F56C6C'
    },
    title: {
      value: String,
      default: ''
    },
    xAxisData: {
      value: Array,
      default: []
    },
    data: {
      value: Array,
      default: []
    }
  },
  computed: {
    options() {
      return {
        color: this.color,
        title: {
          text: this.title,
          padding: [30, 0, 0, 10]
        },
        xAxis: {
          type: 'category',
          data: this.xAxisData
        },
        yAxis: {
          type: 'category',
          data: ['旺', '相', '休', '囚', '死'].reverse()
        },
        series: [this.getSeriesItem()]
      }
    }
  },
  watch: {
    data() {
      this.myChart.setOption(this.options)
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$el)
    this.myChart.setOption(this.options)

    this.myChart.on('click', 'series.line', params => {
      this.$emit('click', params.name)
    })
  },
  methods: {
    getSeriesItem() {
      return {
        type: 'line',
        smooth: true,
        data: this.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.VeLine {
  width: 100vw;
  height: 100vw;
}
</style>
