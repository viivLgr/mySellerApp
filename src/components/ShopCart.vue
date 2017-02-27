<template>
	<div class="shopcart-wrap">
		<div class="content">
			<div class="shopcart-left">
				<div class="shopcart-icon-bg" @click="toggleCart">
					<div class="shopcart-icon" :class="{'shopcart-icon-active':totalCount>0}"><span class="icon-shopping_cart"></span></div>
					<div class="shopcart-count" v-if="totalCount">{{totalCount}}</div>
				</div>
				<div class="shopcart-price">
					<span class="total" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}</span>
					<span class="txt">另需配送费￥{{deliveryPrice}}元</span>
				</div>
			</div>
			<div class="shopcart-right" :class="{'highLight':totalPrice>=minPrice}">{{payDese}}</div>
		</div>
		<div class="ball-container">
			<div v-for="ball in balls">
				<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
					<div class="ball" v-show="ball.show">
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
		</div>
		<transition name="fold">
			<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
		            <h2 class="title">购物车</h2>
		            <span class="empty" @click="empty">清空</span>
		        </div>
				<div class="list-content" ref="listContent">
					<ul>
		              <li class="food" v-for="food in selectFoods">
		                <span class="name">{{food.name}}</span>
		                <div class="price">
		                  <span>￥{{food.price*food.count}}</span>
		                </div>
		                <div class="cartcontrol-wrapper">
		                  <CartControl @add="addFood" :food="food"></CartControl>
		                </div>
		              </li>
		            </ul>
				</div>
			</div>
		</transition>
		<transition name="mask">
			<div @click="hideList" class="list-mask" v-show="listShow"></div>
		</transition>
	</div>
</template>
<script>
import BScroll from 'better-scroll';
import CartControl from 'components/CartControl'

	export default {
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [
						{price:10,count:1}	
					];
				}
			},
			minPrice: {
				type: Number,
				default: 0
			},
			deliveryPrice: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				balls: [
					{show: false},
					{show: false},
					{show: false},
					{show: false},
					{show: false}
				],
				dropBalls: [],
				fold: true
			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDese() {
				if(this.totalPrice === 0){
					return `￥${this.minPrice}元起送`;
				}
				if(this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice;
					return `还差${diff}元起送`;
				}
				if(this.totalPrice >= this.minPrice){
					return '去结算';
				}
			},
			listShow() {
				if(!this.totalCount){ //没有加入商品
					this.fold = true; //购物车可以打开
					return false;
				}
				
				let show = !this.fold;
				if(show){
					this.$nextTick(() => {
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.listContent,{
								click: true
							})
						}else{
							this.scroll.refresh();
						}
					})
				}
				return show;
			}
		},
		methods: {
			hideList(){
				this.fold = true;
			},
			toggleCart() {
				if(!this.totalCount) { //没有加入商品
					return;
				}
				this.fold = !this.fold;
			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				})
			},
			addFood(el) {
				this.drop(el);
			},
			drop(el) {
				for(let i = 0; i < this.balls.length; i++){
					let ball = this.balls[i];
					if(!ball.show){
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeDrop(el) {
			    //小球下落之前
			    let count = this.balls.length;
			    while(count--) {
			    	let ball = this.balls[count];
			    	if(ball.show){
			    		let rect = ball.el.getBoundingClientRect(); //获得元素视口偏移
			    		let x = rect.left - 32;
			    		let y = -(window.innerHeight - rect.top - 22);
			    		el.style.display = '';
			    		el.style.webkitTransform = `translate3d(0,${y}px,0)`;
			    		el.style.transform = `translate3d(0,${y}px,0)`;
			    		let inner = el.getElementsByClassName('inner-hook')[0];
			    		inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
			    		inner.style.transform = `translate3d(${x}px,0,0)`;
			    	}
			    }
		  	},
		  	dropping(el, done) {
		    	//小球下落过程
		    	/* eslint-disable no-unused-vars */
		    	let rf = el.offsetHeight;
		    	this.$nextTick(() => {
		    		el.style.webkitTransform = 'translate3d(0,0,0)';
			    	el.style.transform = 'translate3d(0,0,0)';
			    	let inner = el.getElementsByClassName('inner-hook')[0];
			    	inner.style.webkitTransform = 'translate3d(0,0,0)';
			    	inner.style.transform = 'translate3d(0,0,0)';
			    	el.addEventListener('transitionend', done);
		    	});
		  	},
		  	afterDrop(el) {
		    	//小球下落之后
		    	let ball = this.dropBalls.shift();
		    	if(ball){
		    		ball.show = false;
		    		el.style.display = 'none';
		    	}
		  	}
		},
		components: {
			CartControl
		}
	}
</script>
<style lang="stylus">
	@import "../assets/stylus/shopcart.styl"
</style>