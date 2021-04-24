<template>
	<view class="searchpage">
		<view class="top">
			<icon size="18" class="icont" type="search"></icon>
			<input type="text" @confirm="search" v-model="value" placeholder="请输入商品关键字" />
			<button type="default" @tap="clear">取消</button>
		</view>
		<view class="history_box">
			<view class="topcontent">
				<text>历史搜索</text>
				<icon type='clear' size="20" @tap="removebtn"></icon>
			</view>
			<view class="items">
				<view @tap="clicktext(item)" class="item" v-for="(item,index) in itemlist" :key='index'>
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				itemlist: []
			}
		},
		watch: {
			itemlist: {
				handler: (val, cval) => {
					// console.log(val)
					// console.log(cval)
					uni.setStorageSync('itemlist', val)
				},
				deep: true
			}
		},
		onLoad() {
			this.itemlist = uni.getStorageSync('itemlist') || []
		},
		methods: {
			// 清除输入框内容
			clear() {
				this.value = ''
			},
			// 确认搜索
			search() {
				if (this.value) {
					if (!this.itemlist.includes(this.value)) {
						this.itemlist.unshift(this.value)
					}
					if (this.itemlist.length > 10) {
						this.itemlist.splice(10)
					}
				} else {
					uni.showToast({
						title: '内容不能为空',
						icon: 'errpr'
					})
				}
				uni.navigateTo({
					url: '/pages/searchRous/searchRous'
				})
			},
			// 清除搜索记录
			removebtn() {
				// uni.clearStorageSync('itemlist')
				this.itemlist = []
			},
			clicktext(text) {
				console.log(text)
				this.value = text
				uni.navigateTo({
					url: '/pages/searchRous/searchRous'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.searchpage {
		.top {
			background-color: #eeeeee;
			display: flex;
			padding: 20rpx 15rpx;
			position: relative;

			input {
				background-color: #fff;
				height: 50rpx;
				flex: 1;
				margin-right: 15rpx;
				padding: 10rpx 0;
				padding-left: 60rpx;
				border-radius: 5rpx;
			}

			button {
				width: 135rpx;
				height: 70rpx;
				font-size: 25rpx;
				line-height: 70rpx;
			}

			.icont {
				position: absolute;
				top: 40rpx;
				left: 30rpx;
			}
		}

		.history_box {
			padding: 20rpx 15rpx;

			.topcontent {
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;
			}

			.items {
				display: flex;
				flex-wrap: wrap;

				.item {
					background-color: #dddddd;
					padding: 10rpx 20rpx;
					border-radius: 5px;
					margin-right: 20rpx;
					margin-bottom: 15rpx;
				}
			}
		}
	}
</style>
