const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

var config = {
  output: {
    path: path.resolve(path.join(__dirname, '/dist/'))
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  externals: {
    lodash: 'lodash',
    'plotly.js': 'plotly.js'
  }
}

module.exports = [
  merge(config, {
    entry: path.resolve(path.join(__dirname, '/src/Plotly.vue')),
    output: {
      filename: 'vue-plotly.min.js',
      libraryTarget: 'umd',
      library: 'vue-plotly',
      umdNamedDefine: true
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: false,
        mangle: true,
        compress: {
          warnings: false
        }
      })
    ]
  }),
  merge(config, {
    entry: path.resolve(path.join(__dirname, '/src/Plotly.vue')),
    output: {
      filename: 'vue-plotly.js',
      libraryTarget: 'umd',
      library: 'vue-plotly',
      umdNamedDefine: true
    }
  })
]
