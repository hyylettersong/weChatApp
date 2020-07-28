export default params => {
	
	//加载中
	uni.showLoading({
		title:'加载中'
	})

	return new Promise((resolve, reject) => {
		wx.request({
			...params,
			success(res){
				resolve(res)
			},
			fail(){
				reject('err')
			},
			complete(){
				uni.hideLoading()
			}
		})
	})
}
