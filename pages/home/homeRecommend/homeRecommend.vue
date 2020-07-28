<template>
	<scroll-view scroll-y='true' class="recommend-view" @scrolltolower="lower" refresher-enabled='true'>
		<view class="recommend-warp">
			<view class="recommend-item" v-for="item in recommends" :key='item.id'>
				<image :src="item['thumb']"></image>
			</view>
		</view>

		<view class="moneths-wrap">
			<view>
				<view>
					<text>{{this.monthesList['MM']}}/</text>
					<text>{{this.monthesList['DD']}}月</text>
				</view>
			</view>

			<view>{{monthesList.title}}</view>
			<view>更多 ></view>
		</view>

		<view class="content-list" v-for="item in monthesList.items" :key='item.id'>
			<view class="content-img">
				<image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
			</view>
		</view>

		<view class="recommend-hot">
			<view class="hot">
				<text>热门</text>
			</view>

			<view class="hot-img" v-for="item in verticalData" :key='item.id'>
				<view>
					<image mode="widthFix" :src="item.thumb"></image>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				recommends: [],
				monthesList: {},
				verticalData: [],
				params: {
					limit: 30, //获取条数
					order: 'hot', //携带的参数，关键字符为hot
					skip: 0 //要跳过几条（分页获取数据）
				},
				hasMore: true //是否还有下一页数据
			}
		},
		methods: {
			requestData() {
				this.$request({
					url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
					data: this.params
				}).then(resolve => {
					//判断获取分页的数据是否还有
					if (resolve.data.res.vertical.length === 0) {
						this.hasMore = false
						return
					}

					if (this.recommends.length === 0) { //执行一次获取数据，不用反复获取
						this.recommends = resolve.data.res.homepage['1'].items
						this.monthesList = resolve.data.res.homepage['2']

						//把月份/日添加到数组中
						this.monthesList['MM'] = moment(this.monthesList.stime).format('MM')
						this.monthesList['DD'] = moment(this.monthesList.stime).format('DD')
						// console.log(this.monthesList)
					}


					//热门数据获取(含分页数据的数组拼接方法)
					// this.verticalData = resolve.data.res.vertical
					// console.log(resolve.data.res.vertical)
					this.verticalData = [...this.verticalData, ...resolve.data.res.vertical]
					console.log(this.verticalData)
				})
			},
			requestTime() {
				console.log(this.monthesList)
			},
			lower(e) {
				//当滚动条触发时跳过多少条
				if (this.hasMore) {
					this.params.skip += this.params.limit
					this.requestData()
				} else {
					uni.showToast({
						title: '没有更多数据了',
						icon: 'none'
					})
				}

			}

		},
		mounted() {
			//页面加载完后修改头部标题
			uni.setNavigationBarTitle({
				title:'推荐'
			})
			// this.requestData()

		}
	}
</script>

<style lang="scss" scoped>
	.recommend-view {
		height: calc(100vh - 36px);
	}

	.recommend-warp {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;

		.recommend-item {
			display: block;
			width: 50%;
			border: 3rpx solid #ccc;
			box-sizing: border-box;
			height: auto;

			image {
				width: 100%;
				height: 250rpx;
			}
		}
	}

	.moneths-wrap {
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		padding: 16rpx;

		view:nth-of-type(1) {
			flex: 3;

			text:first-child {
				font-size: 30rpx;
				color: deeppink;
			}

			text:last-child {
				font-size: 25rpx;
				color: pink;
			}
		}

		view:nth-of-type(2) {
			flex: 8;
			font-size: 32rpx;
			color: #333333;
		}

		view:nth-of-type(3) {
			flex: 2;
			font-size: 24rpx;
			color: deeppink;
		}
	}

	.content-list {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;

		.content-img {
			display: inline-block;
			width: 33.33333%;
			border: 5rpx solid #4CD964;
			padding: 0;
			margin: 0;
			box-sizing: border-box;

			image {
				width: 100%;
			}
		}
	}

	.recommend-hot {
		.hot {

			text {
				color: red;
			}
		}

		.hot-img {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			view {
				width: 33.33%;
				border: 5rpx solid pink;

				image {
					width: 100%;
				}
			}
		}
	}
</style>
$
