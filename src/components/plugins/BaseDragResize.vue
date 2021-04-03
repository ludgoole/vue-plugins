<template>
  <div class="BaseDragResize">
    <VueDragResize
      :w="76"
      :h="40"
      :z="999"
      :isActive="isActive"
      :isResizable="true"
      class="BaseDragResize-drag"
      parentLimitation
      @resizing="resize"
      @dragging="resize"
      @dragstop="dragstop"
      @activated="isActive = true"
      @deactivated="isActive = false"
    >
      <h3>Hello World!</h3>
      <p>{{ top }} х {{ left }}</p>
      <p>{{ width }} х {{ height }}</p>
    </VueDragResize>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'

export default {
  components: {
    VueDragResize
  },

  data() {
    return {
      isActive: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  },

  methods: {
    resize(newRect) {
      this.width = newRect.width
      this.height = newRect.height
      this.top = newRect.top
      this.left = newRect.left
    },

    dragstop(newRect) {
      console.log('dragstop', newRect)
    },
    deactivated(e) {
      console.log('deactivated', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseDragResize {
  position: relative;
  margin: auto;
  width: 500px;
  height: 500px;
  border: 1px solid salmon;
  &-drag {
    &.active:before {
      display: none;
    }
  }
}
</style>
