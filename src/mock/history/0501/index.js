export default [
  {
    id: '0501-01',
    text: '汉高祖 刘邦'
  },
  {
    id: '0501-02',
    text: '汉惠帝 刘盈',
    parentId: '0501-01'
  },
  {
    id: '0501-03',
    text: '汉文帝 刘恒',
    parentId: '0501-02'
  },
  {
    id: '0501-04',
    text: '汉景帝 刘启',
    parentId: '0501-03'
  },
  {
    id: '0501-05',
    text: '汉武帝 刘彻',
    parentId: '0501-04'
  },
  {
    id: '0501-0501',
    text: '太子 刘据',
    parentId: '0501-05'
  },
  {
    id: '0501-06',
    text: '汉昭帝 刘弗陵',
    parentId: '0501-05',
    isEnd: true
  },
  {
    id: '0501-07',
    text: '汉宣帝 刘询',
    relation: '孙子',
    ancestors: '0501-0501'
  },
  {
    id: '0501-08',
    text: '汉元帝 刘奭(shì)',
    parentId: '0501-07'
  },
  {
    id: '0501-0802',
    text: '定陶王 刘糠',
    parentId: '0501-07'
  },
  {
    id: '0501-09',
    text: '汉成帝 刘骜(ào)',
    parentId: '0501-08'
  },
  {
    id: '0501-10',
    text: '汉哀帝 刘欣',
    parentId: '0501-0802',
    isEnd: true
  },
  {
    id: '0501-11',
    text: '汉平帝 刘衎(kàn)',
    ancestors: '0501-09',
    relation: '孙子',
    isEnd: true
  }
]
