const routes = [
  {
    path: '/',
    redirect: '/question',
  },
  {
    path: '/question',
    name: 'Question',
    meta: {
      title: '卜卦',
      leftText: '',
      rightText: '',
    },
    component: () =>
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      import(/* webpackChunkName: "question" */ '../views/meihua/Question.vue'),
  },
  {
    path: '/answer',
    name: 'Answer',
    component: () =>
      import(/* webpackChunkName: "question" */ '../views/meihua/Answer.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    meta: {
      title: '老黄历',
      leftText: '',
      leftArrow: true,
      rightText: '',
    },
    component: () =>
      import(/* webpackChunkName: "question" */ '../views/meihua/Calendar.vue'),
  },
  {
    path: '/compass',
    name: 'Compass',
    meta: {
      title: '罗盘',
      leftText: '',
      leftArrow: true,
      rightText: '',
    },
    component: () =>
      import(/* webpackChunkName: "question" */ '../views/meihua/Compass.vue'),
  },
  {
    path: '/guaQi',
    name: 'GuaQi',
    meta: {
      title: '卦气',
      leftText: '',
      leftArrow: true,
      rightText: '',
    },
    component: () =>
      import(/* webpackChunkName: "question" */ '../views/meihua/GuaQi.vue'),
  },
  {
    path: '/query',
    name: 'Query',
    meta: {
      title: '查卦',
      leftText: '',
      rightText: '',
    },
    component: () =>
      import(/* webpackChunkName: "query" */ '../views/meihua/Query.vue'),
  },
  {
    path: '/game',
    name: 'Game',
    meta: {
      title: '卦象组合',
      leftText: '',
      leftArrow: true,
      rightText: '保存',
    },
    component: () =>
      import(/* webpackChunkName: "query" */ '../views/meihua/Game.vue'),
  },
  {
    path: '/yili',
    name: 'YiLi',
    meta: {
      title: '易理',
      leftText: '',
      leftArrow: true,
    },
    component: () =>
      import(/* webpackChunkName: "query" */ '../views/meihua/YiLi.vue'),
  },
  {
    path: '/guaXiang',
    name: 'GuaXiang',
    meta: {
      title: '',
      leftText: '',
      rightText: '',
    },
    component: () =>
      import(/* webpackChunkName: "query" */ '../views/meihua/GuaXiang.vue'),
  },
  {
    path: '/leiXiang',
    name: 'LeiXiang',
    meta: {
      title: '',
      leftText: '',
      rightText: '',
    },
    component: () =>
      import(/* webpackChunkName: "query" */ '../views/meihua/LeiXiang.vue'),
  },
  {
    path: '/star',
    name: 'Star',
    meta: {
      title: '名卦',
      leftText: '',
      rightText: '',
    },
    component: () =>
      import(/* webpackChunkName: "star" */ '../views/meihua/Star.vue'),
  },
  {
    path: '/mine',
    name: 'Mine',
    meta: {
      title: '我的',
      leftText: '',
      rightText: '保存',
    },
    component: () =>
      import(/* webpackChunkName: "mine" */ '../views/meihua/Mine.vue'),
  },
]

export default routes.map((v) => {
  v.meta = v.meta || {}
  v.meta.type = 'meihua'
  return v
})
