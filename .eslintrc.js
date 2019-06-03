module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // 'standard',
    // 'eslint:recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {    
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // "no-unused-vars": [2, {
    //   // 允许声明未使用变量
    //   "vars": "local",
    //   // 参数不检查
    //   "args": "none"    
    // }],
    // 关闭语句强制分号结尾
    'semi': ["error", "never"],
    // 空行
    'no-multiple-empty-lines': [2, { 'max': 2, 'maxBOF': 1 }],
    // 关闭禁止混用tab和空格
    'no-mixed-spaces-and-tabs': [0],
    // 缩进风格
    'indent': ['error', 2],
    // 对象字面量中冒号的前后空格
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true,"mode": "strict" }],
    // 关闭多余留白
    'no-trailing-spaces': ['error',{"skipBlankLines": true,"ignoreComments": true}],
    // 禁止连续赋值
    'no-multi-assign': "error",
    // 使用单引号
    'quotes': ["error", "single",{"avoidEscape": true,"allowTemplateLiterals": true}],
    // function与括号空格
    'space-before-function-paren': "error",
    // 禁止拖尾逗号
    'comma-dangle': ["error", "never"],
    // 文件末尾至少1行
    'eol-last': ["error", "always"],
    // 禁止在箭头函数体之前出现换行
    'implicit-arrow-linebreak': ["error", "beside"],
    // 行注释位置单独成行
    'line-comment-position': ["error", { "position": "above" }],
    // 行注释后必须跟随至少一个空白
    'spaced-comment': ["error", "always"]
  }
}
