<style lang="stylus">
@import "../assets/stylus/mixin.styl"
	.rating-select{
		.rating-type{
			margin: 0 18px;
			border-1px(rgba(7,17,27,0.1));
			padding: 12px 0;
			font-size:0;
			span{
				display: inline-block;
				font-size: 12px;
				margin-right: 8px;
				padding: 8px 12px;
				border-radius: 1px;
				background: rgb(0,160,200);
				color: rgb(77,85,93);
				&.positive{
					background: rgba(0,160,200,0.2);
					&.active{
						background: rgb(0,160,200);
					}
				}
				&.negative{
					background: rgba(77,85,93,0.2);
					&.active{
						background: rgb(77,85,93);
					}
				}
				&.active{
					color: #fff;
				}
				i{
					font-size: 8px;
					padding-left: 5px;
				}
			}
		}
		.switch{
			padding: 12px 18px;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			color: rgb(147,153,169);
			line-height: 24px;
			font-size: 0;
			&.on{
				.icon{
					color: #00c850;
				}
			}
			.icon{
				display: inline-block;
				font-size: 24px;
				margin-right: 4px;
				vertical-align: top;
			}
			.text{
				display: inline-block;
				font-size: 12px;
				vertical-align: top;
			}
		}
	}
</style>
<template>
	<div class="rating-select">
		<div class="rating-type">
			<span @click="select(2,$event)" class="positive" :class="{'active':selectType === 2}">{{desc.all}}<i>{{ratings.length}}</i></span>
			<span @click="select(0,$event)" class="positive" :class="{'active':selectType === 0}">{{desc.positive}}<i>{{positives.length}}</i></span>
			<span @click="select(1,$event)" class="negative" :class="{'active':selectType === 1}">{{desc.negative}}<i>{{negatives.length}}</i></span>
		</div>
		<div @click="toggleContent($event)" class="switch" :class="{'on':onlyContent}">
			<span class="icon icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default{
		props: {
			ratings: {
				type: Array,
				default() {
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				})
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				})
			}
		},
		methods: {
			select(type,event) {
				if(!event._constructed){ //自己派发事件为true；浏览器原生派发为false
					return;
				}
				this.selectType = type;
				//派发事件
				this.$emit('select-type', type);
			},
			toggleContent(event) {
				if(!event._constructed){ //自己派发事件为true；浏览器原生派发为false
					return;
				}
				this.onlyContent = !this.onlyContent;
				this.$emit('content-toggle', this.onlyContent);
			}
		}
	}
</script>