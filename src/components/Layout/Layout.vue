<template>
    <div class="layout">
		å
    </div>
</template>

<script>
import clientUtils from '@/utils/client';
import config from '@/config';
const { isQQ, isWX } = clientUtils.getClientInfo();
export default {
	props: {

	},
	model: {
		prop: 'active',
		event: 'tabChange'
	},
	data() {
		return {};
	},
	beforeRouteEnter (to, from, next) {
		debugger;
	},
	beforeRouteUpdate (to, from, next) {
		debugger;
	},
	methods: {

	}
};
</script>

<style lang="scss" scoped>
    $headerH: 88px;
    $footerH: 100px;
    $headerBetweenW: 100px;
    .layout{
        background: color(light);
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
</style>
