<template>
	<view>
		<view class="recommend-warp">
			<view 
			class="recommend-item"
			v-for="item in recommends"
			:key='item.id'
			>
				<image :src="item['thumb']"></image>
			</view>
		</view>
		
		<view class="moneths-wrap">
			<view>
				<view>
					<text>10/</text>
					<text>01yue</text>
				</view>
			</view>
			
			<view>ask恢复了卡号</view>
			<view>更多 ></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recommends:[]
			}
		},
		methods: {
			requestData(){
				this.$request({
					url:'http://157.122.54.189:9088/image/v3/homepage/vertical',
					data:{
						limit:30,
						order:'hot',
						skip:0
					},
				 
				}).then(resolve=>{
					// this.recommends.push(resolve.data.res.homepage['1'].items)
					this.recommends = resolve.data.res.homepage['1'].items
					console.log(this.recommends)
					
				})
			}
			 
		},
		mounted(){
			// this.requestData()
			// for(let i in this.recommends){
			// 	console.log(i)
			// }
		}
	}
</script>

<style lang="scss" scoped>
.recommend-warp{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	
	.recommend-item{
		display: block;
		width: 50%;
		border: 3rpx solid #ccc;
		box-sizing: border-box;
		height: auto;
		
		image{
			width: 100%;
			height: 250rpx;
		}
	}
}

.moneths-wrap{
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	padding: 16rpx;
	
	view:nth-of-type(1){
		flex: 3;
		
		text:first-child{
			font-size: 30rpx;
			color: deeppink;
		}
		text:last-child{
			font-size: 25rpx;
			color: pink;
		}
	}
	view:nth-of-type(2){
		flex: 8;
		font-size: 32rpx;
		color: #333333;
	}
	view:nth-of-type(3){
		flex: 2;
		font-size: 24rpx;
		color: deeppink;
	}
}
</style>
