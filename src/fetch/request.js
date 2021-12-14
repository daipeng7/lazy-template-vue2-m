/*
 * @Author:
 * @Date: 2018-09-03 18:57:19
 * @LastEditors: daipeng7
 * @LastEditTime: 2021-12-14 14:49:17
 * @Description: 封装request方法
 * @Company:
 */
import axios from 'axios';
import router from '@/router';
import { replaceUrl, isString, isObject, filterEmptyString } from '@/utils';
import clientUtils from '@/utils/client';
import { StatusMap, CustomCodeMap, SystemCodeMap } from './status';

const METHODS = ['get', 'post', 'put'];
const instance = axios.create();

const AJAX_DEFAULT_CONFIG = {
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json'
	}
};

// 错误处理方法
const errorHandler = res => {
	let msg = '';
	const { data } = res;
	// Toast.clear();
	if (StatusMap[res.status] && StatusMap[res.status].useLocalMessage) msg = StatusMap[res.status].message;
	else if (StatusMap[data.status].useLocalMessage) msg = StatusMap[data.status].message;
	else if (data && isString(data)) msg = data;
	else if (data && isObject(data)) msg = data.message || data.msg || StatusMap[data.status].message;
	if (/\/(visitor|register)/.test(location.href)) {
		if (msg && !StatusMap[data.status].relogin) {
			// Toast.fail({ message: msg, duration: 2000 });
		}
		return Promise.reject(res);
	}
	if (StatusMap[data.status].relogin) router.replace({ name: 'login' });
	if (msg) {
		// Toast.fail({ message: msg, duration: 2000 });
	}
	return Promise.reject(res);
};

// 请求拦截器
instance.interceptors.request.use(config => {
	return config;
});

// 响应拦截器
instance.interceptors.response.use(res => {
	const { data } = res;
	if (isObject(data)) {
		const { status } = data;
		if (CustomCodeMap.success.includes(status)) return Promise.resolve(data);
		else if (CustomCodeMap.error.includes(status)) return errorHandler(res);
		else if (status === undefined) return Promise.resolve(data);
	} else return errorHandler(res);
}, (error) => {
	return errorHandler(error.response);
});

Object.assign(instance.defaults, AJAX_DEFAULT_CONFIG);

const request = (method) => {
	return (url, baseUrl) => {
		return (data) => {
			return (options) => {
				// 通过参数returnPath，直接返回path
				if (options.returnPath) return `${baseUrl || instance.defaults.baseURL}${url}${clientUtils.formatQuery(filterEmptyString(data))}`;
				return (config) => {
					const _data = ['get'].includes(method) ? { params: data } : { data };
					const _url = replaceUrl(url, options);

					const _config = {
						...config,
						url: _url,
						method,
						..._data
					};

					return instance(_config);
				};
			};
		};
	};
};

// 请求对象
const requestInstances = METHODS.reduce((map, methodName) => {
	map[methodName] = request(methodName);
	return map;
}, { instance });

export default requestInstances;
