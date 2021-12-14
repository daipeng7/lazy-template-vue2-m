import ShareMixin from './share';
import { mapState, mapActions } from 'vuex';

const initGlobalMixin = (Vue) => {
	Vue.mixin({
		mixins: [ShareMixin],
		data() {
			const { title = '', content = '', shareImage = '' } = this.$config || '';
			return {
				shareConf: {
					title,
					content,
					image: shareImage,
					link: window.location.href
				}
			};
		},
		computed: {
			...mapState({
				userInfo: state => state.app.userInfo
			})
		},
		methods: {
			...mapActions('app', ['logout'])
		}
	});
};

export {
	initGlobalMixin,
	ShareMixin
};
