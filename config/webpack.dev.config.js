/*
 * @Author: daipeng7
 * @Date: 2021-12-14 13:51:15
 * @LastEditTime: 2021-12-14 15:31:13
 * @LastEditors: daipeng7
 * @Description: development 环境配置
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.config');
const config = require('./index');
const utils = require('./utils');
process.env.NODE_ENV = 'development';

const webpackConfig = merge(baseWebpackConfig, {
	name: 'development',
	mode: 'development',
	devtool: config.dev.devtool,

	plugins: [
		new webpack.DefinePlugin({
			'process.env': require('./env/dev.env')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new CopyWebpackPlugin([
			{
				from: utils.resolve('./src/static'),
				to: config.default.assetsSubDirectory,
				ignore: ['.*']
			}
		]),
		new CopyWebpackPlugin([
			{
				from: utils.resolve('./assests'),
				to: config.default.assetsRoot,
				ignore: ['.*']
			}
		])
	]
});

module.exports = webpackConfig;
