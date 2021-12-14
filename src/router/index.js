/*
 * @Author:
 * @Date: 2019-11-26 17:04:48
 * @LastEditors: daipeng7
 * @LastEditTime: 2021-12-14 14:29:05
 * @Description: 路由主文件
 */
import VueRouter from 'vue-router';
import Main from '@/views/Main';
import { initGuards } from './guards';
import Vue from 'vue';

// 滚动条行为
const scrollBehavior = (to, from, savedPosition) => {
	if (savedPosition) {
		return savedPosition;
	} else {
		return { x: 0, y: 0 };
	}
};

// 异常页面路由
export const errorPageRoutes = [
	{
		name: 'error_404',
		path: '/*',
		component: resolve => require(['@/views/error/404'], resolve),
		beforeEnter(to, from, next) {
			if (/(index\.(html|htm))$/.test(to.path)) next({ name: 'app' });
		}
	}
];

// 根路由
export const rootRoutes = {
	base: '/',
	mode: 'history',
	linkActiveClass: 'router-link-active',
	linkExactActiveClass: 'router-link-exact-active',
	scrollBehavior,
	routes: [
		{
			name: 'app',
			path: '/',
			title: '',
			icon: 'el-icon-order',
			meta: {
				title: ''
			},
			component: Main,
			children: []
		},
		...errorPageRoutes
	]
};

Vue.use(VueRouter);
// 初始化路由方法，
const router = new VueRouter(rootRoutes);
// 初始化路由守卫
initGuards(router);

export default router;
