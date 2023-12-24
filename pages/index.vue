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
const route = useRoute();

const activeQuery = ref([]);

const { data } = useFetch("/api/jobs", { query: activeQuery.value });

function updateQuery({ category, values }) {
	activeQuery.value[category] = values;
	router.push({ query: activeQuery.value });
}
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
