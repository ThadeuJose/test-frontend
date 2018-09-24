<template>	
		<div class='menu'>			
			<button type="button" class ='button' @click="back" v-if="videoId">Voltar</button>
			<div class='search' v-if="!videoId" :class="{moveUp:searched, center:!searched}">
				<input type='text' class ='search__input' placeholder='Pesquisar' :class="{ error:errorFlag}"  v-model='query' >
				<button type="button" class ='button' @click="search">Buscar</button>
			</div>			
		</div>		 	
</template>

<script>	
  export default {
		data () {
	    return {
        query: '',        
        searched: false,
        errorFlag: false,
	    }   
		},		
		computed:{
  		videoId(){
  			return this.$store.getters.videoId;
  		}
  	},
		methods:{		
			search() {				
				if(this.query){
					this.searched = true;
					this.errorFlag = false;
					this.$store.dispatch('GET_LIST_VIDEOS',this.query);
				}else{
					this.errorFlag = true;
				}
			},
			back() {			
				this.$store.dispatch('RESET_VIDEOID');
			}				
		}        	
  }
</script>
	
<style scoped>

	.menu {
		margin-bottom: 1.5rem;
	  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	}
	
	.search {
		display:flex;		
    width:80%;
    transition: all .8s ease;
	}
	
	.search__input{
		border-radius: 5px;
		border: 1px solid grey;
		margin-right: 5px;
		flex:2;
	}
	
	.error{		
		border: 1px solid red;		
	}
		
	.search__input:focus{		
		border: 1px solid black;		
	}
	
	.center{
		position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);	
  }
		
 	.moveUp{
	 	position: relative;
	 	left: 50%;
    transform: translateX(-50%);	
	}	
</style>

