import Vue from 'vue'
var etLog= {
    install(Vue){
        Vue.prototype.etLog = {
        	val:function(val){
        		console.log(val)
        	}
        };
        
    }
}
Vue.use(etLog);