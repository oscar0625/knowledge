module.exports = {
  // ESLint 会在所有父级目录里寻找配置文件，一直到根目录。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,

  // 指定要启用的环境，设置为 true。
  env: {
    node: true
  },

  // 定义全局变量
  globals: {
    var1: 'readonly',
    var2: 'writable'
  },

  // 继承已经定义好的配置文件
  extends: ['plugin:vue/essential', '@vue/prettier'],

  // https://cn.eslint.org/docs/rules/
  // 规则 off关闭规则 warn开启规则警告 error开启规则错误
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },

  // 指定你想要支持的 JavaScript 语言选项
  parserOptions: {
    // 解析器
    parser: 'babel-eslint'
  },

  // 为特定类型的文件覆盖通用配置 重新配置
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
