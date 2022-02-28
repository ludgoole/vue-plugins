import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import plugin from 'windicss/plugin'

export default defineConfig({
  attributify: true, // 属性模式
  extract: {
    // 扫描文件范围
    include: ['src/**/*.{vue, html}'],
    // 忽略扫描文件夹
    exclude: ['node_modules', 'node_modules_12', '.git', 'dist', 'widget']
  },
  shortcuts: {
    // 示例
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'flex-center': 'flex items-center justify-center'
  },
  theme: {
    extend: {
      colors: {
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia
      }
    }
  },
  plugins: [
    plugin(({ addComponents }) => {
      const buttons = {
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600'
        },
        '.btn-blue': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd'
          }
        },
        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a'
          }
        }
      }
      addComponents(buttons)
    })
  ]
})
