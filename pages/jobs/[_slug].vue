<template>
	<nav>
		<nuxt-link to="/">Terug naar vacatures</nuxt-link>
	</nav>
	<div class="page">
		<h1>{{ website.title }}</h1>
		<div class="meta"></div>
		<div class="intro">{{ website.intro }}</div>
		<div class="block description">
			<h2>Functieomschrijving</h2>
			<div v-html="website.description" />
		</div>
		<div class="block requirements">
			<h2>Funtievereisten</h2>
			<div v-html="website.requirements" />
		</div>
		<div class="block benefits">
			<h2>Arbeidsvoorwaarden</h2>
			<div v-html="website.benefits" />
		</div>
	</div>
</template>
<script setup>
const route = useRoute();
const { data } = await useFetch("/api/jobs");

const job = computed(() => data.value.jobs.hits.hits.find((job) => job._id === route.params._slug));
const website = computed(() => job.value._source.website);
const vacancy = computed(() => job.value._source.vacancy);

onMounted(() => {
	console.log(job.value);
});
</script>
<style lang="scss" scoped>
@import "~/assets/styles/main.scss";

.page {
	padding: 2rem;
}

nav {
	background-color: $color-bg;
	padding: 1rem 2rem;
	color: $color-text;

	a,
	a:visited {
		color: $color-text;
		text-decoration: none;
	}
}

h1 {
	margin-bottom: 1rem;
	font-size: 2rem;
}

.block {
	margin: 2rem 0;

	h2 {
		margin-bottom: 0.5rem;
	}

	:deep(ul) {
		list-style-type: disc;
		margin-top: 1rem;

		li {
			margin-top: 0.25rem;
		}
	}
}
</style>
