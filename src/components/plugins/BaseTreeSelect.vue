<!-- Vue SFC -->
<template>
  <div class="BaseTreeSelect">
    <treeselect
      v-model="value"
      placeholder="请选择"
      :options="options"
      :multiple="true"
      :flat="true"
      :show-count="true"
      :normalizer="normalizer"
      :default-expand-level="1"
      @select="select"
    >
      <label
        slot="option-label"
        slot-scope="{
          node,
          shouldShowCount,
          count,
          labelClassName,
          countClassName
        }"
        :class="labelClassName"
      >
        {{ node.isBranch ? 'Branch' : 'Leaf' }}: {{ node.label }}
        <span v-if="shouldShowCount" :class="countClassName">
          ({{ count }})
        </span>
      </label>
    </treeselect>
    <p>{{ value }}</p>
  </div>
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { Treeselect },
  data() {
    return {
      // 默认选中
      // id集合
      value: ['A', 'ABA', 'bb'],
      // 自定义键名
      // 默认 id label children
      // label 替换为name
      normalizer(node) {
        return {
          ...node,
          // id: node.key,
          label: node.name
          // children: node.subOptions,
        }
      },
      // 树状结构
      options: [
        {
          id: 'A',
          name: 'a',
          children: [
            {
              id: 'AA',
              name: 'aa',
              isDisabled: true
            },
            {
              id: 'AB',
              name: 'ab',
              // 默认展开
              isDefaultExpanded: true,
              children: [
                {
                  id: 'ABA',
                  name: 'aba'
                },
                {
                  id: 'ABB',
                  name: 'abb',
                  isNew: true
                }
              ]
            }
          ]
        },
        {
          id: 'b',
          name: 'b',
          children: [
            {
              id: 'ba',
              name: 'ba'
            },
            {
              id: 'bb',
              name: 'bb'
            }
          ]
        },
        {
          id: 'c',
          name: 'c'
        }
      ]
    }
  },
  methods: {
    select(node) {
      console.log('node=', node)
    }
  }
}
</script>
