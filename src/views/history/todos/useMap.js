import { reactive, toRefs } from '@vue/composition-api'
export default function useMap() {
  const state = reactive({
    // 北京 { lng: 116.404, lat: 39.915 }
    center: '郑州',
    zoom: 7
  })

  const readyHandler = ({ BMap, map }) => {
    console.log(BMap, map)
  }
  const clickHandler = data => {
    console.log(data)
  }
  return {
    ...toRefs(state),
    readyHandler,
    clickHandler
  }
}
