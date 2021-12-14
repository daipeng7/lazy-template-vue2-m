/*
 * @Author: daipeng7
 * @Date: 2021-12-14 15:27:06
 * @LastEditors: daipeng7
 * @LastEditTime: 2021-12-14 15:31:30
 * @Description: webpack 共用基础配置
 */
const path = require('path');
const fs = require('fs');
const utils = require('./utils');
const config = require('./index');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');

const { resolve, createLintingRule, hasPackagePlugin } = utils;
const isProduction = process.env.NODE_ENV === 'production';
const cssMapEnabled = isProduction ? config.build.cssSourceMap : config.dev.cssSourceMap;

const needIconFont = fs.existsSync(resolve('src/assets/iconfont'));
const { assetsRoot, assetsCSSDirectory, assetsJSDirectory, usePostCSS, px2rem, projectTitle } = config.default;

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: {
		app: [
			// 如果为移动端添加
			'./src/mobile-adapter.js',
			'./src/main.js'
		].filter(Boolean)
	},
	output: {
		path: assetsRoot, // 输出结果根目录，一般为dist
		publicPath: '/', // js输出相对于dist的路径，在html中script标签引入的时候会向前追加该相对路径
		filename: `${assetsJSDirectory}${path.sep}[name].[hash].js`, // 输出的js相对预dist的路径
		chunkFilename: `${assetsJSDirectory}${path.sep}[name].[chunkhash].js` // 输出的js相对预dist的路径
	},
	resolve: {
		extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	},
	module: {
		rules: [
			...(config.dev.useEslint ? [createLintingRule()] : []),
			...utils.styleLoaders({
				sourceMap: cssMapEnabled,
				usePostCSS: usePostCSS,
				extract: isProduction,
				// 注入sass配置
				prependData: ['@import "~@/style/core/index.scss";'].join('\n')
			}),
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					cssSourceMap: cssMapEnabled,
					cacheBusting: config.dev.cacheBusting,
					hotReload: !isProduction,
					transformAssetUrls: {
						video: ['src', 'poster'],
						source: 'src',
						img: 'src',
						image: ['xlink:href', 'href'],
						use: ['xlink:href', 'href']
					}
				}
			},
			{
				test: /\.js$/,
				use: 'happypack/loader?id=babel',
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
				exclude: file => (/node_modules/.test(file) && !/\.vue\.js/.test(file))
			},
			{
				test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					fallback: {
						loader: 'file-loader',
						options: {
							name: utils.assetsPath('images/[name].[hash:7].[ext]')
						}
					}
				}
			},
			{
				test: /\.(svg)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					name: utils.assetsPath('images/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					fallback: {
						loader: 'file-loader',
						options: {
							name: utils.assetsPath('media/[name].[hash:7].[ext]')
						}
					}
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					fallback: {
						loader: 'file-loader',
						options: {
							name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
						}
					}
				}
			}
		]
	},
	plugins: [
		// 严格检查模块路径大小写
		new CaseSensitivePathsPlugin(),
		// 将.js/.css等规则应用到.vue文件中的<script>和<style>内容中
		new VueLoaderPlugin(),
		new HappyPack({
			id: 'babel',
			loaders: ['cache-loader', 'babel-loader']
		}),
		// index.html模版配置
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: utils.resolve('./public/index.html'),
			inject: true,
			minify: {
				removeComments: isProduction,
				collapseWhitespace: isProduction,
				removeAttributeQuotes: isProduction
			},
			chunksSortMode: 'dependency'
		}),
		// 检查如果有字体图标文件夹，自动生成字体图标
		needIconFont && new WebpackIconfontPluginNodejs({
			fontName: 'custom-iconfont',
			svgs: resolve('./src/assets/iconfont/*.svg'),
			fontsOutput: resolve('./src/style/iconfont/fonts/'),
			cssOutput: resolve('./src/style/iconfont/iconfont.[hash:5].css'),
			jsOutput: false,
			htmlOutput: false,
			template: 'scss',
			cssPrefix: 'iconfont'
		}),
		isProduction && new MiniCssExtractPlugin({
			filename: `${assetsCSSDirectory}${path.sep}[name].[hash].css`,
			chunkFilename: `${assetsCSSDirectory}${path.sep}[id].[hash].css`
		})
	].filter(Boolean),
	node: {
		setImmediate: false,
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	}
};
