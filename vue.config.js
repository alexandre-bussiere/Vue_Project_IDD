const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})
module.exports = {
  devServer: {
    port: process.env.VUE_APP_PORT || 8081
  }
};

