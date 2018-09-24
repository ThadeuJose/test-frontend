import Vue from 'vue'
import App from './component/App.vue'
import store from './store/main.js'

new Vue({
    el: '#app',
    store,
    render: h => h(App),    
    components: { App }
})
