import Layout from './Layout/Layout.vue';
import Loading from './Loading.vue';

const globalComponents = [
	{ name: 'Layout', component: Layout },
	{ name: 'Loading', component: Loading }
];

const initGlobalComponent = (Vue) => {
	globalComponents.forEach(item => Vue.component(item.name, item.component));
};

export {
	initGlobalComponent,
	Layout
};
