<template>
  <div class="Palace">
    <div class="Palace-tags pd-20">
      <van-tag
        v-for="(tag, index) in tags"
        :key="index"
        :plain="currTag !== tag"
        type="primary"
        size="large"
        @click="currTag = tag"
        >{{ tag }}</van-tag
      >
    </div>
    <van-swipe :show-indicators="false" :autoplay="autoplay">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img width="100%" v-lazy="image.url" @click="preview(index)" />
        <div class="Palace-option pd-20 flex flex-center flex-middle">
          <van-icon name="close" :size="24" @click="removePicture(index)" />
          <van-icon name="bar-chart-o" :size="24" @click="sortPictures" />
          <van-field
            v-model="image.name"
            placeholder="请输入图片名称"
            @keyup.enter="$event => $event.target.blur()"
          />
          <van-icon
            v-if="autoplay === 0"
            name="play-circle-o"
            :size="24"
            @click="autoplay = 2000"
          />
          <van-icon
            v-if="autoplay > 0"
            name="stop-circle-o"
            :size="24"
            @click="autoplay = 0"
          />
          <van-icon name="add-o" :size="24" @click="addPicture" />
        </div>
        <van-tabs swipeable>
          <van-tab
            v-for="(point, index) in image.points"
            :key="index"
            :title="`地点${index + 1}`"
          >
            <van-field
              v-model="image.points[index].feature"
              label="特征点"
              label-width="48"
              placeholder="请输入特征点"
              rows="1"
              autosize
              type="textarea"
              @change="toUpdate"
            />
            <van-field
              v-model="image.points[index].knowledge"
              label="知识点"
              label-width="48"
              placeholder="请输入知识点"
              rows="1"
              autosize
              type="textarea"
              @change="toUpdate"
            />
            <van-field
              v-model="image.points[index].memory"
              label="关联点"
              label-width="48"
              placeholder="请输入关联记忆"
              rows="1"
              autosize
              type="textarea"
              @change="toUpdate"
            />
          </van-tab>
        </van-tabs>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import localforage from 'localforage'

const getPoints = () =>
  Array(10)
    .fill('')
    .map(() => ({ feature: '', knowledge: '', memory: '' }))

const getImages = () => [
  {
    url: 'https://img01.yzcdn.cn/vant/apple-1.jpg',
    points: getPoints(),
    name: '1'
  }
]
let name = 1000

export default {
  data() {
    return {
      tags: ['周易', '道德经', '论语'],
      currTag: '周易',
      autoplay: 0,
      cacheData: {},
      images: []
    }
  },
  created() {
    this.$bus.$off('global.rightClick').$on('global.rightClick', this.save)
  },
  mounted() {
    this.init()
  },
  watch: {
    currTag() {
      this.undateImages()
    },
    cacheData() {
      this.undateImages()
    }
  },
  methods: {
    init() {
      const self = this
      localforage.getItem('JI_YI__palace').then(cacheData => {
        if (cacheData) {
          self.cacheData = cacheData || {}
        } else {
          try {
            this.api.readFile(
              {
                path: 'fs://jiyi.json'
              },
              function(ret, err) {
                if (ret.status) {
                  const saveData = JSON.parse(ret.data || '{}')
                  self.cacheData = saveData
                }
              }
            )
          } catch (err) {
            self.$toast({ msg: err, location: 'middle' })
          }
        }
      })
    },
    undateImages() {
      if (
        this.cacheData[this.currTag] &&
        this.cacheData[this.currTag].length > 0
      ) {
        this.images = this.cacheData[this.currTag]
      } else {
        this.images = getImages()
      }
    },
    addPicture() {
      name++
      try {
        this.api.getPicture(
          {
            sourceType: 'album',
            encodingType: 'jpg',
            mediaValue: 'pic',
            destinationType: 'base64',
            allowEdit: true,
            quality: 50,
            targetWidth: 800,
            saveToPhotoAlbum: false
          },
          (ret, err) => {
            if (ret) {
              this.images.push({
                name,
                url: ret.base64Data,
                points: getPoints()
              })

              this.toUpdate('添加成功')
            } else {
              alert(JSON.stringify(err))
            }
          }
        )
      } catch (err) {
        this.$toast({ msg: err, location: 'middle' })
      }
    },
    removePicture(index) {
      if (this.images.length === 1) {
        return this.$toast({ msg: '最后一张图片无法删除', location: 'middle' })
      }

      this.images.splice(index, 1)
      this.toUpdate('删除成功')
    },
    preview(index) {
      this.$ImagePreview({
        images: this.images.map(image => image.url),
        startPosition: index
      })
    },
    sortPictures() {
      this.images = this.images.sort(
        (a, b) =>
          a.name.replace(/(\d+).*/, '$1') - b.name.replace(/(\d+).*/, '$1')
      )
      this.toUpdate('排序成功')
    },
    toUpdate(msg) {
      this.cacheData[this.currTag] = this.images
      return localforage
        .setItem('JI_YI__palace', this.cacheData)
        .then(cacheData => console.log(cacheData))
        .then(() => {
          typeof msg === 'string' &&
            msg &&
            this.$toast({ msg, location: 'middle' })
        })
    },
    save() {
      const self = this
      if (this.images.length === 0) {
        return self.$toast({ msg: '暂无数据', location: 'middle' })
      }

      try {
        this.api.writeFile(
          {
            path: 'fs://jiyi.json',
            data: JSON.stringify(self.cacheData)
          },
          function(ret, err) {
            if (ret.status) {
              self.$toast({ msg: '保存成功', location: 'middle' })
            } else {
              self.$toast({ msg: err.msg, location: 'middle' })
            }
          }
        )
      } catch (err) {
        self.$toast({ msg: err, location: 'middle' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Palace {
  .pd-20 {
    padding: 0 20px;
  }

  &-tags {
    /deep/ .van-tag {
      margin: 10px 0;

      & + .van-tag {
        margin-left: 10px;
      }
    }
  }

  &-option {
    /deep/ .van-field {
      width: 120px;

      input {
        font-size: 16px;
        text-align: center;
      }
    }

    /deep/ .van-icon {
      & + .van-icon {
        margin-left: 10px;
      }
    }
  }
}
</style>
