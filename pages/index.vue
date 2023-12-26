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
import useFiltered from "~/composables/useFiltered";
const router = useRouter();
const route = useRoute();

const activeQuery = ref([]);

const { data } = await useFetch("/api/jobs", { query: activeQuery.value });

async function allCategories() {
	let temp = [];
	data.value.jobs.hits.hits.forEach((job) => {
		const filter = job._source.website.category;
		const values = Object.values(filter);
		if (values.some((r) => temp.includes(r))) {
			console.log("exists");
		} else {
			temp.push(...values);
		}
	});

	console.log(temp);
}

onMounted(() => {
	allCategories();
});

const filtered = useFiltered();

function updateQuery({ category, values }) {
	activeQuery.value[category] = values;
	router.push({ query: activeQuery.value });
}

watch(filtered, () => {
	console.log(filtered);
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

.list {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
</style>
