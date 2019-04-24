<template>
	<div>
		<Nav></Nav>
		<Gzt v-if="active==1"></Gzt>
		<Rw v-if="active==2"></Rw>
		<Log v-if="active==3"></Log>
		<Rwz v-if="active==4"></Rwz>
	</div>
</template>

<script>
	import Nav from "../components/nav.vue"
	import Gzt from "../components/gzt.vue"
	import Rwz from "../components/rwz.vue"
	import Rw from "../components/rw.vue"
	import Log from "../components/log.vue"
	export default {
		name:'Main',
		components:{Nav,Gzt,Rwz,Rw,Log},
		data() {
			return {
				
			};
		},
		methods:{
			
		},
		mounted(){
			this.$store.commit('newActive',1);
			if(sessionStorage.getItem("user")==""||sessionStorage.getItem("user")==null){
				alert("请先登录 ")
				this.$router.push({name:"login",params:{}})
			}
		},
		computed:{
			active(){
				return this.$store.state.active;
			}
		}
	}
</script>

<style lang="less">
Gzt{
	margin-left: 62px;
}
</style>