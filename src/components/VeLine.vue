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
  // TitleComponent,
  // TooltipComponent,
  GridComponent
  // DatasetComponent,
  // DatasetComponentOption,
  // TransformComponent
} from 'echarts/components'

echarts.use([LineChart, CanvasRenderer, GridComponent])

export default {
  name: 'VeLine',
  props: {
    direction: {
      value: Number,
      default: 1
    },
    alpha: {
      value: Number,
      default: 0
    }
  },
  computed: {
    options() {
      return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [this.getSeriesItem()]
      }
    }
  },
  watch: {
    direction() {
      this.myChart.setOption(this.options)
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$el)
    this.myChart.setOption(this.options)
  },
  methods: {
    getSeriesItem() {
      return {
        type: 'line',
        smooth: true,
        data: [820, 932, 901, 934, 1290, 1330, 1320]
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
