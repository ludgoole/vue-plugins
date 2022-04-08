<template>
  <div class="Character">
    <VueHotspot
      :key="currPoint.x + currPoint.y"
      :init-options="hotspotConfig"
    />

    <van-grid square :column-num="5">
      <van-grid-item
        v-for="point in points"
        :key="point.x"
        :class="{ active: currPoint === point }"
        :text="point.place"
        @click="currPoint = point"
      />
    </van-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import POINTS from '@/mock/qianziwen/points'
import VueHotspot from 'vue-hotspot'
export default defineComponent({
  name: 'Character',
  components: {
    VueHotspot
  },
  data() {
    return {
      image: require('@/assets/image/huanghelou.png'),
      points: POINTS,
      currPoint: POINTS[0]
    }
  },
  computed: {
    hotspotConfig() {
      const { currPoint = {} } = this

      this.addClick()

      return {
        image: require('@/assets/image/huanghelou.png'),
        editable: false,
        interactivity: 'none',
        data: [
          {
            Title: currPoint.title,
            Message: currPoint.story,
            x: currPoint.x,
            y: currPoint.y
          }
        ]
      }
    }
  },
  methods: {
    addClick() {
      this.$nextTick(() => {
        const hotspot = document.querySelector('.ui__vue_hotspot_hotspot')
        const { place, title, story } = this.currPoint
        hotspot.addEventListener('click', evt => {
          this.$router.push({
            path: '/character/place',
            query: {
              place,
              title,
              story
            }
          })
        })
      })
    }
  }
})
</script>
<style lang="scss">
.Character {
  .ui__vue_hotspot {
    height: auto;

    &_hotspot {
      animation: heartBeat 2.4s ease-out infinite;

      > div {
        display: none !important;
      }
    }

    &_buttons_box {
      display: none;
    }
  }

  .van-grid-item.active .van-grid-item__content {
    background: rgba(16, 185, 129, 0.4);
  }
}

@keyframes heartBeat {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  14% {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }

  28% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  42% {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }

  70% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
