<template>
  <div @click="download">
    <slot>
      <button>下载</button>
    </slot>
  </div>
</template>

<script>
import Axios from 'axios'
import fileDownload from 'js-file-download'
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default() {
        return {}
      }
    },
    filename: {
      type: String,
      default: 'excel'
    }
  },
  methods: {
    download() {
      Axios({
        method: 'post',
        url: this.url,
        data: this.params,
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      }).then(res => {
        fileDownload(res.data, this.filename)
        this.$emit('after-download')
      })
    }
  }
}
</script>
