module.exports = {
  plugins: ["@babel/plugin-syntax-dynamic-import"],
  presets: ['@babel/preset-env'],
  env: {
    test: {
      plugins: [
        "dynamic-import-node"
      ]
    }
  }
};
