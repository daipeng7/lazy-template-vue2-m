/*
 * @Author: daipeng7
 * @Date: 2021-12-14 13:51:15
 * @LastEditTime: 2021-12-14 15:32:52
 * @LastEditors: daipeng7
 * @Description: 环境变量
 */
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"'
});
