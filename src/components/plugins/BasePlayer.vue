<template>
  <div>
    <!-- mini -->
    <Aplayer
      @pause="pause"
      @play="play"
      autoplay
      :music="{
        title: 'secret base~君がくれたもの~',
        artist: 'Silent Siren',
        src:
          'https://audio04.dmhmusic.com/71_53_T10047699632_128_4_1_0_sdk-cpm/cn/0207/M00/73/B4/ChR461vN92uAMSHEAF13XOUL5QM162.mp3?xcode=f289a0ca2634d9507de6cfedc0901fca7251256',
        pic
      }"
    >
      <template v-slot:display="{ currentMusic, playStat }">
        {{ currentMusic.title }}
        {{ playStat.duration }} - {{ playStat.playedTime }}
      </template>
    </Aplayer>
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
const pic = require('../../assets/logo.png')
export default {
  components: {
    Aplayer
  },
  data() {
    return {
      pic
    }
  },
  methods: {
    play() {
      console.log('play')
    },
    pause() {
      console.log('pause')
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .aplayer {
  .aplayer-info {
    // slot内容
    .aplayer-music {
    }
    // 控制条内容
    .aplayer-controller {
      // 进度条
      .aplayer-bar-wrap {
      }
      // 时间
      .aplayer-time {
        // 总时长，播放时间
        .aplayer-time-inner {
          // display: none;
        }

        // 音量，随机播放等按钮
        button {
          display: none;
        }
      }
    }
  }
}
</style>
