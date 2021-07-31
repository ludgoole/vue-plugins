import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/question'
  },
  {
    path: '/question',
    name: 'Question',
    meta: {
      title: '卜卦',
      leftText: '',
      rightText: ''
    },
    component: () =>
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      import(/* webpackChunkName: "question" */ '../views/Question.vue')
  },
  {
    path: '/answer',
    name: 'Answer',
    component: () =>
      import(/* webpackChunkName: "question" */ '../views/Answer.vue')
  },
  {
    path: '/query',
    name: 'Query',
    meta: {
      title: '查卦',
      leftText: '',
      rightText: ''
    },
    component: () =>
      import(/* webpackChunkName: "query" */ '../views/Query.vue')
  },
  {
    path: '/guaXiang',
    name: 'GuaXiang',
    meta: {
      title: '',
      leftText: '',
      rightText: ''
    },
    component: () =>
      import(/* webpackChunkName: "query" */ '../views/GuaXiang.vue')
  },
  {
    path: '/star',
    name: 'Star',
    meta: {
      title: '名卦',
      leftText: '',
      rightText: ''
    },
    component: () => import(/* webpackChunkName: "star" */ '../views/Star.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    meta: {
      title: '我的',
      leftText: '',
      rightText: '清除'
    },
    component: () => import(/* webpackChunkName: "mine" */ '../views/Mine.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
