module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html/vue',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss', // 解决stylelint css报错问题
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  rules: {
    // 不验证@未知的名字，为了兼容scss的函数
    'at-rule-no-unknown': null,
    'no-empty-source': null,
    'selector-class-pattern': '.',
    // 禁止低优先级的选择器出现在高优先级的选择器之后。
    'no-descending-specificity': null,
    // 忽略所有scss变量的警告
    'scss/dollar-variable-pattern': [/./, { ignore: 'global' }],
    // mixin变量名支持全部字符
    'scss/at-mixin-pattern': /.+/,
    // 可以使用未知功能
    'function-no-unknown': null,
    // 选择器可以使用未知的伪类
    'selector-pseudo-class-no-unknown': null,
  },
}
