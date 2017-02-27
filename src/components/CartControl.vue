<template>
	<div class="cartControl">
		<transition name="remove">
			<div class="remove icon-remove_circle_outline" v-show="food.count>0" @click="removeCart">
			</div>
		</transition>
		<transition name="num">
			<div class="num" v-show="food.count>0">{{food.count}}</div>
		</transition>
		<div class="add icon-add_circle" @click="addCart"></div>
	</div>
</template>
<script>
import Vue from 'vue';

	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart(event) {
				if(!event._constructed){
					return;
				}
				if(!this.food.count){
					Vue.set(this.food,'count',1);
				}else{
					this.food.count++;
				}
				//获取当前target
				this.$emit('add',event.target);
			},
			removeCart(event) {
				if(!event._constructed){
					return;
				}
				if(this.food.count){
					this.food.count--;
				}else{
					this.food.count = 0;
				}
			}
		}
	}
</script>
<style lang="stylus">
@import "../assets/stylus/CartControl.styl"
</style>