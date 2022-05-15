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
