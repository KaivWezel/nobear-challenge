<template>
	<div>
		<div class="jobBoard" :data-scroll="!filtersActive">
			<h1>Jobs</h1>
			<div class="filters" :class="{ active: filtersActive }">
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
			<button class="filterButton" @click="filtersActive = !filtersActive">Filter</button>
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
const filtersActive = ref(false);

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
@import "~/assets/styles/main.scss";

.filters {
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	overflow-y: scroll;
	z-index: 10;
	background-color: $color-white;

	transform: translateY(100%);

	transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
	pointer-events: none;

	&.active {
		padding: 2rem 1rem;
		display: block;
		padding-bottom: 10rem;
		transform: translateY(0%);

		pointer-events: auto;
	}
}

.jobBoard {
	display: grid;
	width: 100%;
	height: 100vh;
	// grid-template-columns: 1fr 3fr;
}

.list {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 0.5rem 1rem;
}

.pagination {
	button {
		display: block;
	}
}

.filterButton {
	position: fixed;
	bottom: 2rem;
	left: 50%;
	transform: translateX(-50%);

	background-color: $color-black;
	color: $color-white;
	border: none;
	padding: 1rem 2rem;
	border-radius: 4px;

	cursor: pointer;

	z-index: 11;
}
</style>
