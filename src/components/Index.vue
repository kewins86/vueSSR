<template>
    <div>
        <div>index page</div>
        <p>num: {{$store.state.count}}</p>
        <button @click="$store.commit('add')" >add</button>
    </div>
</template>

<script>
	export default {
		name: "Index"
	}
</script>

<style scoped>

</style>
