<template>
  <div class="Game">
    <div class="Game-guaXiang flex flex-column flex-middle">
      <BaseGua :gua-xiang="gua.guaXiang" :size="44" @click="refresh"></BaseGua>
      <p>{{ gua.guaMing }}</p>
    </div>
    <div class="Game-baGua flex flex-center">
      <div class="Game-baGua--up flex flex-column flex-middle">
        <BaseGua
          :gua-xiang="shangGua.guaXiang"
          :size="44"
          @click="toLeiXiang"
        ></BaseGua>
        <p>{{ shangGua.name }}</p>
      </div>
      <div class="Game-baGua--down flex flex-column flex-middle">
        <BaseGua
          :gua-xiang="xiaGua.guaXiang"
          :size="44"
          @click="toLeiXiang"
        ></BaseGua>
        <p>{{ xiaGua.name }}</p>
      </div>
    </div>
    <div class="Game-tag">
      <van-tag v-for="tag in tags" :key="tag" type="primary" size="large">{{
        tag
      }}</van-tag>
    </div>
    <div class="Game-field">
      <van-field
        v-model="list[guaXu - 1]"
        rows="10"
        autosize
        label=""
        type="textarea"
        placeholder="请输入卦象"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash'
import localforage from 'localforage'
import BaseGua from '@/components/BaseGua.vue'
import ZHOUYI from '@/mock/zhouyi'
import BAGUA from '@/mock/bagua'
export default {
  name: 'Game',
  components: {
    BaseGua
  },
  data() {
    return {
      guaXu: 1,
      list: [],
      tags: [
        '家庭',
        '婚姻',
        '身高',
        '年龄',
        '性格',
        '疾病',
        '家宅',
        '升学',
        '工作',
        '地名',
        '食物',
        '兴趣'
      ]
    }
  },
  computed: {
    gua() {
      return ZHOUYI.find(gua => gua.guaXu === this.guaXu) || ZHOUYI[0]
    },
    shangGua() {
      return BAGUA.find(
        gua => gua.guaXiang.join() === this.gua.guaXiang.slice(0, 3).join()
      )
    },
    xiaGua() {
      return BAGUA.find(
        gua => gua.guaXiang.join() === this.gua.guaXiang.slice(3).join()
      )
    }
  },
  created() {
    this.guaXu = Number(this.$route.query.guaXu) || 1
    this.$bus.$off('global.rightClick').$on('global.rightClick', this.save)
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const self = this
      localforage.getItem('MEI_HUA__game').then(game => {
        if (game) {
          self.list = game
        } else {
          try {
            this.api.readFile(
              {
                path: 'fs://meihua-game.json'
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
    refresh() {
      this.guaXu = _.random(1, 64)
    },
    toLeiXiang(search) {
      this.$router.push({
        path: '/leiXiang',
        query: {
          search
        }
      })
    },
    save() {
      const self = this
      if (this.list.length === 0) {
        return self.$toast({ msg: '暂无数据', location: 'middle' })
      }

      localforage.setItem('MEI_HUA__game', this.list)

      try {
        this.api.writeFile(
          {
            path: 'fs://meihua-game.json',
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
.Game {
  padding: 0 20px;

  &-baGua > div {
    margin: 10px 20px;
  }

  &-tag {
    margin: 0 -5px;

    span {
      margin: 5px;
    }
  }

  &-field {
    margin-top: 20px;

    .van-field {
      padding: 0;
    }
  }
}
</style>
