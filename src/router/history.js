const routes = [
  {
    path: '/',
    redirect: '/history/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "history" */ '../views/history/Home.vue')
  },
  {
    path: '/emperor',
    name: 'Emperor',
    component: () =>
      import(/* webpackChunkName: "history" */ '../views/history/Emperor.vue')
  },
  {
    path: '/minister',
    name: 'Minister',
    component: () =>
      import(/* webpackChunkName: "history" */ '../views/history/Minister.vue')
  },
  {
    path: '/life',
    name: 'Life',
    component: () =>
      import(/* webpackChunkName: "history" */ '../views/history/Life.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () =>
      import(/* webpackChunkName: "history" */ '../views/history/Map.vue')
  }
]

export default routes.map(v => {
  v.path = '/history' + v.path
  return v
})
