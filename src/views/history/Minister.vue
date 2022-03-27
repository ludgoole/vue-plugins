<template>
  <div class="Minister">
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <div class="h-88vh m-1" @pan="onPan">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
      />
    </div>
  </div>
</template>

<script>
import graphOptions from '@/config/relation-graph-center'
import dragMixin from './mixins/drag'
import { tree2flat } from '@/util'

export default {
  name: 'Minister',
  mixins: [dragMixin],
  data() {
    return {
      graphOptions
    }
  },
  computed: {
    chao() {
      return this.$route.query.chao
    },
    emperor() {
      return this.$route.query.emperor
    },
    title() {
      return this.$route.query.name
    }
  },
  mounted() {
    this.showSeeksGraph()
  },
  methods: {
    async showSeeksGraph(query) {
      const { default: nodetree } = await import(
        `@/mock/history/${this.chao}/${this.emperor}`
      )
      const nodes = tree2flat(nodetree)
      console.log('[ nodes ] >', nodes)

      const graphjsondata = {
        rootId: nodes[0].id,
        nodes: nodes.map(v => {
          return {
            id: v.id,
            text: v.text
          }
        }),
        links: nodes.slice(1).map(v => {
          console.log('[ v ] >', v)
          return {
            from: v.parentId,
            to: v.id,
            text: v.relation
          }
        })
      }

      this.$refs.seeksRelationGraph.setJsonData(graphjsondata)
    },
    onNodeClick(node, $event) {
      console.log('onNodeClick:', node)
      this.$refs.seeksRelationGraph.focusNodeById(node.id)

      this.$router.push({
        path: '/history/life',
        query: {
          chao: this.chao,
          minister: node.id,
          name: node.text
        }
      })

      // location.href = `https://baike.baidu.com/item/${node.text}`
    }
  }
}
</script>
