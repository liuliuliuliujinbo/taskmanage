import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义状态
	state: {
	    active: 1,
	    modifygroup:{},
	    leaders:[],
	    members:[],
	    model2:false,
		addtask:false,
		nowgroup:"",
		modifytask:false,
		task:{}
	},
	mutations:{
	  	newActive(state,msg){
	  		state.active=msg;
	  	},
		newModifytask(state,msg){
			state.modifytask=msg;
		},
		newTask(state,msg){
			state.task=msg;
		},
	  	newGroup(state,msg){
	  		state.modifygroup=msg;
	  	},
	  	newLeaders(state,msg){
	  		state.leaders=msg;
	  	},
	  	newMembers(state,msg){
	  		state.members=msg;
	  	},
	  	newModel2(state,msg){
	  		state.model2=msg;
	  	},
		newAddtask(state,msg){
			state.addtask=msg;
		},
		newNowgroup(state,msg){
			state.nowgroup=msg;
		}
	}
})

export default store