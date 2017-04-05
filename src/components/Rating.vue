<template>
	<div class="rating">
		<div class="rating-top">
			<div class="left">
				<h2>3.9</h2>
				<p class="title">综合评分</p>
				<p class="txt">高于周边商家69.2%</p>
			</div>
			<div class="right-list">
				<dl>
					<dt>服务时间</dt>
					<dd><star></star></dd>
				</dl>
				<dl>
					<dt>服务态度</dt>
					<dd><star></star></dd>
				</dl>
				<dl>
					<dt>送达时间</dt>
					<dd>44分钟</dd>
				</dl>
			</div>
		</div>
	</div>
</template>
<script>
import star from 'components/star';
	export default {
		props: {
			
		},
		components: {
			star: star
		}
	}
</script>
<style>
@import '../assets/stylus/rating.styl';
</style>