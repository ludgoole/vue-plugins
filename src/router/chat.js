const routes = [
  {
    path: '/chat',
    name: 'Chat',
    meta: {
      title: '聊天',
      leftArrow: true,
      leftText: '',
      rightText: ''
    },
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/chat/Chat.vue')
  }
]

export default routes
