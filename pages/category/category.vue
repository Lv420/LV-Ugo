<template>
	<view class="category">
		<searchbar></searchbar>
		<view class="content_box">
			<scroll-view class="left" scroll-y="true">
				<view :class="{active:index === idx}" @click="listclick(index)" class="left_content"
					v-for="(item,index) in catelist" :key="item.cat_id">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<scroll-view class="right" scroll-y="true">
				<image src="../../static/images/titleImage.png"></image>
				<view class="right_box" v-for="(item,index) in catelist[idx].children" :key='index'>
					<view class="textstyle">
						/ <text>{{item.cat_name}}</text> /
					</view>
					<view class="img_box">
						<view class="img_box1" v-for="i in item.children" :key='i.cat_id'>
							<image :src="i.cat_icon"></image>
							<text>{{i.cat_name}}</text>
						</view>
					</view>

				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import searchbar from '../../components/searchBar.vue'
	export default {
		components: {
			searchbar
		},
		data() {
			return {
				catelist: [], // 分类页面数据
				idx: 0
			}
		},
		onLoad() {
			this.$request({
				url: '/categories',
				method: 'get',
			}).then(res => {
				console.log(res)
				this.catelist = res.data.message

			})
		},
		methods: {
			listclick(index) {
				console.log(index)
				this.idx = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category {
		height: 100vh;
		position: relative;

		.content_box {
			display: flex;
			position: absolute;
			top: 92rpx;
			bottom: 0;

			.left {
				width: 200rpx;

				.left_content {
					text-align: center;
					height: 100rpx;
					line-height: 100rpx;
					background-color: #ccc;

					&.active {
						background-color: white;
						position: relative;

						&::before {
							content: '';
							position: absolute;
							width: 8rpx;
							height: 60rpx;
							left: 0;
							top: 20rpx;
							background-color: #eb4450;
						}
					}
				}
			}

			.right {
				flex: 1;
				padding: 20rpx 16rpx;

				image {
					width: 520rpx;
					height: 180rpx;
					margin: 0 auto;
				}

				.right_box {
					text-align: center;
					
					.textstyle{
						margin: 20rpx 0;
						color: #e3e3e3;
						text {
							color: #404040;
							margin: 0 30rpx;
						}
					}
					

					.img_box {
						display: flex;
						flex-wrap: wrap;

						.img_box1 {
							width: 120rpx;
							margin: 0 20rpx;
							image{
								width: 100%;
								height: 120rpx;
							}
							text{
								font-size: 25rpx;
								margin: 0;
							}
						}


					}
				}
			}
		}
	}
</style>
