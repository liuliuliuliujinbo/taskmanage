<template>
	<div id="log">
		<Logins></Logins>
	</div>
</template>

<script>
	import Logins from "../components/login.vue"
	export default{
		name:'Login',
		components:{Logins}
	}
</script>

<style scoped="scoped">
	html,body,#log{
	 height: 100%;
	}
</style>
