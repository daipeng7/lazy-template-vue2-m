/*
 * @Author: daipeng
 * @Date: 2020-02-04 09:36:26
 * @LastEditors  : VSCode
 * @LastEditTime : 2020-02-08 20:32:57
 * @Description:
 */
/**
 * 分享mixin
 */
import fetch from '@/fetch';
import clientUtil from '@/utils/client';
import domUtils from '@/utils/dom';

const Share = {
	methods: {
		$setShareInfo() {
			domUtils.setDomShareMeta(this.shareConf);
			window.shareCallback = this.shareConf.callback;
			this.shareConf = { ...this.shareConf, ...{ callback: 'shareCallback' } };
			// 设置微信分享
			if (clientUtil.getClientInfo().isWX) {
				this.$setWxShare();
			}
		},
		/* eslint-disable */
		$setWxShare() {
			fetch('getJsApiConfig', { url: window.location.href.split('#')[0] }, undefined).then(res => {
				let data = res.data || {};
				const dataObj = {
					jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareQZone'
					],
					...data
				};
				wx.config(dataObj);
				this.shareConf.desc = this.shareConf.content;
				this.shareConf.imgUrl = this.shareConf.image;
				wx.ready(() => {
					wx.onMenuShareAppMessage(this.shareConf);
					wx.onMenuShareTimeline(this.shareConf);
					wx.onMenuShareQQ(this.shareConf);
					wx.onMenuShareQZone(this.shareConf);
				});
			});
		}
	}
};

export default Share;