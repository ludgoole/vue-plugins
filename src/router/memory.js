const routes = [
  {
    path: '/home',
    name: 'Memory',
    component: () =>
      import(/* webpackChunkName: "Palace" */ '../views/memory/Home.vue'),
  },
  {
    path: '/word',
    name: 'Word',
    component: () =>
      import(/* webpackChunkName: "Palace" */ '../views/memory/Word.vue'),
  },
  {
    path: '/pile',
    name: 'Pile',
    component: () =>
      import(/* webpackChunkName: "Palace" */ '../views/memory/Pile.vue'),
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: () =>
      import(/* webpackChunkName: "Palace" */ '../views/memory/Knowledge.vue'),
  },
  {
    path: '/palace',
    name: 'Palace',
    meta: {
      title: '记忆宫殿',
      leftArrow: true,
      leftText: '',
      rightText: '保存',
    },
    component: () =>
      import(/* webpackChunkName: "Palace" */ '../views/memory/Palace.vue'),
  },
]

export default routes.map((v) => {
  v.path = '/memory' + v.path
  return v
})
