<template>
  <div class="VeRadar"></div>
</template>

<script>
export default {
  name: 'VeRadar',
  props: {
    title: {
      value: String,
      default: '',
    },
    legends: {
      value: Array,
      default() {
        return ['不平衡', '改变P', '改变O', '改变X']
      },
    },
    selecteds: {
      value: Array,
      default() {
        return [true, false, false, false]
      },
    },
    data: {
      value: Array,
      default() {
        return [
          [
            {
              name: 'P',
              value: 300,
            },
            {
              name: 'O',
              value: 400,
            },
            {
              name: 'X',
              value: 600,
            },
          ],
          [
            {
              name: 'P',
              value: -246,
            },
            {
              name: 'O',
              value: 400,
            },
            {
              name: 'X',
              value: 600,
            },
          ],
          [
            {
              name: 'P',
              value: 300,
            },
            {
              name: 'O',
              value: 600,
            },
            {
              name: 'X',
              value: 600,
            },
          ],
          [
            {
              name: 'P',
              value: 300,
            },
            {
              name: 'O',
              value: 400,
            },
            {
              name: 'X',
              value: 400,
            },
          ],
        ]
      },
    },
  },
  computed: {
    options() {
      return {
        title: {
          text: this.title,
          padding: [30, 0, 0, 10],
        },
        legend: {
          data: this.legends,
          bottom: 60,
          selected: this.legends.reduce((a, c, i) => {
            a[c] = this.selecteds[i]
            return a
          }, {}),
        },
        tooltip: {
          show: true,
        },
        radar: {
          // shape: 'circle',
          indicator: this.data[0].map((v) => {
            return {
              name: v.name,
              max: 1000,
            }
          }),
        },
        series: [this.getSeriesItem()],
      }
    },
  },
  watch: {
    selecteds() {
      this.myChart.setOption(this.options)
    },
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$el)
    this.myChart.setOption(this.options)

    console.log('this.options', this.options)

    this.myChart.on('legendselectchanged', (params, series) => {
      console.log(params, series)
      this.$emit('legendselectchanged', params.name, params.selected)
    })
  },
  methods: {
    getSeriesItem() {
      return {
        type: 'radar',
        data: this.legends.map((legend, i) => {
          return {
            value: this.data[i].map((v) => v.value),
            name: legend,
          }
        }),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.VeRadar {
  width: 100vw;
  height: 100vw;
}
</style>
