const routes = [
  {
    path: '/',
    redirect: '/character/home'
  },
  {
    path: '/home',
    name: 'Character',
    component: () =>
      import(/* webpackChunkName: "character" */ '../views/character/Home.vue'),
    meta: {
      title: '千字文',
      leftArrow: true
    }
  },
  {
    path: '/place',
    name: 'Place',
    component: () =>
      import(/* webpackChunkName: "character" */ '../views/character/Place.vue')
  },
  {
    path: '/sentence',
    name: 'Sentence',
    component: () =>
      import(
        /* webpackChunkName: "character" */ '../views/character/Sentence.vue'
      )
  },
  {
    path: '/drawing',
    name: 'Drawing',
    component: () =>
      import(
        /* webpackChunkName: "character" */ '../views/character/Drawing.vue'
      )
  }
]

export default routes.map(v => {
  v.path = '/character' + v.path
  return v
})
