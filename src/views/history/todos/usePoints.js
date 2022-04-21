import {
  reactive,
  toRefs,
  getCurrentInstance,
  onMounted
} from '@vue/composition-api'

export default function usePoints() {
  const state = reactive({
    start: '',
    end: '',
    startCity: '',
    endCity: '',
    waypoints: [],
    markers: []
  })

  onMounted(async () => {
    const { proxy: self } = getCurrentInstance()
    const {
      chao = '0501',
      emperor = '0501-01',
      minister = '0501-01-lb'
    } = self.$route.query

    const { default: points } = await import(
      `@/mock/history/${chao}/${emperor}/${minister}-map`
    )

    const { newCity: startCity } = points[0]
    const { newCity: endCity } = points.slice(-1)[0]
    const waypoints = points.slice(1, -1).map(point => point.newCity)
    const markers = points
      .slice(0, startCity === endCity ? -1 : undefined)
      .map(point => {
        const {
          position,
          oldCity: content,
          offset = { width: 0, height: 20 }
        } = point

        return {
          position,
          content,
          offset
        }
      })

    state.start = startCity
    state.end = endCity
    state.startCity = startCity
    state.endCity = endCity
    state.waypoints = waypoints
    state.markers = markers
  })

  return {
    ...toRefs(state)
  }
}