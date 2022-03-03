const people = [
  {
    id: '04-38',
    text: '秦始皇'
  },
  {
    id: '04-38-01',
    text: '赵高',
    relation: '中书令'
  },
  {
    id: '04-38-02',
    text: '李斯',
    relation: '丞相'
  },
  {
    id: '04-38-03',
    text: '蒙恬',
    relation: '将军'
  },
  {
    id: '04-38-04',
    text: '胡亥',
    relation: '儿子'
  },
  {
    id: '04-38-05',
    text: '吕不韦',
    relation: '仲父'
  },
  {
    id: '04-38-06',
    text: '赵姬',
    relation: '母亲'
  }
]

// id递增
export default people
// .map((v, i) => {
//   v.id += ('00' + i).slice(-2)
//   return v
// })
