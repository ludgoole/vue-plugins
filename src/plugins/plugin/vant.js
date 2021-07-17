// 按需引入 VantUI 组件
// Tips: 配置按需引入后，将不允许直接导入所有组件。

import {
  List,
  Toast,
  Search,
  Tabbar,
  TabbarItem,
  Button,
  Tab,
  Tabs,
  Col,
  Row,
  DropdownMenu,
  DropdownItem,
  TreeSelect,
  Image as VanImage,
  Lazyload,
  Empty,
  Cell,
  CellGroup,
  Popup,
  Picker,
  Divider,
  Pagination,
  Field,
  Collapse,
  CollapseItem,
  Form,
  DatetimePicker,
  Loading,
  Overlay
} from 'vant'
const components = [
  List,
  Toast,
  Search,
  Tabbar,
  TabbarItem,
  Button,
  Tab,
  Tabs,
  Col,
  Row,
  DropdownMenu,
  DropdownItem,
  TreeSelect,
  VanImage,
  Lazyload,
  Empty,
  Cell,
  CellGroup,
  Popup,
  Picker,
  Divider,
  Pagination,
  Field,
  Collapse,
  CollapseItem,
  Form,
  DatetimePicker,
  Loading,
  Overlay
]
function installPlugin(Vue) {
  components.forEach(component => Vue.use(component))
}

export default { installPlugin }
