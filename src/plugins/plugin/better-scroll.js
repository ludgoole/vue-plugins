import BScroll from '@better-scroll/core'

function installPlugin (Vue) {
  Vue.prototype.$BScroll = BScroll
}

export default { installPlugin }
