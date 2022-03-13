<template>
  <div class="Emperor">
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
    <div class="Emperor-graph h-88vh m-1" @pan="onPan">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
        :on-node-expand="onNodeExpand"
        :on-node-collapse="onNodeCollapse"
      />
    </div>
  </div>
</template>

<script>
import graphOptions from '@/config/relation-graph-tree'
import dragMixin from './mixins/drag'
export default {
  name: 'Relation',
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
    title() {
      return this.$route.query.name
    }
  },
  mounted() {
    this.showSeeksGraph()
  },
  methods: {
    async showSeeksGraph(query) {
      const { default: nodes } = await import(`@/mock/history/${this.chao}`)
      const graphjsondata = {
        rootId: nodes[0].id,
        nodes: nodes.map(v => {
          // { id: 'c', text: 'C', width: 80, height: 60, color: '#43a2f1', fontColor: 'yellow' }
          return {
            id: v.id,
            text: v.text.replace(' ', '<br>'),
            expandHolderPosition: v.isEnd ? 'hide' : 'bottom'
          }
        }),
        links: nodes.slice(1).map(v => {
          // { from: 'a', to: 'b', text: '关系1', color: '#43a2f1' },
          return {
            from: v.ancestors || v.parentId,
            to: v.id,
            text: v.relation
          }
        })
      }
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
      this.$refs.seeksRelationGraph.setJsonData(graphjsondata, seeksRGGraph => {
        // Called when the relation-graph is completed
        console.log('[ showSeeksGraph ] >', seeksRGGraph)
      })
    },
    onNodeClick(node, $event) {
      const { chao } = this
      const { id: emperor, text } = node
      console.log('onNodeClick:', node)
      this.$refs.seeksRelationGraph.focusNodeById(node.id)
      this.$router.push({
        path: '/history/minister',
        query: {
          chao,
          emperor,
          name: text.replace('<br>', '')
        }
      })
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject)
    },
    onNodeCollapse(node, e) {
      console.log('onNodeCollapse:', node)
      // 当有一些节点被显示或隐藏起来时，会让图谱看着很难看，需要布局器重新为节点分配位置，所以这里需要调用refresh方法来重新布局
      // this.$refs.seeksRelationGraph.refresh()
      this.$refs.seeksRelationGraph.focusNodeById(node.id)
    },
    onNodeExpand(node, e) {
      // 当有一些节点被显示或隐藏起来时，会让图谱看着很难看，需要布局器重新为节点分配位置，所以这里需要调用refresh方法来重新布局
      console.log('onNodeExpand:', node)
      this.$refs.seeksRelationGraph.refresh()
      this.$refs.seeksRelationGraph.focusNodeById(node.id)
    }
  }
}
</script>
