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
				<VacancyCard v-for="(hit, index) in pageItems" :hit="hit" :index="index" />
			</div>
			<div class="pagination">
				<button v-show="page < totalPages" @click="page++">next</button>
				<button v-show="page > 1" @click="page--">prev</button>
			</div>
		</div>
	</div>
</template>
<script setup>
import filters from "~/assets/data/filters.json";
import useFiltered from "~/composables/useFiltered";
const router = useRouter();

const perPage = 10;
const page = ref(1);
const activeQuery = ref([]);

const { data } = await useFetch("/api/jobs", { query: activeQuery.value });

const filtered = useFiltered();
const pageItems = computed(() => filtered.value?.slice((page.value - 1) * perPage, page.value * perPage));
const totalPages = computed(() => Math.ceil(filtered.value?.length / perPage));

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

.list {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
</style>
