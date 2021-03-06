<!--
 * @Author: daipeng
 * @Date: 2019-12-17 16:02:45
 * @LastEditors: daipeng7
 * @LastEditTime: 2021-12-14 15:45:07
 * @Description: 
 -->
## vue 项目模版
### 1、安装、运行
```js
npm i 或者 yarn install

"scripts": {
    "start": "npm run dev",
    "dev": "node ./build/dev.js",
    "build": "node ./build/build.js", // 打包
    "analyz": "NODE_ENV=production npm_config_report=true npm run build", // 查看打包情况
}
```

### 2、目录结构说明
```js
- build // 构建目录
- cofig // 构建配置目录
- dll // 动态链接文件目录，主要是放一些不常改变的插件，可以提高打包速度，该目录是自动生成
    - vue // vue 相关不变的项目插件，vue vuex vue-router等
    - utils  // 工具型不变插件，axios lodash date-fns等
- pm2	// pm2相关配置
- lib // 项目打包等一些的工具包目录
- public // 存放一些公共资源，用于项目构建用，这些资源不会被copy到dist中去
- server // 前端web服务目录
- src // 项目源码目录
    - assets // 静态资源目录
        - iconfont // 字体图标目录，非必须，如果有，会自动生成字体表到style目录下的iconfont目录中
        - images // 存放项目图片资源
        - sprite // 雪碧图目录，非必须，如果有会打包到style目录下的sprite目录中, 打包规则是以目录为准，具体查看config/webpack.base.config.js
    - commponents // 项目级公共组件，建议每个组件一个文件夹，且使用大写字母开头
    - directive // 指令注册目录，如v-scroll v-copy等，尽可能使用指令，以简化流程
    - fetch // 请求封装目录
        - apiMap.js // 接口map文件
        - index.js // 对外输出方法文件
        - request.js // 核心封装文件，如果不想使用axios可在这里修改
        - status // 接口响应状态码定义页面，主要是为了在request.js中的拦截器使用
    - filter // 过滤器注册目录，针对一些需要格式化展示数据的方法可以注册过滤器
    - global // 用于在vue实例上挂载方法等需要全局操作的目录
    - mixins // vue 的mixins存放目录
    - plugins // vue 插件注册目录，默认vue-lazyload 图片懒加载插件，具体使用查看https://www.npmjs.com/package/vue-lazyload
    - router // 路由目录
    - static // 会被copy到dist/static中的资源目录
    - store // vuex插件下的store管理目录
    - style // 样式目录，使用sass
        - core // 核心目录，一些sass的变量、function、mixin等，已经通过loader隐藏注入到vue文件中，不需要再手动引入
            - function // sass的方法，这样在vue文件的style等可以使用过sass的方法，如 color(read);
            - mixin // sass的mixin，混合，这样在vue文件的style等可以使用，如 @include ellipsis();
            - _color.scss // 颜色常量，尽量在项目中使用这里面的颜色，如 colore: $color(red) 或者 color: color(red) 方法型，最好不要 color: ff0000;
            - _function.scss // sass方法文件
            - 。。。
        - iconfont // 非必须，生成的字体图标目录，目前需要手动引入到_core/_index.scss这样就可以在所有的地方使用包括vue文件style标签中
        - sprite // 非必须，生成的雪碧图目录，目前需要手动引入到_core/_index.scss这样就可以在所有的地方使用包括vue文件style标签中
        - _index.scss // 主样式文件
        - normalize.scss // 统一浏览器默认样式
    - utils // 工具目录，lodash date-fns也被统一进去了
    - views // 页面目录
    - App.vue // 项目入口根页面，用途：1、展示功能，可以用来做应用入口动画、广告等；2、逻辑功能，因为是刷新、第一次访问的必经页面、且只有一次，可以用来调用初始化应用的一些基础数据、恢复用户状态、判断是否登录、判断是否跳页等
    - main.js // 应用的入口js文件，用来初始化vue应用，执行一些前置脚本

```

### 3、构建配置介绍
```js
- build
    - build // 生产构建脚本
    - dev // 开发构建脚本
    - dll // dll构建脚本
- config
    - index.js // 基础配置
    - webpack.base.config.js // 构建的基础配置
    - webpack.dev.config.js // 开发环境构建配置
    - webpack.dll.config.js // dll构建配置
    - webpack.prod.config.js // 生产环境构建配置
```
```js
// config/index.js
const path = require('path');

module.exports = {
	default: {
        isPc: false, // 是否是pc网站
		assetsRoot: path.resolve(__dirname, '../dist'),// 打包输出根路径
		assetsDllDirectory: 'static/dll', // dll 目录
		assetsJSDirectory: 'static/js', // js 目录
		assetsCSSDirectory: 'static/css', // css 目录
		assetsSubDirectory: 'static', // 静态资源目录
		// dll文件输出目录
        dllPath: path.resolve(__dirname, '../dll'),
        // 是否使用postcss
        usePostCSS: true,
        // px转换为rem的配置
		// 默认为false,不将px转化为rem。
		px2rem: {
			designWidth: 750, // 设计稿宽度
			rootValue: 40, // 设计稿根元素字体大小， 也可以设置{ px: 50, rpx: 100 }
			unitPrecision: 5, // 转化为rem的精度
			propWhiteList: [], // 白名单，默认为空所有的选择器的属性单位都转换
			propBlackList: [], // 黑名单，排除哪些选择器的属性单位不被转换
			exclude: false, // 排除文件夹
			selectorBlackList: [], // 选择器黑名单
			ignoreIdentifier: false, // 需要排除的标识符
			replace: true, // 是否替换
			mediaQuery: false, // 允许在media中转换
			minPixelValue: 1 // 最小转换数
		}
	},
	dev: {
		// Paths
		proxyTable: {
			'/api': {
				// target: 'http://47.98.152.225:5010',
				target: 'http://172.16.25.136:5010',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
		host: '0.0.0.0',
		port: 8099, // 会覆盖process.env.PORT
		autoOpenBrowser: true,
		errorOverlay: true,
		notifyOnErrors: true,
		showSpeed: true,
		poll: false, // webpack watch模式

		// 使用eslint
		useEslint: true,
		// 如果为true，则eslint错误和警告也将显示在浏览器中。
		showEslintErrorsInOverlay: false,

		/**
		 * Source Maps
		 */
		devtool: 'cheap-module-eval-source-map',

		// If you have problems debugging vue-files in devtools,
		// set this to false - it *may* help
		// https://vue-loader.vuejs.org/en/options.html#cachebusting
		cacheBusting: true,

		cssSourceMap: true
	},

	build: {
		// Template for index.html
		index: path.resolve(__dirname, '../dist/index.html'),

		/**
		 * Source Maps
		 */
		cssSourceMap: true,
		productionSourceMap: false,
		// https://webpack.js.org/configuration/devtool/#production
		devtool: '#source-map',
		productionGzipExtensions: ['js', 'css'],

		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	}
};
```