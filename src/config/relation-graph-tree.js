export default {
  // backgrounImage: 'http://ai-mark.cn/images/ai-mark-desc.png',
  // backgrounImageNoRepeat: true,
  layouts: [
    {
      label: '中心',
      layoutName: 'tree',
      layoutClassName: 'seeks-layout-center',
      defaultJunctionPoint: 'border',
      defaultNodeShape: 0,
      defaultLineShape: 1,
      min_per_width: '120',
      min_per_height: '140'
    }
  ],
  defaultLineMarker: {
    markerWidth: 12,
    markerHeight: 12,
    refX: 6,
    refY: 6,
    data: 'M2,2 L10,6 L2,10 L6,6 L2,2'
  },
  defaultLineShape: 4,
  defaultJunctionPoint: 'tb',
  defaultNodeShape: 1,
  defaultNodeBorderWidth: 2,
  defaultNodeColor: 'rgba(250, 212, 0, 0.5)',
  defaultNodeBorderColor: '#FAD400',
  defaultNodeFontColor: 'rgba(0, 0, 0, 1)',
  defaultShowLineLabel: true,
  allowShowMiniView: false,
  isMoveByParentNode: true,
  hideNodeContentByZoom: true,
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: false,
  allowShowMiniNameFilter: false
}
