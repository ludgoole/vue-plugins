export default [
  {
    id: '11-01',
    text: '后梁太祖 朱温'
  },
  {
    id: '11-02',
    text: '后梁末帝 朱友贞',
    parentId: '11-01'
  },
  {
    id: '11-03',
    text: '后唐庄宗 李存勖',
    parentId: '11-02',
    relation: '晋王'
  },
  {
    id: '11-04',
    text: '后唐明宗 李嗣源',
    parentId: '11-03'
  },
  {
    id: '11-05',
    text: '后唐末帝 李从珂',
    relation: '义子',
    parentId: '11-04'
  },
  {
    id: '11-06',
    text: '后晋高祖 石敬瑭',
    parentId: '11-05',
    relation: '节度使'
  },
  {
    id: '11-07',
    text: '后晋出帝 石重贵',
    parentId: '11-06'
  },
  {
    id: '11-08',
    text: '后汉高祖 刘知远',
    parentId: '11-07',
    relation: '中书令'
  },
  {
    id: '11-09',
    text: '后汉隐帝 刘承祐',
    parentId: '11-08'
  },
  {
    id: '11-10',
    text: '后周太祖 郭威',
    parentId: '11-09',
    relation: '节度使'
  },
  {
    id: '11-11',
    text: '后周世宗 柴荣',
    parentId: '11-10',
    relation: '养子子',
    isEnd: true
  }
]
