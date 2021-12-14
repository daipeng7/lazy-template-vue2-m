/**
 * 浏览器特性、请求平台特性
 */
import { filterEmptyString } from '@/utils';

class Client {
	constructor() {}

	getClientInfo() {
		const RULES = {
			// ANDROID: /(^| |\()(android)(;| |\/|$)/i,
			ANDROID: /Android/i,
			IOS: /iPhone|iPad|iPod/i,
			// IOS: /(^| |\()(iPhone|iPad|iPod)(;| |\/|$)/i,
			WEIXIN: /MicroMessenger/i,
			QQ: /(^| )(QQ)( |\/|$)/i,
			QQBROWSER_HD: /iPad.*?(^| )(MQQBrowser)( |\/|$)/i,
			QQBROWSER: /(^| )(MQQBrowser)( |\/|$)/i,
			IPAD: /iPad/,
			VERSION: /[a-zA-Z]{3,4}(_android|_iphone|_ipad),(\d.\d{1,2}.\d{1,2})/i,
			HUAWEI: /HUAWEI/i,
			CLIENT_CHANNEL: /[a-zA-Z]{3,4}(_android|_iphone|_ipad),(\d.\d{1,2}.\d{1,2}),(\w+)/i,
			MOBILE: /Mobile/i
		};
		const UA = window.navigator.userAgent;
		const isIOS = RULES.IOS.test(UA);
		const isAndroid = RULES.ANDROID.test(UA);
		const isQQ = RULES.QQ.test(UA);
		const isWX = RULES.WEIXIN.test(UA);
		const isIPAD = RULES.IPAD.test(UA);
		const isHUAWEI = RULES.HUAWEI.test(UA);
		// @ts-ignore
		const os = isAndroid
			? UA.match(RULES.ANDROID)[0].toLowerCase()
			: isIOS
				? UA.match(RULES.IOS)[0].toLowerCase()
				: 'android';
		const isApp = false;
		const _deviceName = UA.match(RULES.CLIENT_CHANNEL);
		const deviceName = _deviceName ? _deviceName[3] : '';
		const _version = UA.match(RULES.VERSION);
		const version = _version ? _version[2] : '0';
		const info = {
			os,
			isApp,
			isIOS,
			isAndroid,
			isQQ,
			isWX,
			isIPAD,
			version,
			isHUAWEI,
			deviceName
		};
		return info;
	}

	/**
	 * @name: formatQuery
	 * @description: 格式化query
	 * @param {object} data
	 * @return {string}
	 */
	formatQuery(data = {}) {
		const keys = Object.keys(data);
		if (!keys.length) return '';
		return keys.reduce((str, key, index) => {
			str += `${index === 0 ? '' : '&'}${key}=${data[key]}`;
			return str;
		}, '?');
	}

	/**
	 * @name: downloadFile
	 * @description: 下载文件
	 * @param {string} href: 下载地址
	 * @param {object} query: 参数
	 * @return {undefined}
	 */
	downloadFile(href = '', query = {}) {
		// 创建a标签 实现点击下载
		const a = document.createElement('a');
		a.className = 'needsclick';
		a.href = `${href}${this.formatQuery(filterEmptyString(query, true))}`;
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
}

export default new Client();
