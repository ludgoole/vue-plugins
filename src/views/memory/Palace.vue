<template>
  <div class="Palace">
    记忆宫殿1
  </div>
</template>

<script>
export default {
  mounted() {
    this.$toast({ msg: 'mounted', location: 'middle' })
    try {
      this.api.getPicture(
        {
          sourceType: 'camera',
          encodingType: 'jpg',
          mediaValue: 'pic',
          destinationType: 'url',
          allowEdit: true,
          quality: 50,
          targetWidth: 100,
          targetHeight: 100,
          saveToPhotoAlbum: false
        },
        function(ret, err) {
          if (ret) {
            console.log('ret', ret)
            // alert(JSON.stringify(ret))
          } else {
            alert(JSON.stringify(err))
          }
        }
      )
    } catch (err) {
      this.$toast({ msg: err, location: 'middle' })
    }
  }
}
</script>

<style lang="scss" scoped>
.Palace {
  text-align: left;
}
</style>
