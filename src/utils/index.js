/*
 * @Author:
 * @Date: 2019-10-09 19:55:24
 * @LastEditors: daipeng7
 * @LastEditTime: 2021-12-14 14:50:11
 * @Description: utils
 */
import _cloneDeep from 'lodash/cloneDeep';
import _isString from 'lodash/isString';
import _isObject from 'lodash/isObject';
import _debounce from 'lodash/debounce';

export const cloneDeep = _cloneDeep;
export const isString = _isString;
export const isObject = _isObject;
export const debounce = _debounce;

// 检测数据类型
export const objectToString = (type) => Object.prototype.toString.call(type);

/**
 * 校验数据类型
*/

// 汉字正则
export const chineseRegExp = /^[\u2E80-\u9FFF]+$/;

// 是否为汉字
export const isChinese = (str) => chineseRegExp.test(str);

/**
 * 替换url中的参数，如
 *      /user/:userId  ===>  /user/1
 *
 * @param {string} url
 * @param {object} params
 * @returns url
 */
export const replaceUrl = (url, params) => {
	if (!isString(url) || !url || !isObject(params)) return;
	return url.replace(/\/:(\w+)/g, (m, n) => {
		return `/${params[n]}`;
	});
};

/**
 * 时间格式化
 *
 * @param {*} time
 * @param {string} [fmt='yyyy.MM.dd hh:mm:ss']
 * @returns {string}
 */
export const dateFormat = (time, fmt = 'yyyy-MM-dd HH:mm:ss') => {
	let objectDate;
	if (time instanceof Date) objectDate = time;
	else objectDate = new Date(time);

	const o = {
		'M+': objectDate.getMonth() + 1, // 月份
		'd+': objectDate.getDate(), // 日
		'h+': objectDate.getHours(), // 小时
		'm+': objectDate.getMinutes(), // 分
		's+': objectDate.getSeconds(), // 秒
		'q+': Math.floor((objectDate.getMonth() + 3) / 3), // 季度
		S: objectDate.getMilliseconds() // 毫秒
	};
	  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (objectDate.getFullYear() + '').substr(4 - RegExp.$1.length)); }
	  for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); }
	}
	return fmt;
};

/**
 * @description 过空字符串
 * @param {object} data
 * @param {boolean} data
 * @returns
 */
export const filterEmptyString = (data, isString = false) => {
	if (isObject(data)) {
		Object.keys(data).forEach(key => {
			if (data[key] === null || (isString && data[key] === '')) Reflect.deleteProperty(data, key);
			else if (isObject(data[key])) data[key] = filterEmptyString(data[key]);
		});
	}
	return data;
};

/**
 * @description 给url加时间戳
 * @param {string} url 地址
 * @returns {string}
 */
export const addTimestamp = (url) => {
	const timestamp = new Date().getTime();
	if (/\?+/.test(url)) return `${url.split('?')[0]}?time=${timestamp}`;
	else return `${url}?time=${timestamp}`;
};

/**
 * @description: 加载js文件
 * @param {String} path	地址
 * @return {Promise}
 */
export const loadJS = (path = '') => {
	if (!path) return Promise.reject(Error('请传入地址'));
	return new Promise((resolve, reject) => {
		const scriptDOM = document.createElement('script');
		scriptDOM.type = 'text/javascript';
		scriptDOM.src = path;
		document.getElementsByTagName('head')[0].appendChild(scriptDOM);
		scriptDOM.onload = resolve;
		scriptDOM.onerror = reject;
	});
};

// 去除空
export const filterNull = (obj = {}) => {
	Object.keys(obj).forEach(key => {
		if (obj[key] === null) Reflect.deleteProperty(obj, key);
	});
	return obj;
};

// 获取后缀
export const getSuffix = (path = '') => {
	return path.replace(/(.+\.)(?=\w+$)/, '');
};

// 数字转中文
export const toChinesNum = (num) => {
	const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
	const unit = ['', '十', '百', '千', '万'];
	num = parseInt(num);
	const getWan = (temp) => {
		const strArr = temp.toString().split('').reverse();
		let newNum = '';
		for (var i = 0; i < strArr.length; i++) {
			newNum = (i === 0 && strArr[i] === 0 ? '' : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? '' : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i]))) + newNum;
		}
		return newNum;
	};
	const overWan = Math.floor(num / 10000);
	let noWan = num % 10000;
	if (noWan.toString().length < 4) noWan = '0' + noWan;
	return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num);
};

// 最大余额算法
// valueList要计算的数组
// idx要计算数组中值的下表
// precision百分比保留几位小数
export const getPercentValue = function(valueList, idx, precision = 2) {
	// 判断是否为空
	if (!valueList[idx]) {
		return 0;
	}
	// 求和
	const sum = valueList.reduce(function(acc, val) {
		return acc + (isNaN(val) ? 0 : val);
	}, 0);
	if (sum === 0) {
		return 0;
	}
	// 10的2次幂是100，用于计算精度。
	const digits = Math.pow(10, precision);
	// 扩大比例100，
	const votesPerQuota = valueList.map(function(val) {
		return (isNaN(val) ? 0 : val) / sum * digits * 100;
	});
	// 总数，扩大比例意味的总数要扩大
	const targetSeats = digits * 100;
	// 再向下取值，组成数组
	const seats = votesPerQuota.map(function(votes) {
		return Math.floor(votes);
	});
	// 再新计算合计，用于判断与总数量是否相同，相同则占比会100%
	let currentSum = seats.reduce(function(acc, val) {
		return acc + val;
	}, 0);
	// 余数部分的数组：原先数组减去向下取值的数组，得到余数部分的数组
	const remainder = votesPerQuota.map(function(votes, idx) {
		return votes - seats[idx];
	});
	// 给最大最大的余额加1，凑个占比100%；
	while (currentSum < targetSeats) {
		//  找到下一个最大的余额，给其加1
		let max = Number.NEGATIVE_INFINITY;
		let maxId = null;
		for (let i = 0, len = remainder.length; i < len; ++i) {
			if (remainder[i] > max) {
				max = remainder[i];
				maxId = i;
			}
		}
		// 对最大项余额加1
		++seats[maxId];
		// 已经增加最大余数加1，则下次判断就可以不需要再判断这个余额数。
		remainder[maxId] = 0;
		// 总的也要加1，为了判断是否总数是否相同，跳出循环。
		++currentSum;
	}
	// 这时候的seats就会总数占比会100%
	return seats[idx] / digits;
};
