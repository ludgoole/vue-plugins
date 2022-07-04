const routes = [
  {
    path: '/',
    redirect: '/psychology/home',
  },
  {
    path: '/home',
    name: 'Psychology',
    meta: {
      title: '心理学',
      leftArrow: true,
      leftText: '',
      rightText: '',
    },
    component: () =>
      import(
        /* webpackChunkName: "psychology" */ '../views/psychology/Home.vue'
      ),
  },
  {
    path: '/branch',
    name: 'Branch',
    component: () =>
      import(
        /* webpackChunkName: "psychology" */ '../views/psychology/Branch.vue'
      ),
  },
  {
    path: '/analysisSpirits',
    name: 'AnalysisSpirits',
    component: () =>
      import(
        /* webpackChunkName: "psychology" */ '../views/psychology/AnalysisSpirits.vue'
      ),
  },
  {
    path: '/analysisPrototype',
    name: 'AnalysisPrototype',
    component: () =>
      import(
        /* webpackChunkName: "psychology" */ '../views/psychology/AnalysisPrototype.vue'
      ),
  },
  {
    path: '/analysisDefence',
    name: 'AnalysisDefence',
    component: () =>
      import(
        /* webpackChunkName: "psychology" */ '../views/psychology/AnalysisDefence.vue'
      ),
  },
  {
    path: '/analysisDream',
    name: 'AnalysisDream',
    component: () =>
      import(
        /* webpackChunkName: "psychology" */ '../views/psychology/AnalysisDream.vue'
      ),
  },
  {
    path: '/recognizeOptimism',
    name: 'RecognizeOptimism',
    component: () =>
      import(
        /* webpackChunkName: "psychology" */ '../views/psychology/RecognizeOptimism.vue'
      ),
  },
  {
    path: '/recognizeBalance',
    name: 'RecognizeBalance',
    component: () =>
      import(
        /* webpackChunkName: "psychology" */ '../views/psychology/RecognizeBalance.vue'
      ),
  },
  {
    path: '/actionReflection',
    name: 'ActionReflection',
    component: () =>
      import(
        /* webpackChunkName: "psychology" */ '../views/psychology/ActionReflection.vue'
      ),
  },
  {
    path: '/actionExpression',
    name: 'ActionExpression',
    component: () =>
      import(
        /* webpackChunkName: "psychology" */ '../views/psychology/ActionExpression.vue'
      ),
  },
  {
    path: '/actionBehavior',
    name: 'ActionBehavior',
    component: () =>
      import(
        /* webpackChunkName: "psychology" */ '../views/psychology/ActionBehavior.vue'
      ),
  },
  {
    path: '/actionLie',
    name: 'ActionLie',
    component: () =>
      import(
        /* webpackChunkName: "psychology" */ '../views/psychology/ActionLie.vue'
      ),
  },
]

export default routes.map((v) => {
  v.path = '/psychology' + v.path
  return v
})
