<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul class="wrapper">
				<li class="menu-item" v-for="(item,index) in goods" :class="{'current': index ===currentIndex }" @click="selectMenu(index,$event)">
					<span class="text"><i v-show="item.type>0" class="icon" :class="classMap[item.type]"></i>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<div class="wrapper">
				<dl v-for="item in goods" ref="foodsItem" class="foods-item">
					<dt class="item-title">{{item.name}}</dt>
					<dd class="item-content" v-for="food in item.foods">
						<div class="img">
							<img :src="food.icon" :alt="food.name" width="57" height="57">
						</div>
						<div class="con">
							<h2>{{food.name}}</h2>
							<p class="description">{{food.description}}</p>
							<p class="sellCount">月售{{food.sellCount}}份 &nbsp; 好评率{{food.rating}}%</p>
							<p class="price">
								<span><i>￥</i>{{food.price}}</span>
								<del>￥{{food.oldPrice}}</del>
							</p>
						</div>
					</dd>
				</dl>
			</div>
		</div>
		<ShopCart></ShopCart>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
import ShopCart from 'components/ShopCart'

	export default {
		props: {
			goods:{
				type: Object
			}
		},
		data(){
			return {
				goods: [],
				listHeight: [],
				scrollY: 0
			}
		},
		computed: {
			currentIndex() {
				for(let i=0; i < this.listHeight.length; i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
						return i;
					}
				}
				return 0;
			}
		},
		created() {
			this.classMap = ['decrease','discount','special','invoice','guarantee'];

			this.$http.get('/api/goods').then((response) => {
				this.goods = response.body.data;
				this.$nextTick(() => { //在下次 DOM 更新循环结束之后执行延迟回调
					this._initScroll();
					this._calculateHeight();
				});
			});
		},
		methods: {
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click: true 
				});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
					probeType: 3
				});

				this.foodsScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			_calculateHeight(){
				let foodList = this.$refs.foodsItem;
				let height = 0; //y轴高度
				this.listHeight.push(height);
				for(let i = 0; i < foodList.length; i++){
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectMenu(index,event) {
				//$event 访问原生 DOM 
				if(!event._constructed){ //自己派发事件为true；浏览器原生派发为false 
					return; //pc状态下return掉
				}
				let foodList = this.$refs.foodsItem;
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el,500);
			}
		},
		components: {
			ShopCart
		}
	}
</script>
<style lang="stylus">
@import "../assets/stylus/goods.styl"
</style>