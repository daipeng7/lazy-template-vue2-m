/*
 * @Author:
 * @Date: 2018-09-17 09:58:57
 * @LastEditors: VSCode
 * @LastEditTime: 2020-07-17 10:44:25
 * @Description: 静态资源服务器（nodejs）
 */
const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const compression = require('compression');
const proxy = require('http-proxy-middleware');

const PORT = process.env.PORT || 8093;
const app = express();

app.use(proxy('/api', {
	target: process.env.PROXY_HOST,
	changeOrigin: true,
	pathRewrite: { '^/api': '' }
}));

app.use(compression());

app.use(history({
	// disableDotRule: true,
	verbose: false
	// logger: console.log.bind(console)
}));
// 设置静态文件路径
app.use(express.static(path.resolve('./dist'), { index: ['index.html', 'index.htm'] }));

app.listen(PORT, '0.0.0.0', function() {
	console.log('启动成功！');
});
