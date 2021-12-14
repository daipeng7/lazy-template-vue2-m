<template>
    <van-overlay :show="loading" @click="onClickMask" class="loading">
        <div class="loading-wrapper" >
            loading...
        </div>
    </van-overlay>
</template>

<script>
export default {
	name: 'Loading',
	props: {
		loading: { type: Boolean, default: false }
	},
	model: {
		prop: 'loading',
		event: 'loadingChange'
	},
	methods: {
		onClickMask() {
			this.$emit('loadingChange', false);
		}
	}
};
</script>

<style lang="scss" scoped>
.loading{
    @include flex(column, center, center);
    .loading-wrapper{
    }
}
</style>
