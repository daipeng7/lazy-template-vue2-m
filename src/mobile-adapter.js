/*
 * @Author: daipeng7
 * @Date: 2021-12-14 15:21:55
 * @LastEditTime: 2021-12-14 15:26:16
 * @LastEditors: daipeng7
 * @Description: 移动端适配设置
 */
import 'amfe-flexible';
import FastClick from 'fastclick';
import Vue from 'vue';

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

const notNeed = FastClick.notNeeded(document.body);
Vue.prototype.iosClick = function (dom) {
	dom.click();
	if (!notNeed) {
		dom.click();
	}
};
