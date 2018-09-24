import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
	video:[],
	videoId: null,
	detail: null,
	query:'',
	nextPageToken:'',
	prevPageToken:'',
	err:{}	
}

const actions = {
	GET_LIST_VIDEOS:({ commit },query)=>{
	 	return axios.get(`https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${query}&key=${config.apiKey}`).then((response) => {	 		
		 	commit('SET_QUERY', { elem: query });
	 		commit('SET_NEXT_TOKEN', { elem: response.data.nextPageToken });
	 		commit('SET_PREV_TOKEN', { elem: null });
			commit('SET_LIST_VIDEOS', { elem: response.data.items });	 	  		
		}, (err) => {			
			console.log(err)
			commit('ERROR', { elem: err });
		})	
	},	
	
	
	GET_NEXT_LIST_VIDEOS:({ state,dispatch })=>{			
			dispatch('GET_TOKEN_LIST_VIDEOS',state.nextPageToken);
	},
	
	GET_PREV_LIST_VIDEOS:({ state,dispatch })=>{			
	 		dispatch('GET_TOKEN_LIST_VIDEOS',state.prevPageToken);
	},
	
	GET_TOKEN_LIST_VIDEOS:({ commit,state },token)=>{			
	 	return axios.get(`https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${state.query}&pageToken=${token}&key=${config.apiKey}`).then((response) => {	 		
 			commit('SET_NEXT_TOKEN', { elem: response.data.nextPageToken });
 			commit('SET_PREV_TOKEN', { elem: response.data.prevPageToken });
			commit('SET_LIST_VIDEOS', { elem: response.data.items });	 	  		
		}, (err) => {			
			console.log(err);
			commit('ERROR', { elem: err });
		})	
	},
	
	GET_DETAIL:({ commit },id)=>{		
	 	return axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet,statistics&key=${config.apiKey}`).then((response) => {
			commit('SET_DETAIL', { elem: response.data });
			commit('SET_VIDEOID',{id:id});	 	  		
		}, (err) => {			
			console.log(err)
			commit('ERROR', { elem: err });
		})	
	},
	
	RESET_VIDEOID:({ commit })=>{
	 	commit('SET_VIDEOID',{id:null});
	}	
	
}

const mutations = {
	  
  SET_LIST_VIDEOS: function (state, { elem }) {
    state.video = [];
  	for (let e of elem  ){
  		let obj = {};
  		obj.videoId = e.id.videoId; 
  		obj.title = e.snippet.title;
  		obj.description = e.snippet.description;
  		obj.thumbnails = e.snippet.thumbnails;
  		state.video.push(obj) ;
  	}  	
  },      
  
  SET_DETAIL: function (state, { elem }) { 
  	let obj = {};
  	obj.link = 'https://www.youtube.com/embed/'+elem.items[0].id;
  	obj.title =  elem.items[0].snippet.title;
  	obj.description =  elem.items[0].snippet.description;
  	obj.viewCount = elem.items[0].statistics.viewCount;
  	obj.likeCount = elem.items[0].statistics.likeCount;
  	obj.dislikeCount = elem.items[0].statistics.dislikeCount;  	  	
  	state.detail = obj;   	
  },
  
  SET_VIDEOID: function (state, { id }) {  	 
  	state.videoId = id;  	
  },
  
  SET_NEXT_TOKEN: function (state, { elem }) {  
  	state.nextPageToken = elem;  	
  },
  
  SET_PREV_TOKEN: function (state, { elem }) {  
  	state.prevPageToken = elem;  	
  },
  
  SET_QUERY: function (state, { elem }) {  
  	state.query = elem;  	
  },
  
  ERROR: function (state, { elem }) {  
  	state.err = elem;  	
  },
}

const getters = {
	video:state => {
		return state.video;
	},
	videoId:state => {		
		return state.videoId;
	},
	detail:state => {
		return state.detail;
	},
	nextToken:state => {
		return state.nextPageToken;
	},
	prevToken:state => {
		return state.prevPageToken;
	},	
	err:state => {
		return state.err;
	},
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
