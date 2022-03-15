export default [
  {
    id: '12-00',
    text: '赵弘殷'
  },
  {
    id: '12-01',
    text: '宋太祖 赵匡胤',
    parentId: '12-00'
  },
  {
    id: '12-02',
    text: '宋太宗 赵光义',
    parentId: '12-00'
  },
  {
    id: '12-03',
    text: '宋真宗 赵恒',
    parentId: '12-02'
  },
  {
    id: '12-04',
    text: '宋仁宗 赵祯',
    parentId: '12-03',
    isEnd: true
  },
  {
    id: '12-05',
    text: '宋英宗 赵曙',
    relation: '养子',
    parentId: '12-04'
  },
  {
    id: '12-06',
    text: '宋神宗 赵顼',
    parentId: '12-05'
  },
  {
    id: '12-07',
    text: '宋哲宗 赵煦',
    parentId: '12-06',
    isEnd: true
  },
  {
    id: '12-08',
    text: '宋徽宗 赵佶',
    parentId: '12-06'
  },
  {
    id: '12-09',
    text: '宋钦宗 赵桓',
    parentId: '12-08',
    isEnd: true
  },
  {
    id: '12-10',
    text: '宋高宗 赵构',
    parentId: '12-08',
    isEnd: true
  },
  {
    id: '12-11',
    text: '宋孝宗 赵昚(shèn)',
    ancestors: '12-01',
    relation: '七世孙'
  },
  {
    id: '12-12',
    text: '宋光宗 赵惇',
    parentId: '12-11'
  },
  {
    id: '12-13',
    text: '宋宁宗 赵扩',
    parentId: '12-12',
    isEnd: true
  },
  {
    id: '12-14',
    text: '宋理宗 赵昀(yún)',
    ancestors: '12-01',
    relation: '十世孙'
  },
  {
    id: '12-15',
    text: '宋度宗 赵禥(qí)',
    parentId: '12-14',
    relation: '养子'
  },
  {
    id: '12-16',
    text: '宋恭帝 赵隰(xí)',
    parentId: '12-15',
    isEnd: true
  },
  {
    id: '12-17',
    text: '宋端宗 赵昰(shì)',
    parentId: '12-15',
    isEnd: true
  },
  {
    id: '12-18',
    text: '宋卫王 赵昺(bǐng)',
    parentId: '12-15',
    isEnd: true
  }
]
