/**
 * Url相关
 * 设置页面分享信息
 */

class Dom {
	constructor() {}

	/**
   * 设置页面分享信息
   * @param share_title, share_content, share_image
   */
	setDomShareMeta({ title, content, image }) {
		document.title = title;
		const domKeyword = document.querySelector('meta[name="keywords"]');
		const domDescription = document.querySelector('meta[name="description"]');

		const domName = document.querySelector('meta[itemprop="name"]');
		const domDescription1 = document.querySelector('meta[itemprop="description"]');
		const domImage = document.querySelector('meta[itemprop="image"]');

		domKeyword.content = title;
		domName.content = title;

		domDescription.content = content;
		domDescription1.content = content;

		domImage.content = image;
	}

	// 禁止dom滚动
	noscroll() {
		let scrollTop;
		if (document.scrollingElement.scrollTop) {
			scrollTop = document.scrollingElement.scrollTop;
		} else {
			scrollTop = 0;
		}
		document.body.style.top = -scrollTop + 'px';
		document.body.style.overflow = 'hidden';
		document.body.style.position = 'fixed';
		document.body.style.width = '100%';
		return scrollTop;
	}

	// 还原dom高度
	overlayClick(scrollTop) {
		document.body.style.overflow = 'auto';
		document.body.style.position = '';
		document.scrollingElement.scrollTop = scrollTop;
		console.log('overlayClick');
	}
}

export default new Dom();
