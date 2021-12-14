/*
 * @Author:
 * @Date: 2019-10-11 15:52:11
 * @LastEditors: daipeng7
 * @LastEditTime: 2021-12-14 13:59:00
 * @Description: vue过滤器文件
 */
import { dateFormat, toChinesNum } from '@/utils';
import store from '@/store';

// 账号密码过滤器
export const accountPasswordFilter = (value) => {
	return /^\w{6,23}$/ig.test(value);
};

// 日期格式化过滤器
export const dateFormatFilter = (time, fmt = 'yyyy-MM-dd HH:mm:ss', dft = '') => {
	if (!time) return dft;
	return dateFormat(time, fmt);
};

// 性别
export const genderFilter = (type) => {
	return +type === 1 ? '男' : '女';
};

// cdn资源地址
export const cdnFilter = (path = '', domain = store.state.app.siteConfig.cdn) => {
	if (!path) return path;
	return `${domain}/${path}`;
};

export const initFilter = (Vue) => {
	[
		{ name: 'accountPasswordFilter', fn: accountPasswordFilter },
		{ name: 'dateFormat', fn: dateFormatFilter },
		{ name: 'gender', fn: genderFilter },
		{ name: 'cdnFormat', fn: cdnFilter }
	].forEach(item => {
		Vue.filter(item.name, item.fn);
	});
};
