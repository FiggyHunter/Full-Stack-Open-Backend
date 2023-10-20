module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  ignorePatterns: ["frontend-production", ".eslintrc.cjs"],
  rules: {
    indent: ["error", 2],
    eqeqeq: "error",
    "no-console": 0,
  },
  extends: "eslint:recommended",
};
