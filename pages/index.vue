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
				<VacancyCard v-for="(hit, index) in data.jobs.hits.hits" :hit="hit" :index="index" />
			</div>
		</div>
	</div>
</template>
<script setup>
import filters from "~/assets/data/filters.json";

const router = useRouter();
const pagenum = ref(1);
const query = ref({});

const { data } = await useFetch(`/api/jobs`, {
	query: {
		perpage: 50,
		pagenum,
		aggs: true,
	},
});

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
