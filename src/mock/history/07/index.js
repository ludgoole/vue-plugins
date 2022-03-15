export default [
  {
    id: '07-00',
    text: '司马懿'
  },
  {
    id: '07-01',
    text: '晋武帝 司马炎',
    ancestors: '07-00',
    relation: '孙子'
  },
  {
    id: '07-02',
    text: '晋惠帝 司马衷',
    parentId: '07-01',
    isEnd: true
  },
  {
    id: '07-03',
    text: '晋怀帝 司马炽',
    parentId: '07-01',
    isEnd: true
  },
  {
    id: '07-04',
    text: '晋憨帝 司马邺',
    ancestors: '07-01',
    relation: '孙子',
    isEnd: true
  },
  {
    id: '07-05',
    text: '晋元帝 司马睿',
    ancestors: '07-00',
    relation: '曾孙'
  },
  {
    id: '07-06',
    text: '晋明帝 司马绍',
    parentId: '07-05'
  },
  {
    id: '07-07',
    text: '晋成帝 司马衍',
    parentId: '07-06'
  },
  {
    id: '07-08',
    text: '晋康帝 司马岳',
    parentId: '07-06'
  },
  {
    id: '07-09',
    text: '晋穆帝 司马聃',
    parentId: '07-08',
    isEnd: true
  },
  {
    id: '07-10',
    text: '晋哀帝 司马丕',
    parentId: '07-07',
    isEnd: true
  },
  {
    id: '07-11',
    text: '晋废帝 司马奕',
    parentId: '07-07',
    isEnd: true
  },
  {
    id: '07-12',
    text: '晋简文帝 司马昱',
    parentId: '07-05'
  },
  {
    id: '07-13',
    text: '晋孝武帝 司马曜',
    parentId: '07-12'
  },
  {
    id: '07-14',
    text: '晋安帝 司马德宗',
    parentId: '07-13',
    isEnd: true
  },
  {
    id: '07-15',
    text: '晋恭帝 司马德文',
    parentId: '07-13',
    isEnd: true
  }
]
