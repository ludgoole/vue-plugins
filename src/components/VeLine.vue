<template>
  <div class="VeLine"></div>
</template>

<script>
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
    },
    markLine: {
      value: String,
      default: ''
    },
    areaStyle: {
      value: Boolean,
      default: false
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
        tooltip: {
          show: true
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
    },
    title() {
      this.myChart.setOption(this.options)
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$el)
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
        data: this.data,
        areaStyle: {
          opacity: this.areaStyle ? 0.6 : 0
        },
        markLine: {
          silent: true,
          lineStyle: {
            color: '#7232dd'
          },
          data: [
            {
              yAxis: this.markLine
            }
          ]
        }
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
