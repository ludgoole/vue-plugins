module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  plugins: ['stylelint-scss'],
  rules: {
    indentation: 2,
    'no-missing-end-of-source-newline': null,
    'max-nesting-depth': 3,
    'selector-max-compound-selectors': 3,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'number-leading-zero': null
  }
}
