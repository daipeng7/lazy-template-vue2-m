/*
 * @Author:
 * @Date: 2019-11-20 20:47:04
 * @LastEditors: daipeng7
 * @LastEditTime: 2021-12-14 13:59:42
 * @Description:
 */
import fetch from '@/fetch';
import * as utils from '@/utils';
import config from '@/config';

import { initGlobalMixin } from '@/mixins/index';
import { initGlobalComponent } from '@/components/index';

// 全局变量列表
const variables = [
	{ name: '$config', value: config },
	{ name: '$fetch', value: fetch },
	{ name: '$utils', value: utils }
];

export const initGlobal = (Vue) => {
	variables.forEach(item => (Vue.prototype[item.name] = item.value));
	initGlobalComponent(Vue);
	initGlobalMixin(Vue);
};
