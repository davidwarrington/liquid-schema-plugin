const webpack = require('webpack')
const config = require('./webpack.config')

module.exports = (context, pluginConfig, webpackConfig) => webpack(
    config(context, pluginConfig, webpackConfig)
)
