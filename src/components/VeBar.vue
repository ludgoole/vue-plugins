<template>
  <div class="VeBar"></div>
</template>

<script>
export default {
  name: 'VeBar',
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
          type: 'value',
          max: 120,
          axisLabel: {
            show: true,
            formatter: (value, index) => {
              var result = ''
              if (this.title.includes('死') || this.title.includes('囚')) {
                switch (value) {
                  case 20:
                    result = '绝'
                    break
                  case 40:
                    result = '墓'
                    break
                  case 60:
                    result = '死'
                    break
                  case 80:
                    result = '病'
                    break
                  case 100:
                    result = '衰'
                    break
                }
              } else {
                switch (value) {
                  case 20:
                    result = '长生'
                    break
                  case 40:
                    result = '沐浴'
                    break
                  case 60:
                    result = '冠带'
                    break
                  case 80:
                    result = '临官'
                    break
                  case 100:
                    result = '帝旺'
                    break
                }
              }
              return result
            }
          },

          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          },
          splitLine: {
            show: false
          }
        },
        series: [this.getSeriesItem()]
      }
    }
  },
  watch: {
    xAxisData() {
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
        type: 'bar',
        data: this.data,
        label: {
          show: true,
          position: 'top',
          formatter: function(value, index) {
            return value.data.guaMing
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.VeBar {
  width: 100vw;
  height: 100vw;
}
</style>
