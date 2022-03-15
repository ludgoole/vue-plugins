export default [
  {
    id: '10-01',
    text: '唐高祖 李渊'
  },
  {
    id: '10-02',
    text: '唐太宗 李世民',
    parentId: '10-01'
  },
  {
    id: '10-03',
    text: '唐高宗 李治',
    parentId: '10-02'
  },
  {
    id: '10-04',
    text: '唐中宗 李显',
    parentId: '10-03',
    isEnd: true
  },
  {
    id: '10-05',
    text: '唐睿宗 李旦',
    parentId: '10-03'
  },
  {
    id: '10-06',
    text: '武则天',
    parentId: '10-03',
    relation: '皇后',
    isEnd: true
  },
  {
    id: '10-07',
    text: '唐玄宗 李隆基',
    parentId: '10-05'
  },
  {
    id: '10-08',
    text: '唐肃宗 李亨',
    parentId: '10-07'
  },
  {
    id: '10-09',
    text: '唐代宗 李豫',
    parentId: '10-08'
  },
  {
    id: '10-10',
    text: '唐德宗 李适',
    parentId: '10-09'
  },
  {
    id: '10-11',
    text: '唐顺宗 李诵',
    parentId: '10-10'
  },
  {
    id: '10-12',
    text: '唐宪宗 李纯',
    parentId: '10-11'
  },
  {
    id: '10-13',
    text: '唐穆宗 李恒',
    parentId: '10-12'
  },
  {
    id: '10-14',
    text: '唐敬宗 李湛',
    parentId: '10-13',
    isEnd: true
  },
  {
    id: '10-15',
    text: '唐文宗 李昂',
    parentId: '10-13'
  },
  {
    id: '10-16',
    text: '唐武宗 李炎',
    parentId: '10-13',
    isEnd: true
  },
  {
    id: '10-17',
    text: '唐宣宗 李忱(chén)',
    parentId: '10-15',
    isEnd: true
  },
  {
    id: '10-18',
    text: '唐懿宗 李漼(cuǐ)',
    parentId: '10-17'
  },
  {
    id: '10-19',
    text: '唐僖宗 李儇(xuān)',
    parentId: '10-18',
    isEnd: true
  },
  {
    id: '10-20',
    text: '唐昭宗 李晔(yè)',
    parentId: '10-18'
  },
  {
    id: '10-21',
    text: '唐哀帝 李柷(zhù)',
    parentId: '10-20',
    isEnd: true
  }
]
