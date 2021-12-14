/*
 * @Author:
 * @Date: 2018-09-03 11:29:10
 * @LastEditors: daipeng7
 * @LastEditTime: 2021-12-14 15:25:01
 * @Description: 应用入口文件
 */
import Vue from 'vue';
import { initGlobal } from '@/global';
import { initDirective } from '@/directives';
import { initFilter } from '@/filters';
import { initPlugin } from '@/plugins';
import router from '@/router';
import store from '@/store';

// import VConsole from 'vconsole';
// new VConsole();

/**
 * 全局样式引入
 * 	core样式通过sass.data注入到所有的sass、vue文件中
 */
import '@/style/_index.scss';

initGlobal(Vue);
initDirective(Vue);
initFilter(Vue);
initPlugin(Vue);

new Vue({
	router,
	store,
	template: '<router-view></router-view>'
}).$mount('#app');
