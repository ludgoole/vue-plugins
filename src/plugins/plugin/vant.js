// 按需引入 VantUI 组件
// Tips: 配置按需引入后，将不允许直接导入所有组件。
import {
  Toast,
  Button,
  Icon,
  NavBar,
  Grid,
  GridItem,
  Form,
  Field,
  Collapse,
  CollapseItem,
  Tab,
  Tabs,
  Cell,
  CellGroup,
  Search,
  SwipeCell,
  Tag
} from 'vant'
const components = [
  Button,
  Icon,
  NavBar,
  Grid,
  GridItem,
  Form,
  Field,
  Collapse,
  CollapseItem,
  Tab,
  Tabs,
  Cell,
  CellGroup,
  Search,
  SwipeCell,
  Tag
]
function installPlugin(Vue) {
  components.forEach(component => Vue.use(component))
  Vue.prototype.$toast = Toast
}

export default { installPlugin }
