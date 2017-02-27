<template>
	<div class="header">
		<img :src="seller.avatar" class="bg">
		 <div class="header-wrap">
			<div class="content-wrapper">
				<div class="avatar">
					<img width="64" height="64" :src="seller.avatar" :alt="seller.name">
				</div>
				<div class="content">
					<div class="title">
						<span class="tit-bg"></span>
						<span class="name">{{seller.name}}</span>
					</div>
					<p class="deliveryTime">{{seller.description}}<span>/</span>{{seller.deliveryTime}}分钟送达</p>
					<p class="supports" v-if="seller.supports">
						<span class="type" :class="classMap[seller.supports[0].type]"></span>
						<span class="support">{{seller.supports[0].description}}</span> 
						<span class="length" @click="showDetail">{{seller.supports.length}}个 <span class="icon-keyboard_arrow_right"></span></span>
					</p>
				</div>
			</div>
			<div class="tips" @click="showDetail">
				<span class="bulletin"></span>
				<span class="text">{{seller.bulletin}}</span>
				<span><span class="icon-keyboard_arrow_right"></span></span>
			</div>
		</div>
		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="mask"></div>
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<div class="name">{{seller.name}}</div>
						<div class="star-wrap">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="item in seller.supports">
								<span class="icon" :class="classMap[item.type]"></span>
								<span>{{item.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">{{seller.bulletin}}</div>
					</div>
				</div>
				<div class="detail-close"><span class="icon-close" @click="hideDetail"></span></div>
			</div>
		</transition>
	</div>
</template>
<script>
import star from 'components/star';

export default {
	props: {
		seller: {
			type: Object
		}
	},
	data(){
		return {
			detailShow: false
		}
	},
	methods: {
		showDetail() {
			this.detailShow = true
		},
		hideDetail(){
			this.detailShow = false
		}
	},
	created(){
		this.classMap = ['decrease','discount','special','invoice','guarantee']
	},
	components: {
		star
	}
}
</script>
<style lang="stylus">
@import '../assets/stylus/header.styl';
</style>