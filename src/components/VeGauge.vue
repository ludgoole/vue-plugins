<template>
  <div class="VeGauge"></div>
</template>

<script>
// import * as echarts from 'echarts'
import * as echarts from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GaugeChart, CanvasRenderer])

const DIRECTION = ['北', '东北', '东', '东南', '南', '西南', '西', '西北']
const BAGUA = ['坎', '艮', '震', '巽', '离', '坤', '兑', '乾']
const WUXING = ['水', '木', '火', '金']
const DIZHI = ['子', '丑寅', '卯', '辰巳', '午', '未申', '酉', '戌亥']
export default {
  name: 'VeGauge',
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
        series: [
          this.getSeriesItem({
            max: 8,
            axisLine: {
              lineStyle: {
                width: 4,
                color: [[1, 'rgba(192,145,31,0.7)']],
                shadowColor: 'rgba(192,145,31, 0.5)',
                shadowBlur: 15
              }
            },
            axisLabel: {
              fontSize: 12,
              distance: -5,
              fontWeight: 900,
              formatter: function(value) {
                if (value === 8) {
                  return ''
                }
                return DIRECTION[value]
              }
            },
            pointer: {
              icon: 'arrow',
              width: 20,
              length: '30%',
              offsetCenter: [0, '0%'],
              itemStyle: {
                color: '#CD7F32',
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4
              }
            },
            data: [
              {
                value: this.direction,
                name: this.alpha
              }
            ]
          }),
          this.getSeriesItem({
            max: 8,
            axisLabel: {
              fontSize: 12,
              distance: -45,
              color: 'rgba(192,145,31, 1)',
              formatter: function(value) {
                if (value === 8) {
                  return ''
                }
                return DIZHI[value]
              }
            }
          }),
          this.getSeriesItem({
            max: 8,
            axisLabel: {
              fontSize: 12,
              distance: 28,
              color: 'rgba(192,145,31,0.7)',
              formatter: function(value) {
                if (value === 8) {
                  return ''
                }
                return BAGUA[value]
              }
            }
          }),
          this.getSeriesItem({
            max: 4,
            axisLabel: {
              fontSize: 14,
              distance: 55,
              formatter: function(value) {
                if (value === 4) {
                  return ''
                }
                return WUXING[value]
              }
            }
          })
        ]
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
    getSeriesItem({ max, axisLine, axisLabel, pointer, data = [] }) {
      return {
        name: 'Pressure',
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        splitNumber: max,
        min: 0,
        max,
        detail: {
          show: false
        },
        axisLine: axisLine || {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: axisLabel || {
          show: false
        },
        pointer: pointer || {
          show: false
        },
        data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.VeGauge {
  width: 100vw;
  height: 100vw;
}
</style>
