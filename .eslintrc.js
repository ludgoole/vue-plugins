module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['vue'],
  extends: ['plugin:vue/essential', '@vue/standard', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 允许函数前没有空格
    // 'space-before-function-paren': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  globals: {
    // 指定全局变量并不允许改写
    _: true,
    localforage: true
  }
}
