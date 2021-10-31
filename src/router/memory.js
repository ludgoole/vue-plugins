const routes = [
  {
    path: '/palace',
    name: 'Palace',
    meta: {
      title: '记忆宫殿',
      leftArrow: true,
      leftText: '',
      rightText: ''
    },
    component: () =>
      import(/* webpackChunkName: "Palace" */ '../views/memory/Palace.vue')
  }
]

export default routes
