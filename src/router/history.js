const routes = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '历史',
      leftArrow: true,
      leftText: '',
      rightText: ''
    },
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/history/Home.vue')
  }
]

export default routes.map(v => {
  v.path = '/history' + v.path
  return v
})
