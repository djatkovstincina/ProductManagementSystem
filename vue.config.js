const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // Add any vuetify-specific options here
    }
  },

  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map'
  },

  css: {
    sourceMap: process.env.NODE_ENV !== 'production'
  }
});
