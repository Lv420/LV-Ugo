<template>
	<view class="new_box" :class="{left:isplace}">
		<icon type="search" size="16"></icon>
		<input @click="searchbtn" @focus="isplace=true" @blur="isplace=false" type="text" placeholder="搜索" />
	</view>
</template>

<script>
	export default{
		data() {
			return {
				isplace: false,
			}
		},
		methods:{
			searchbtn(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.new_box {
		background-color: #fe2c4b;
		padding: 20rpx 16rpx;
		position: relative;
	
		input {
			background-color: #fff;
			text-align: center;
			// transition: .5s;
			border-radius: 10rpx;
		}
	
		icon {
			position: absolute;
			top: 26rpx;
			left: 300rpx;
			// transition: .5s;
		}
	}
	.new_box.left {
		icon {
			left: 25rpx;
		}
	
		input {
			text-align: left;
			padding-left: 45rpx;
			// border-radius: 5px;
	
		}
	}
</style>
