<template>	
    <div class="app">
    	<Menu></Menu>
    	<Video v-for="item in videos" :key="item.videoId" :item="item" v-if ="!videoId" ></Video>
    	<div class='button-box'>	
		  	<button class='button big-width' @click='prev_videos' v-if ="!videoId&&prevToken">Anterior</button>
		  	<button class='button big-width' @click='next_videos' v-if ="!videoId&&nextToken">Proximo</button>
    	</div>
    	<Detail v-if ="videoId"></Detail>
    </div>
</template>

<script>
	import Menu from './Menu.vue'
	import Video from './Video.vue'
	import Detail from './Detail.vue'

  export default {
		data () {
	    return {
        msg: config.apiKey,        
	    }   
		},        
		methods:{
  		next_videos(){
  			return this.$store.dispatch('GET_NEXT_LIST_VIDEOS');
  		},
  		prev_videos(){
  			return this.$store.dispatch('GET_PREV_LIST_VIDEOS');
  		},
  	},
		computed:{
			videos(){
				return this.$store.getters.video;
			},
  		videoId(){
  			return this.$store.getters.videoId;
  		},
  		prevToken(){
  			return this.$store.getters.prevToken;
  		},
  		nextToken(){
  			return this.$store.getters.nextToken;
  		},
  		err(){
  			return this.$store.getters.err;
  		}
  	},		
		components: { 
			Menu,Video,Detail
		}
  }
</script>
<style>
	*,
	*::after,
	*::before {
		margin: 0;
		padding: 0;
		box-sizing: inherit;
	}

	html {
		font-size: 62.5%;/*1 rem = 10px; 10px/16px = 62.5%*/
	}	

	@media (max-width: 75em) {
		html {
	  	font-size: 56.25%;/*1 rem = 9px; 9px/16px = 56.25%*/
		}
	}

	@media (max-width: 56.25em) {
		html {
		  font-size: 50%;/*1 rem = 8px; 8px/16px = 50%*/
	  }
	}

	@media (min-width: 112.5em) {
		html {
		  font-size: 75%;/*1 rem = 12px; 12px/16px = 75%*/
		}		
	}

	body {
		box-sizing: border-box;
		padding: 3rem;
		font-family: 'Roboto', sans-serif;
		font-weight:  400;
		line-height: 1.7;
		color:#282828 /*Black*/
	}
	.app{
		margin:auto;
	}

	.button-box{
		display: flex;
	}

	.button{
		display: inline-block;
		
		background-color: #ff0000; /* Red */
		color: #ffffff; /* White */
		
		border: 1px solid #ff0000; /* Red */
		border-radius: 5px;
		
		padding: 1rem;
		text-align: center;
		text-decoration: none;
		
		font-size: 1.25rem;	
		font-weight: 600;
		font-family: inherit;
		text-transform: uppercase;
		
	}

	.big-width {
		width:100%;
	}
</style>

