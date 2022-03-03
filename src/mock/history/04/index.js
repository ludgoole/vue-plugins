export default [
  {
    id: '04-01',
    text: '秦非子'
  },
  {
    id: '04-05',
    text: '秦庄公',
    parentId: '04-04',
    ancestors: '04-01'
  },
  {
    id: '04-06',
    text: '秦襄公',
    parentId: '04-05'
  },
  {
    id: '04-15',
    text: '秦穆公',
    parentId: '04-12',
    ancestors: '04-06',
    data: {
      a: 1
    }
  },
  {
    id: '04-32',
    text: '秦孝公',
    parentId: '04-31',
    ancestors: '04-15'
  },
  {
    id: '04-33',
    text: '秦惠文王',
    parentId: '04-32'
  },
  {
    id: '04-34',
    text: '秦武王',
    parentId: '04-33',
    isEnd: true
  },
  {
    id: '04-35',
    text: '秦昭襄王',
    parentId: '04-33'
  },
  {
    id: '04-36',
    text: '秦孝文王',
    parentId: '04-35'
  },
  {
    id: '04-37',
    text: '秦庄襄王',
    parentId: '04-36'
  },
  {
    id: '04-38',
    text: '秦王',
    parentId: '04-37',
    isEnd: true
  }
]
