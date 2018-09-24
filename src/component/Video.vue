<template>	
		<div class='detail' @click=detail(item.videoId)>		
			<img class='detail__img' :src=thumb  :height=thumbHeight :width=thumbWidth>
			<div class='detail__box'>
				<div class='detail__title'>{{ item.title }}</div>
				<div class='detail__description'>{{ item.description }}</div>
			</div>			
		</div>		 	
</template>

<script>	
  export default {
  	props: ['item'],		
		computed: {
			thumb(){
				return this.item.thumbnails.default.url;
			},
			thumbHeight(){
				return this.item.thumbnails.default.height;
			},			
			thumbWidth(){
				return this.item.thumbnails.default.width;
			}
		},
		methods:{
			detail(id) {
				this.$store.dispatch('GET_DETAIL',id);				
			}					
		}        	
  }
</script>
	
<style scoped>
	.detail {
		cursor:pointer;	
		display:flex;	
		margin-bottom: 1rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	}
	
	.detail:hover{
		box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	}
	
	.detail__img{
		margin-right: 1rem; 
		margin-top: auto;
		margin-bottom:auto;
	}
	.detail__box{
		width:60%;
	}
	.detail__title{
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: .5rem;
		margin-bottom: .5rem;		
	}
	.detail__description{
		margin-bottom: .5rem;
	}	
</style>
