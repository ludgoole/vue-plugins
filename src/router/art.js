const routes = [
  {
    path: '/',
    redirect: '/art/home',
  },
  {
    path: '/home',
    name: 'Art',
    component: () =>
      import(/* webpackChunkName: "art" */ '../views/art/Home.vue'),
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () =>
      import(/* webpackChunkName: "art" */ '../views/art/Timeline.vue'),
  },
  {
    path: '/wordcloud',
    name: 'WordCloud',
    component: () =>
      import(/* webpackChunkName: "art" */ '../views/art/WordCloud.vue'),
  },
  {
    path: '/squarepaper',
    name: 'SquarePaper',
    component: () =>
      import(/* webpackChunkName: "art" */ '../views/art/SquarePaper.vue'),
  },
  {
    path: '/image',
    name: 'Image',
    component: () =>
      import(/* webpackChunkName: "art" */ '../views/art/Image.vue'),
  },
]

export default routes.map((v) => {
  v.path = '/art' + v.path
  return v
})
