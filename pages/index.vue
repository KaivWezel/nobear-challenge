<template>
	<div>
		<h1>Kai van Wezel</h1>
		<h2>Creative front end developer</h2>
	</div>
</template>
<script setup>
onMounted(() => {
	console.log("mounted");
});
</script>
<style lang="scss">
h1 {
	font-size: 3rem;

	span {
		color: red;
	}
}
</style>
