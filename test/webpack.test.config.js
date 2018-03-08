// This is the webpack config used for unit tests.

var webpack = require('webpack')
var merge = require('webpack-merge')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var webpackConfig = merge({}, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: []
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
