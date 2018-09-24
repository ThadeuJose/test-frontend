<template>	
		<div>		
			<div v-if='detail'>
			 	<div class="resp-container">
			 		<iframe class='resp-iframe' :src=detail.link></iframe> 
			 	</div>
				<div class='detail__title'>{{ detail.title }}</div>			
				<div class='detail__count_box'>
					<div class='detail__viewCount'>Views: {{ detail.viewCount }}</div>
					<div class='detail__likeCount'>Likes: {{ detail.likeCount }}</div>
					<div class='detail__dislikeCount'>Dislikes: {{ detail.dislikeCount }}</div>
				</div>
				<pre class='detail__description'>{{ detail.description }}</pre>
			</div>	
		</div>		 	
</template>

<script>	
  export default {
  	computed:{
  		detail(){
  			return this.$store.getters.detail;
  		} 
  	} 
		
  }
</script>
	
<style scoped>
	.detail{
		display:flex;
	}
	
	.detail__count_box{
		display:flex;
		font-size: 1.25rem;
	}
	
	.detail__title {
		margin-top: 1rem;
		margin-bottom: .5rem;
		font-size: 1.5rem;
		font-weight: 600;
		text-align: center;
	}
	
	.detail__description{
		font-size: 1rem;
		white-space: pre-wrap;
	}
	
	.detail__viewCount{
		margin-right: 5px;
	}
	 
	.detail__likeCount {
		margin-right: 5px;
	}
	
	.resp-container {
		position: relative;
		overflow: hidden;
		padding-top: 56.25%;
	}
	
	.resp-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
	}
</style>
