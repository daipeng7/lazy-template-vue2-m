/*
 * @Author:
 * @Date: 2019-12-17 14:20:55
 * @LastEditors: daipeng7
 * @LastEditTime: 2021-12-14 14:31:19
 * @Description:
 */
import fetch from '@/fetch';
import debounce from 'lodash/debounce';

const { innerWidth, innerHeight } = window;

const initState = () => ({
	// 用户信息
	userInfo: {},
	// 窗口布局参数，随着窗口变化改动
	window: {
		width: innerWidth,
		height: innerHeight,
		asideWidth: 200,
		headHeight: 40,
		menu: {
			backgroundColor: '#545c64',
			textColor: '#fff',
			activeTextColor: '#ffd04b'
		}
	}
});

export default {
	namespaced: true, // 命名空间，在接入store数据的时候需要带上名字
	state: initState(),
	getters: {

	},
	mutations: {
		setUserInfo(state, payload) {
			// 因为角色type响应值类型不固定，所以使用固定类型
			if (payload.role_type) payload.role_type = +payload.role_type;
			state.userInfo = { ...state.userInfo, ...payload };
		},
		// 重置用户详情
		resetUserInfo(state, payload) {
			state.userInfo = payload || initState().userInfo;
			state.siteConfig = payload || initState().siteConfig;
		},
		// 设置宽度
		setAsidWidth(state, w = initState().window.asideWidth) {
			state.window.asideWidth = w;
		}
	},
	actions: {
		// 刷新布局尺寸
		refreshLayout: debounce((store) => {
			const { innerWidth, innerHeight } = window;
			store.state.window = { ...store.state.window, width: innerWidth, height: innerHeight };
		}, 100, { maxWait: 300 }),

		// 刷新用户相关数据
		refreshUser(context, needUserInfo = true) {
			if (needUserInfo) context.dispatch('getUserInfo');
		}
	}
};
