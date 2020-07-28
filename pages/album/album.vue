<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					limit: 30,
					order: 'new',
					skip: 0,
					first: 1
				},
				id: -1,
				album:{},
				wallpaper:[]
			}
		},
		methods: {
			requestData() {
				this.$request({
					url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data: this.params
				}).then(res => {
					console.log(res)
					
					this.album = res.data.res.album
					this.wallpaper = res.data.res.wallpaper
				})
			}
		},
		onLoad(options) {
			this.id = options
			console.log(options)
		},
		mounted() {
			this.requestData()
		}
	}
</script>

<style scoped lang="scss">

</style>
