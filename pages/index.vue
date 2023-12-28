<template>
	<div>
		<nav>
			<h2><span class="decoration">Pro</span>Industry</h2>
		</nav>
		<div class="jobBoard" :data-scroll="!filtersActive">
			<h1>Vind jouw droombaan!</h1>
			<div class="searchBar">
				<SearchFilter @update:searchTerm="updateQuery" label="Zoek een functie" />
			</div>
			<div class="filters" :class="{ active: filtersActive }">
				<SearchFilter @update:searchTerm="updateQuery" />
				<CategoryFilter
					v-for="filter in filters"
					:category="filter.title"
					:values="filter.values"
					@update:category="updateQuery" />
			</div>
			<div class="list grid">
				<VacancyCard v-for="(hit, index) in pageItems" :hit="hit" :index="index" />
			</div>
			<div class="pagination">
				<button :class="{ active: page < totalPages }" @click="page++">next</button>
				<ClientOnly>
					<div class="pageNumbers">
						<span v-for="i in totalPages" :class="{ active: page === i }" @click="page = i">{{ i }}</span>
					</div>
				</ClientOnly>
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

nav {
	background-color: $color-text;
	color: $color-bg;
	padding: 1rem 2rem;

	h2 {
		text-align: center;
		text-transform: uppercase;

		.decoration {
			color: red;
		}
	}
}

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
	padding-bottom: 6rem;

	h1 {
		text-align: center;
		padding: 0 1rem;
	}

	.searchBar {
		text-align: center;
		width: 80%;
		max-width: 800px;
		margin: 2rem auto;
	}
}

.list {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 0.5rem 1rem;

	&.grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

		@include desktop {
			justify-content: center;
			grid-template-columns: repeat(2, minmax(400px, 600px));
		}
	}
}

.pagination {
	width: 100%;
	display: flex;
	padding: 0.5rem 1rem;

	justify-content: space-between;
	flex-direction: row-reverse;

	.pageNumbers {
		display: flex;
		gap: 0.5rem;

		span.active {
			color: red;
		}

		span {
			cursor: pointer;
		}
	}

	button {
		all: unset;
		background-color: $color-bg;
		color: red;
		outline: 1px solid red;
		font-size: 0.8rem;
		border-radius: 4px;
		padding: 0.5rem 0.75rem;
		transition: all 0.2s ease-out;
		visibility: hidden;

		cursor: pointer;

		&:hover {
			background-color: red;
			color: $color-bg;
			outline: none;
		}
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
