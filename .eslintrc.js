module.exports = {
  env: {
    es6: true,
    node: true
  },
  plugins: ["prettier"],
  extends: "eslint:recommended",
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    "prettier/prettier": "error",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": 0
  }
};
