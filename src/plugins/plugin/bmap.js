import BaiduMap from 'vue-baidu-map'

function installPlugin(Vue) {
  Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: '859d16285fd000feec89e9032513f8bb'
  })
}

export default { installPlugin }
