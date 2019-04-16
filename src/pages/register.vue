<template>
	<div id="reg">
		<Registers></Registers>
	</div>
</template>

<script>
	import Registers from "../components/register.vue"
	export default{
		name:'Register',
		components:{Registers}
	}
</script>

<style scoped="scoped">
	html,body,#reg{
	 height: 100%;
	}
</style>
