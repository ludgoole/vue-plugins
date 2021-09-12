<!--
<template>
  <div v-if="isShow">
    <slot name="header" v-show="isShowSync">
      <header class="flex flex-justify">
        <h3>{{title}}</h3>
        <i>×</i>
      </header>
    </slot>
    <slot></slot>
    <slot name="footer">
      <footer class="flex flex-center">
        <bttton @click="sure">确认</bttton>
        <bttton @click="cancel">取消</bttton>
      </footer>
    </slot>
  </div>
</template>
-->
<script>
export default {
  name: 'RePopup',
  props: {
    value: {
      type: Boolean,
      default: true
    },
    isShowSync: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  mounted() {
    console.log('popup')
  },
  methods: {
    cancel() {
      this.$emit('input', false)
      console.log('cancel', this.value)
    },
    sure() {
      this.$emit('input', true)
      this.$emit('update:isShowSync', false)
      console.log('sure', this.value)
    }
  },
  render(h, props) {
    console.log('this', this, props)
    if (!this.value) return null

    return h(
      'div',
      {
        style: {
          display: this.isShowSync ? 'block' : 'none'
        }
      },
      [
        this.$slots.header
          ? this.$slots.header
          : h(
              'header',
              {
                class: {
                  flex: true,
                  'flex-justify': true
                }
              },
              [h('h3', this.title), h('i', 'x')]
            ),
        this.$slots.default,
        this.$scopedSlots.footer
          ? this.$scopedSlots.footer({ cancel: 'this.cancel' })
          : h(
              'footer',
              {
                class: {
                  flex: true,
                  'flex-center': true
                }
              },
              [
                h(
                  'button',
                  {
                    on: {
                      click: this.sure
                    }
                  },
                  '确认'
                ),
                h(
                  'button',
                  {
                    on: {
                      click: this.cancel
                    }
                  },
                  '取消'
                )
              ]
            )
      ]
    )

    // if (this.vaule) {
    //   return h('div', [
    //     h(this.$slots.header, [h('h3', this.title), h('i', 'x')]),
    //     this.$slots.default,
    //     this.$scopedSlots.footer({
    //       cancel: this.cancel
    //     })
    //   ])
    // } else {
    //   console.log('this', this.value, props)
    //   return h('div', 'NO_DATA')
    // }
  }
}
</script>
