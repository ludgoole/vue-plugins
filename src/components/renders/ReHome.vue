<!--
<template>
  <div>
    <RePopup v-model="isShow" :title="title">
      <div slot="header">头部内容</div>
      <div>默认内容</div>
      <div slot="footer">尾部内容</div>
    </RePopup>
  </div>
</template>
-->

<script>
import RePopup from '@/components/renders/RePopup.vue'
export default {
  name: 'ReHome',
  components: {
    RePopup
  },
  data() {
    return {
      isShowSync: true,
      isShow: true,
      title: '标题',
      label: null
    }
  },
  render(h) {
    return h(
      RePopup,
      {
        props: {
          value: this.isShow,
          title: this.title,
          isShowSync: this.isShowSync
        },
        on: {
          input: isShow => {
            this.isShow = isShow
          },
          'update:isShowSync': isShowSync => {
            this.isShowSync = isShowSync
          }
        },
        scopedSlots: {
          default: props => h('span', '默认内容'),
          header: props => h('span', '头部内容')
          // footer: props => h('span', ['尾部作用域插槽', props.cancel])
        }
      },
      [
        h('div', '默认插槽'),
        h('div', { slot: 'header' }, '头部插槽'),
        this.label
      ]
    )
  }
}
</script>

<style lang="scss" scoped></style>
