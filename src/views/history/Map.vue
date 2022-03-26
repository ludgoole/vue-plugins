<template>
  <div class="Map flex flex-column overflow-hidden">
    <van-nav-bar title="足迹" left-arrow @click-left="$router.go(-1)" />
    <baidu-map
      class="flex-1"
      :center="center"
      :zoom="zoom"
      @ready="readyHandler"
      @click="clickHandler"
    >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-marker
        v-for="({ position, content, offset }, index) in markers"
        :key="index"
        :position="position"
      >
        <bm-label :content="content" :offset="offset" />
      </bm-marker>
      <bm-driving
        v-if="start"
        :start="start"
        :end="end"
        :startCity="startCity"
        :endCity="endCity"
        :auto-viewport="true"
        :panel="false"
        :waypoints="waypoints"
      ></bm-driving>
    </baidu-map>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import useMap from './todos/useMap'
import usePoints from './todos/usePoints'

export default defineComponent({
  name: 'Map',
  setup() {
    const { center, zoom, readyHandler, clickHandler } = useMap()
    const { start, end, startCity, endCity, waypoints, markers } = usePoints()

    return {
      // useMap
      center,
      zoom,
      readyHandler,
      clickHandler,
      // usePoints
      start,
      end,
      startCity,
      endCity,
      waypoints,
      markers
    }
  }
})
</script>
