<style lang="stylus">
@import "../assets/stylus/food.styl"
</style>
<template>
	<transition name="food">
		<div v-show="showFlag" class="food-wrap" ref="foodWrap">
			<div class="foodWrap">
				<div class="image-header">
					<img :src="food.image" :alt="food.name">
					<i class="icon icon-arrow_lift" @click="hide()"></i>
				</div>
				<div class="food-tit">
					<h1>{{food.name}}</h1>
					<p class="sell-count"><span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></p>
					<div class="price">
						<strong><i>￥</i>{{food.price}}</strong>
						<del >￥{{food.oldPrice}}12</del>
						<transition name="fade">
							<div @click="addFirst($event)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
						</transition>	
						<CartControl :food="food"></CartControl>
					</div>
				</div>
				<Split v-if="food.info"></Split>
				<div class="food-desc" v-if="food.info">
					<h2>商品信息</h2>
					<p>{{food.info}}</p>
				</div>
				<Split v-if="food.ratings"></Split>
				<div class="food-ratings">
					<h2>商品评价</h2>
					<RatingSelect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></RatingSelect>
					<ul v-show="food.ratings && food.ratings.length" class="rating-list">
						<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
							<p class="time">{{rating.rateTime | formatDate }}</p>
							<div class="user">
								<span class="user-name">{{rating.username}}</span>
								<img class="user-avatar" :src="rating.avatar"/>
							</div>
							<p class="rating-content">
								<i class="icon" :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></i>{{rating.text}}
							</p>
						</li>
					</ul>
					<div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
				</div>
			</div>	
		</div>
	</transition>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import CartControl from 'components/CartControl'
import Split from 'components/Split'
import RatingSelect from 'components/RatingSelect'
import {formatDate} from 'assets/js/date';

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: POSITIVE,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm');
			}
		},
		created: function () {
		  this.$on('select-type', this.selectType)
		  this.$on('content-toggle', this.onlyContent)
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = false;

				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.foodWrap,{
							click: true
						})
					}else{
						this.scroll.refresh();
					}
				});
			},
			hide() {
				this.showFlag = false;
			},
			addFirst(event) {
				if(!event._constructed){ //自己派发事件为true；浏览器原生派发为false
					return;
				}
				//获取当前target
				this.$emit('add',event.target);
				Vue.set(this.food,'count',1);
			},
			needShow(type,text) {
				if(this.onlyContent && !text){
					return false;
				}
				if(this.selectType === ALL){
					return true;
				}else{
					return type === this.selectType;
				}
			}
		},
		components: {
			CartControl,
			Split,
			RatingSelect
		}
	}
</script>