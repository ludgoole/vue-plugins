import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  attributify: true, // 属性模式
  prefixer: false, // 是否需要自动兼容平台浏览器（不需要）
  prefix: 'c-', // 类名样式前缀（防止样式污染）
  extract: {
    // 扫描文件范围
    include: ['src/**/*.{vue, html}'],
    // 忽略扫描文件夹
    exclude: ['node_modules', 'node_modules_12', '.git', 'dist', 'widget']
  },
  // shortcuts className 不需要加前缀
  shortcuts: {
    // 示例
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'flex-center': 'flex items-center justify-center'
  },
  theme: {
    screens: null, // 媒体查询（不需要）
    animationTimingFunction: null, // 动画渲染函数（不需要）
    extend: {}
  },
  plugins: []
})
