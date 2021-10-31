const routes = [
  {
    path: '/palace',
    name: 'Palace',
    meta: {
      title: '记忆宫殿',
      leftArrow: true,
      leftText: '',
      rightText: '保存'
    },
    component: () =>
      import(/* webpackChunkName: "Palace" */ '../views/memory/Palace.vue')
  }
]

export default routes
