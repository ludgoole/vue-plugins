<template>
  <baidu-map
    class="map w-full h-full"
    :center="center"
    :zoom="zoom"
    @ready="readyHandler"
    @click="clickHandler"
  >
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

    <bm-marker
      :position="{ lng: 116.945007, lat: 34.764994 }"
      animation="BMAP_ANIMATION_BOUNCE"
    >
      <bm-label content="沛县" :offset="{ width: 0, height: 10 }" />
    </bm-marker>

    <bm-marker :position="{ lng: 116.371756, lat: 34.447809 }">
      <bm-label content="砀山" :offset="{ width: 0, height: 20 }" />
    </bm-marker>

    <bm-marker :position="{ lng: 116.663079, lat: 34.701971 }">
      <bm-label content="丰邑" :offset="{ width: 0, height: 20 }" />
    </bm-marker>

    <bm-marker :position="{ lng: 117.292782, lat: 34.212855 }">
      <bm-label content="彭城" :offset="{ width: 0, height: 20 }" />
    </bm-marker>

    <bm-marker :position="{ lng: 117.170488, lat: 35.117166 }">
      <bm-label content="薛地" :offset="{ width: 0, height: 20 }" />
    </bm-marker>

    <bm-marker :position="{ lng: 109.280989, lat: 34.420786 }">
      <bm-label content="鸿门" :offset="{ width: 0, height: 10 }" />
    </bm-marker>

    <bm-marker :position="{ lng: 106.961861, lat: 33.107084 }">
      <bm-label content="汉中" :offset="{ width: 0, height: 20 }" />
    </bm-marker>

    <bm-marker :position="{ lng: 117.318755, lat: 33.333667 }">
      <bm-label content="垓下" :offset="{ width: 0, height: 20 }" />
    </bm-marker>

    <bm-marker :position="{ lng: 108.937392, lat: 34.341997 }">
      <bm-label content="长安" :offset="{ width: 0, height: 20 }" />
    </bm-marker>

    <bm-marker :position="{ lng: 113.382096, lat: 40.143517 }">
      <bm-label content="白登" :offset="{ width: 0, height: 20 }" />
    </bm-marker>

    <bm-driving
      start="沛县"
      end="沛县"
      startCity="江苏"
      endCity="江苏"
      :auto-viewport="true"
      :panel="false"
      :waypoints="[
        '砀山县',
        '丰县',
        '徐州',
        '滕州市',
        '鸿门堡村',
        '汉中市',
        '固镇县',
        '西安',
        '马铺山'
      ]"
    ></bm-driving>
  </baidu-map>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

export default defineComponent({
  name: 'Life',
  setup() {
    // const { proxy: self } = getCurrentInstance()
    // const { chao, minister, name } = self.$route.query

    const state = reactive({
      center: { lng: 0, lat: 0 },
      zoom: 2
    })

    const readyHandler = ({ BMap, map }) => {
      console.log(BMap, map)
      state.center.lng = 116.404
      state.center.lat = 39.915
      state.zoom = 10
    }
    const clickHandler = data => {
      console.log(data)
    }

    return { ...toRefs(state), readyHandler, clickHandler }
  }
})
</script>
