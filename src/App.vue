<template>
    <div id="app">
        <nav>
            <router-link to="/">首页</router-link>
            <router-link to="/detail">详情</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
	export default {
		name: "App"
	}
</script>

<style scoped>

</style>