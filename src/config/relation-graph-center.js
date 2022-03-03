export default {
  // backgrounImage: 'http://ai-mark.cn/images/ai-mark-desc.png',
  // backgrounImageNoRepeat: true,
  layouts: [
    {
      label: '中心',
      layoutName: 'center',
      layoutClassName: 'seeks-layout-center',
      min_per_width: '90',
      distance_coefficient: 1
    }
  ],
  defaultLineMarker: {
    markerWidth: 12,
    markerHeight: 12,
    refX: 6,
    refY: 6,
    data: 'M2,2 L10,6 L2,10 L6,6 L2,2'
  },
  defaultLineShape: 0,
  defaultJunctionPoint: 'border',
  defaultNodeShape: 0,
  // defaultNodeWidth: '40',
  // defaultNodeHeight: '40',
  defaultNodeBorderWidth: 2,
  defaultNodeColor: 'rgba(250, 212, 0, 0.5)',
  defaultNodeBorderColor: '#FAD400',
  defaultNodeFontColor: 'rgba(0, 0, 0, 1)',
  defaultShowLineLabel: true,
  allowShowMiniView: false,
  isMoveByParentNode: true,
  hideNodeContentByZoom: false,
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  allowShowMiniNameFilter: true
}
