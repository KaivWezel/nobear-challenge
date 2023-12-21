<template>
	<div>
		<h1>Index</h1>
		<button @click="pagenum++">plus</button>
		<button @click="pagenum--">minus</button>
		<span>{{ pagenum }}</span>
		<VacancyCard v-for="(hit, index) in data.hits.hits" :hit="hit" :index="index" />
	</div>
</template>
<script setup>
const pagenum = ref(1);
const { data } = await useFetch(`https://data.pro-cluster.com/jobs`, {
	query: {
		perpage: 13,
		pagenum,
		aggs: true,
	},
});

watch(pagenum, () => {
	console.log(data.value.hits.hits[0]);
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
