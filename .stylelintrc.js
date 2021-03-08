module.exports = {
  // 扩展第三方插件规范stylelint-config-standard
  extends: 'stylelint-config-standard',
  rules: {
    'function-url-quotes': 'always',
    indentation: 4, //缩进4位
    'number-leading-zero': null,
    'unit-whitelist': ['em', 'rem', 's', '%', 'px', 'deg'],
    'unit-case': 'lower'
  }
}
