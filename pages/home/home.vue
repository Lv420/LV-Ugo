<template>
	<view class="home">
		<!-- 搜索框 -->
		<view class="new_box" :class="{left:isplace}">
			<icon type="search" size="16"></icon>
			<input @focus="isplace=true" @blur="isplace=false" type="text" placeholder="搜索" />
		</view>
		<!-- 轮播图 -->
		<swiper class :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="swiper_style" v-for="item in swiperlist" :key='item.goods_id'>
				<image class="swiper_img" :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="nav_box">
			<navigator v-for="(item,index) in navigationlist" :key='index'>
				<image :src="item.image_src"></image>
			</navigator>
		</view>
		<!-- 内容 -->
		<view class="foolots_box" v-for="(item,index) in flootlist" :key='index'>
			<image :src="item.floor_title.image_src"></image>
			<view class="content_box">
				<view class="left">
					<image :src="item.product_list[0].image_src"></image>
				</view>
				<view class="rigth">
					<template v-for="(i,id) in item.product_list">
						<image v-if="id !== 0" :src="i.image_src" :key='id'></image>
					</template>
				</view>
			</view>
		</view>
		<view class="top" v-if="topShow" @click="top">
			<view class="jiantou">
				^
			</view>
			顶部
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				isplace: false,
				swiperlist: [], // 轮播图数据
				navigationlist: [], // 菜单导航数据
				flootlist: [] ,// 楼层数据
				topShow:false
			}
		},
		onLoad() {
			// 获取轮播图数据
			this.$request({
				url: '/home/swiperdata',
				method: 'get'
			}).then(res => {
				this.swiperlist = res.data.message
			})

			// 获取导航菜单数据
			this.$request({
				url: '/home/catitems',
				method: 'get'
			}).then(res => {
				this.navigationlist = res.data.message
			})

			// 楼层数据
			this.$request({
				url: '/home/floordata',
				method: 'get',

			}).then(res => {
				console.log(res)
				this.flootlist = res.data.message
			})

		},
		onPageScroll(event){
			// console.log(event)
			if(event.scrollTop >= 200){
				this.topShow = true
			}else{
				this.topShow = false
			}
		},
		methods: {
			// 点击顶部按钮返回顶部
			top(){
				uni.pageScrollTo({
					scrollTop:0
				})
				}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
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

		.swiper_style {
			width: 100%;
			height: 340rpx;

			.swiper_img {
				width: 100%;
				height: 100%;
			}
		}

		.nav_box {
			display: flex;
			height: 194rpx;
			align-items: center;

			navigator {
				flex: 1;
				text-align: center;

				image {
					width: 128rpx;
					height: 140rpx;
				}
			}
		}

		.foolots_box {
			background-color: #f4f4f4;
			padding-top: 30rpx;

			image {

				width: 100%;
				height: 68rpx;
			}

			.content_box {
				display: flex;
				height: 470rpx;
				background-color: #fff;
				padding: 20rpx 17rpx 10rpx;

				.left {
					flex: 3;
					height: 468rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.rigth {
					flex: 7;
					display: flex;
					justify-content: space-around;
					flex-wrap: wrap;

					image {
						width: 232rpx;
						height: 232rpx;
					}
				}
			}
		}

		.top {
			width: 100rpx;
			height: 100rpx;
			background-color: #ccc;
			opacity: .5;
			border-radius: 50%;
			text-align: center;
			position: fixed;
			right: 22rpx;
			bottom: 30rpx;
			
		}

	}
</style>
