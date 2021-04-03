<template>
  <div>
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      customEventName="customstatechangedeventname"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @statechanged="playerStateChanged($event)"
      @ready="playerReadied"
    >
    </video-player>
  </div>
</template>

<script>
// require styles
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      // [配置信息](https://blog.csdn.net/qq_39905409/article/details/98481735)
      playerOptions: {
        // videojs options
        autoplay: true,
        muted: true,
        preload: 'auto',
        language: 'en',
        fluid: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src:
              'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
          }
        ],
        poster: 'https://t7.baidu.com/it/u=602106375,407124525&fm=193&f=GIF',
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, // 全屏按钮
          currentTimeDisplay: true, // 当前时间
          volumeControl: false, // 声音控制键
          playToggle: true, // 暂停和播放键
          progressControl: true // 进度条
        }
      }
    }
  },
  mounted() {
    console.log('this is current player instance object', this.player)
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      console.log('player onPlayerEnded!', player)
    },
    onPlayerWaiting(player) {
      console.log('player onPlayerWaiting!', player)
    },
    onPlayerPlaying(player) {
      console.log('player onPlayerPlaying!', player)
    },
    onPlayerLoadeddata(player) {
      console.log('player onPlayerLoadeddata!', player)
    },
    onPlayerTimeupdate(player) {
      console.log('player onPlayerTimeupdate!', player)
    },
    onPlayerCanplay(player) {
      console.log('player onPlayerCanplay!', player)
    },
    onPlayerCanplaythrough(player) {
      console.log('player onPlayerCanplaythrough!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .video-player {
  // 设置 fluid: true，宽高自适应
  // 默认  1024 * 576
  // .vjs_video_3-dimensions {
  //   width: 1024px;
  //   height: 576px;
  // }

  // 初始化，暂停按钮居中
  .vjs-big-play-button {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
