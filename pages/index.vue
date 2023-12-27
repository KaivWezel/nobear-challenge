<template>
	<div>
		<div class="jobBoard" :data-scroll="!filtersActive">
			<h1>Jobs</h1>
			<div class="filters" :class="{ active: filtersActive }">
				<SearchFilter @update:searchTerm="updateQuery" />
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
				<button :class="{ active: page < totalPages }" @click="page++">next</button>
				<button :class="{ active: page > 1 }" @click="page--">prev</button>
			</div>
			<button class="filterButton" @click="filtersActive = !filtersActive">Filters ({{ filterAmount }})</button>
		</div>
	</div>
</template>
<script setup>
import filters from "~/assets/data/filters.json";
import useFiltered from "~/composables/useFiltered";
const router = useRouter();

const perPage = 10;
const page = ref(1);
const activeQuery = ref({});
const filtersActive = ref(false);
const filterAmount = computed(() => Object.values(activeQuery.value).flat().length);

const { data } = await useFetch("/api/jobs", { query: activeQuery.value });

const filtered = useFiltered();

const pageItems = computed(() => filtered.value?.slice((page.value - 1) * perPage, page.value * perPage));
const totalPages = computed(() => Math.ceil(filtered.value?.length / perPage));

function updateQuery({ category, values }) {
	activeQuery.value[category] = values;
	console.log(activeQuery.value);
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
	background-color: $color-bg;

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
	padding: 1rem 0;
	width: 100%;
	height: 100vh;

	h1 {
		text-align: center;
	}
}

.list {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 0.5rem 1rem;
}

.pagination {
	width: 100%;
	display: flex;
	padding: 0.5rem 1rem;

	justify-content: space-between;
	flex-direction: row-reverse;

	visibility: hidden;
	pointer-events: none;

	button {
		all: unset;
		background-color: $color-bg;
		color: $color-text;
		font-size: 0.8rem;
		border-radius: 4px;
		padding: 0.5rem 0.75rem;
	}

	button.active {
		visibility: visible;
		pointer-events: auto;
	}
}

.filterButton {
	position: fixed;
	bottom: 2rem;
	left: 50%;
	transform: translateX(-50%);

	background-color: $color-text;
	color: $color-bg;
	border: none;
	padding: 1rem 2rem;
	border-radius: 4px;

	cursor: pointer;

	z-index: 11;
}
</style>
