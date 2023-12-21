<template>
	<div>
		<h1>Jobs</h1>
		<div class="jobBoard">
			<div class="filters">
				<CategoryFilter
					v-for="filter in filters"
					:category="filter.title"
					:values="filter.values"
					@update:category="updateQuery" />
			</div>
			<div class="list">
				<VacancyCard v-for="(hit, index) in data.hits.hits" :hit="hit" :index="index" />
			</div>
		</div>
	</div>
</template>
<script setup>
import filters from "~/assets/data/filters.json";

const router = useRouter();

const pagenum = ref(1);

const { data } = await useFetch(`https://data.pro-cluster.com/jobs`, {
	query: {
		perpage: 13,
		pagenum,
		aggs: true,
	},
});

const query = ref({});

function updateQuery({ category, values }) {
	query.value[category] = values;
	router.push({ query: query.value });
}

watch(pagenum, () => {
	console.log(data.value.hits.hits[0]);
	console.log(useQuery());
});
</script>
<style lang="scss">
h1 {
	font-size: 3rem;

	span {
		color: red;
	}
}

.jobBoard {
	display: grid;
	grid-template-columns: 1fr 3fr;
}
</style>
