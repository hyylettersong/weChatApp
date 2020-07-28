<template>
	<view>
		<view class="home-tab">
			<view class="home-tab-title">
				<view class="title-inner">
					<uni-segmented-control :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem" style-type="text"
					 active-color="#ffaaff">
					</uni-segmented-control>
				</view>
				<view class="iconfont">

				</view>
			</view>

			<view class="content">
				<view v-if="current === 0">
					<home-recommend></home-recommend>
				</view>
				<view v-if="current === 1">
					<home-category></home-category>
				</view>
				<view v-if="current === 2">
					<home-news></home-news>
				</view>
				<view v-if="current === 3">
					<home-album></home-album>
				</view>
			</view>

			<view>




			</view>

		</view>
	</view>
</template>

<script>
	import {
		uniSegmentedControl
	} from '@dcloudio/uni-ui'
	import homeRecommend from './homeRecommend/homeRecommend.vue'
	import homeCategory from './homeCategory/homeCategory.vue'
	import homeNews from './homeNews/homeNews.vue'
	import homeAlbum from './homeAlbum/homeAlbum.vue'

	export default {
		data() {
			return {
				items: [{
						title: '推荐'
					},
					{
						title: '分类'
					},
					{
						title: '最新'
					},
					{
						title: '专辑'
					}
				],
				current: 3
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			requestData() {
				// this.$request({
				// 	url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
				// 	type:'get'
				// }).then(res => {
				// 	console.log(res.data)
				// })
			}

		},
		onLoad() {
			// this.requestData()
		},
		components: {
			uniSegmentedControl,
			homeRecommend,
			homeCategory,
			homeNews,
			homeAlbum
		}
	}
</script>

<style>
	.home-tab {}

	.home-tab-title {}

	.title-inner {}
</style>
