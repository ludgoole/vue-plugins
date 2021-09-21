<template>
  <div id="app">
    <viewer
      :options="options"
      :images="images"
      @inited="inited"
      class="viewer"
      ref="viewer"
    >
      <template scope="scope">
        <img v-show="false" v-for="src in scope.images" :src="src" :key="src" />
        {{ scope.options }}
      </template>
    </viewer>
    <button type="button" @click="show">Show</button>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs'
export default {
  components: {
    Viewer
  },
  data() {
    return {
      options: {
        inline: true,
        // 遮罩层
        backdrop: false,
        // 全屏按钮
        button: false,
        // 缩略图
        navbar: false,
        // 标题
        title: false,
        // 操作按钮
        toolbar: false,
        // 缩放比例提示
        tooltip: false,
        // 默认查看第2张
        initialViewIndex: 2,
        // 是否可以拖拽
        movable: true,
        viewed(evt) {
          // 渲染完成，所有方法均可调用
          console.log('viewed', evt)
        }
      },
      images: [
        'https://picsum.photos/id/50/346/216',
        'https://picsum.photos/id/51/346/216',
        'https://picsum.photos/id/52/346/216'
      ]
    }
  },
  methods: {
    inited(viewer) {
      // 初始化，可获取 viewer
      console.log('inited', viewer)
      this.$viewer = viewer
    },
    show() {
      this.$viewer.show()
    }
  }
}
</script>
