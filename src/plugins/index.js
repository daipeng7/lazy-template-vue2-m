/*
 * @Author:
 * @Date: 2019-11-20 21:00:13
 * @LastEditors: daipeng7
 * @LastEditTime: 2021-12-14 14:04:35
 * @Description: 插件注册文件
 * @example:
 * 		import ElementUI from 'element-ui';
 * 		import VueLazyLoad from 'vue-lazyload';
 * 		const plugins = [
			{ plugin: ElementUI, options: { size: 'mini', zIndex: 3000 } },
			{
				plugin: VueLazyLoad,
				options: {
					preLoad: 1, // lazyload元素距离页面底部距离百分比为多少的时候开始加载
					error: require('@/assets/images/common/image-error.svg'),
					loading: require('@/assets/images/common/image-loading.svg'),
					attempt: 1 // 重试次数
				}
			}
		];
 */
// import errorImage from '@/assets/images/common/image-error.svg';
// import loadingImage from '@/assets/images/common/image-loading.svg';
// 全局引入Toast;
const plugins = [];

export const initPlugin = (Vue) => {
	plugins.forEach(item => Vue.use(item.plugin, item.options || {}));
};
