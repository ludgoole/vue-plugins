<template>
  <div class="BaseRecorder">
    <div class="BaseRecorder-record">
      <el-button @click="startRecorder()">开始录音</el-button>
      <el-button @click="resumeRecorder()">继续录音</el-button>
      <el-button @click="pauseRecorder()">暂停录音</el-button>
      <el-button @click="stopRecorder()">结束录音</el-button>
    </div>
    <div class="BaseRecorder-play">
      <el-button @click="playRecorder()">录音播放</el-button>
      <el-button @click="pausePlayRecorder()">暂停录音播放</el-button>
      <el-button @click="resumePlayRecorder()">恢复录音播放</el-button>
      <el-button @click="stopPlayRecorder()">停止录音播放</el-button>
    </div>
    <div class="BaseRecorder-download">
      <el-button @click="downPCM()">下载PCM</el-button>
      <el-button @click="downWAV()">下载WAV</el-button>
    </div>
    <div class="BaseRecorder-destroy">
      <el-button type="error" @click="destroyRecorder()">销毁录音</el-button>
    </div>
    <div class="BaseRecorder-wave">
      <canvas ref="record"></canvas>
      <canvas ref="play"></canvas>
    </div>
  </div>
</template>

<script>
import Recorder from 'js-audio-recorder'

export default {
  name: 'home',
  data() {
    return {
      recorder: null,
      // 波浪图-录音
      drawRecordId: null,
      // 波浪图-播放
      drawPlayId: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.recorder = new Recorder({
        // 采样位数，支持 8 或 16，默认是16
        sampleBits: 16,
        // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值
        sampleRate: 48000,
        // 声道，支持 1 或 2， 默认是1
        numChannels: 1,
        // 是否边录边转换，默认是false
        compiling: false
      })
    },
    // 开始录音
    startRecorder() {
      this.recorder.start().then(
        () => {
          this.drawRecord()
        },
        error => {
          // 出错了
          console.log(`${error.name} : ${error.message}`)
        }
      )
    },
    // 继续录音
    resumeRecorder() {
      this.recorder.resume()
    },
    // 暂停录音
    pauseRecorder() {
      this.recorder.pause()
      this.drawRecordId && cancelAnimationFrame(this.drawRecordId)
      this.drawRecordId = null
    },
    // 结束录音
    stopRecorder() {
      this.recorder.stop()
      this.drawRecordId && cancelAnimationFrame(this.drawRecordId)
      this.drawRecordId = null
    },
    // 录音播放
    playRecorder() {
      this.recorder.play()
      this.drawPlay() // 绘制波浪图
    },
    // 暂停录音播放
    pausePlayRecorder() {
      this.recorder.pausePlay()
    },
    // 恢复录音播放
    resumePlayRecorder() {
      this.recorder.resumePlay()
      this.drawPlay() // 绘制波浪图
    },
    // 停止录音播放
    stopPlayRecorder() {
      this.recorder.stopPlay()
    },
    // 销毁录音
    destroyRecorder() {
      this.recorder.destroy().then(function() {
        this.drawRecordId && cancelAnimationFrame(this.drawRecordId)
        this.drawRecordId = null

        this.drawPlayId && cancelAnimationFrame(this.drawPlayId)
        this.drawPlayId = null

        this.recorder = null
      })
    },

    /**
     *  下载录音文件
     * */
    // 下载pcm
    downPCM() {
      // 这里传参进去的时文件名
      this.recorder.downloadPCM('新文件')
    },
    // 下载wav
    downWAV() {
      // 这里传参进去的时文件名
      this.recorder.downloadWAV('新文件')
    },

    /**
     * 绘制波浪图-录音
     * */
    drawRecord() {
      this.drawRecordId = requestAnimationFrame(this.drawRecord)
      this.drawWave({
        canvas: this.$refs.record,
        dataArray: this.recorder.getRecordAnalyseData(),
        bgcolor: 'rgb(255, 128, 200)',
        lineWidth: 1,
        lineColor: 'rgb(0, 128, 255)'
      })
    },
    /**
     * 绘制波浪图-播放
     * */
    drawPlay() {
      this.drawPlayId = requestAnimationFrame(this.drawPlay)
      this.drawWave({
        canvas: this.$refs.play,
        dataArray: this.recorder.getPlayAnalyseData()
      })
    },
    drawWave({
      canvas,
      dataArray,
      bgcolor = 'rgb(200, 200, 200)',
      lineWidth = 2,
      lineColor = 'rgb(0, 0, 0)'
    }) {
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      const bufferLength = dataArray.length
      // 一个点占多少位置，共有bufferLength个点要绘制
      const sliceWidth = canvas.width / bufferLength
      // 绘制点的x轴位置
      let x = 0

      // 填充背景色
      ctx.fillStyle = bgcolor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 设定波形绘制颜色
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = lineColor

      ctx.beginPath()

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128
        const y = (v * canvas.height) / 2

        if (i === 0) {
          // 第一个点
          ctx.moveTo(x, y)
        } else {
          // 剩余的点
          ctx.lineTo(x, y)
        }
        // 依次平移，绘制所有点
        x += sliceWidth
      }

      // 最后一个点
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()
    }
  }
}
</script>
<style lang="scss" scoped>
.BaseRecorder {
  & > div {
    margin: 20px 0;
  }
  &-wave {
    canvas {
      width: 100%;
      border: 1px solid #ccc;
    }
  }
}
</style>
