<template>
  <div class="Mine">
    <van-swipe-cell v-for="(item, index) in list" :key="index">
      <van-field
        v-if="item.isEdit"
        v-model="item.question"
        label=""
        @blur="toEdit(item)"
        placeholder="请输入问题"
      />
      <van-cell
        v-else
        :title="item.question"
        :label="getTime(item.timestamp)"
        :value="item.zhigua"
        @click="goAnswer(item)"
        is-link
      />
      <template #left>
        <van-button
          square
          text="编辑"
          type="info"
          class="edit-button"
          @click="$set(item, 'isEdit', true)"
        />
      </template>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="toDelete(item)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment'
import localforage from 'localforage'
export default {
  name: 'Mine',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.$bus.$off('global.rightClick').$on('global.rightClick', this.save)
  },
  async mounted() {
    this.init()
  },
  methods: {
    init() {
      const self = this
      localforage.getItem('MEI_HUA__mine').then(mine => {
        if (mine) {
          self.list = mine
        } else {
          try {
            this.api.readFile(
              {
                path: 'fs://meihua.json'
              },
              function(ret, err) {
                if (ret.status) {
                  const saveData = JSON.parse(ret.data || '[]')
                  self.list = saveData
                }
              }
            )
          } catch (err) {
            self.$toast({ msg: err, location: 'middle' })
          }
        }
      })
    },
    getTime(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    goAnswer(item) {
      const {
        question,
        shangGuaCount,
        xiaGuaCount,
        dongYaoCount,
        timestamp,
        ganwu
      } = item
      this.$router.push({
        path: '/answer',
        query: {
          question,
          shangGuaCount,
          xiaGuaCount,
          dongYaoCount,
          timestamp,
          ganwu
        }
      })
    },
    toDelete(item) {
      const index = this.list.findIndex(v => v.timestamp === item.timestamp)
      this.list.splice(index, 1)

      this.toUpdate(this.list).then(() => {
        this.$toast({ msg: '删除成功', location: 'middle' })
      })
    },
    toEdit(item) {
      const index = this.list.findIndex(v => v.timestamp === item.timestamp)
      item.isEdit = false
      this.$set(this.list, index, item)

      this.toUpdate(this.list).then(() => {
        this.$toast({ msg: '编辑成功', location: 'middle' })
      })
    },
    toUpdate(mine) {
      return localforage
        .setItem('MEI_HUA__mine', mine)
        .then(mine => console.log(mine))
    },
    save() {
      const self = this
      if (this.list.length === 0) {
        return self.$toast({ msg: '暂无数据', location: 'middle' })
      }

      try {
        this.api.writeFile(
          {
            path: 'fs://meihua.json',
            data: JSON.stringify(self.list)
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
  },
  onReady() {
    this.$toast({ msg: '成功', location: 'middle' })
    this.save()
  }
}
</script>
<style lang="scss">
.Mine {
  .edit-button {
    height: 100%;
  }

  .delete-button {
    height: 100%;
  }
}
</style>
