export default [
  {
    id: '0503-01',
    text: '汉光武帝 刘秀'
  },
  {
    id: '0503-02',
    text: '汉明帝 刘庄',
    parentId: '0503-01'
  },
  {
    id: '0503-03',
    text: '汉章帝 刘炟(dá)',
    parentId: '0503-02'
  },
  {
    id: '0503-04',
    text: '汉和帝 刘肇(zhào)',
    parentId: '0503-03'
  },
  {
    id: '0503-05',
    text: '汉殇帝 刘隆',
    parentId: '0503-04',
    isEnd: true
  },
  {
    id: '0503-06',
    text: '汉安帝 刘祜(hù)',
    ancestors: '0503-03',
    relation: '孙子'
  },
  {
    id: '0503-07',
    text: '汉顺帝 刘保',
    parentId: '0503-06'
  },
  {
    id: '0503-08',
    text: '汉冲帝 刘炳',
    parentId: '0503-07',
    isEnd: true
  },
  {
    id: '0503-09',
    text: '汉质帝 刘缵(zuǎn)',
    ancestors: '0503-03',
    relation: '玄孙',
    isEnd: true
  },
  {
    id: '0503-10',
    text: '汉桓帝 刘志',
    ancestors: '0503-03',
    relation: '曾孙',
    isEnd: true
  },
  {
    id: '0503-11',
    text: '汉灵帝 刘宏',
    ancestors: '0503-03',
    relation: '玄孙'
  },
  {
    id: '0503-12',
    text: '汉少帝 刘辩',
    parentId: '0503-11',
    isEnd: true
  },
  {
    id: '0503-13',
    text: '汉献帝 刘协',
    parentId: '0503-11',
    isEnd: true
  }
]
