/*
 * @Author:
 * @Date: 2019-12-17 14:19:53
 * @LastEditors: VSCode
 * @LastEditTime: 2019-12-17 14:41:48
 * @Description:
 */
import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
Vue.use(Vuex);

const store = new Vuex.Store({
	modules: { app }
});
export default store;
