const routes = [
  {
    path: '/',
    redirect: '/history/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/history/Home.vue')
  }
]

export default routes.map(v => {
  v.path = '/history' + v.path
  return v
})
