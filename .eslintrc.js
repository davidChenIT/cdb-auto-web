module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    // "es2021": true,
    'vue/setup-compiler-macros': true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    // 指定ESlint的解析器
    parser: '@typescript-eslint/parser',
    // 允许使用ES语法
    ecmaVersion: 2020,
    // 允许使用import
    sourceType: 'module',
    // 允许解析JSX
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',
    'vue/multi-word-component-names': 0,
    'no-irregular-whitespace': 'off',
    'vue/html-self-closing': 0, // 检测可以自关闭的标签
    'vue/component-name-in-template-casing': ['error', 'kebab-case'], // template内使用组件名称方式
    'vue/html-closing-bracket-spacing': 0, // 闭合标签前空格检测
    'vue/no-use-v-if-with-v-for': 0, // v-for 和 v-if不能同时使用
    'prefer-const': [
      2, // 如果一个变量从不重新分配，使用const声明更好。
      {
        ignoreReadBeforeAssign: false,
      },
    ],
    eqeqeq: 'error',
    '@typescript-eslint/no-explicit-any': ['off'],
    // "@typescript-eslint/no-empty-function": 0,
    // "@typescript-eslint/no-unused-vars": [
    //   "warn",
    //   {
    //     "vars": "all",
    //     "args": "none"
    //   }
    // ]
  },
}
