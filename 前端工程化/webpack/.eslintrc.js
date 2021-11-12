module.exports = {
  root: true,
  env: {
    browser: true,
    // es2021: true,
    node: true
  },
  extends: ["eslint:recommended","plugin:prettier/recommended"],
  // 解析器修改 如果使用babel-eslint es2021/ecmaVersion 不必再设置
  parser: "@babel/eslint-parser",
  // parserOptions: {
  //   ecmaVersion: 13,
  //   sourceType: 'module'
  // },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
