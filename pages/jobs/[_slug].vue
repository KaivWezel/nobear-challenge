<template>
	<div>
		<nav>
			<button @click="routeBack">Terug <span class="desktop-only">naar vacatures</span></button>
			<h2><span class="decoration">Pro</span>Industry</h2>
		</nav>
		<div class="page">
			<h1>{{ website.title }}</h1>
			<div class="meta"></div>
			<div class="block intro">{{ website.intro }}</div>
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
			<button @click="scrollToTop" class="scrollToTop">Terug naar boven</button>
		</div>
	</div>
</template>
<script setup>
const route = useRoute();
const router = useRouter();
const { data } = await useFetch("/api/jobs");

const job = computed(() => data.value.jobs.hits.hits.find((job) => job._id === route.params._slug));
const website = computed(() => job.value._source.website);
const vacancy = computed(() => job.value._source.vacancy);

onMounted(() => {});

const routeBack = () => {
	try {
		router.go(-1);
	} catch (error) {
		router.push("/");
	}
};
const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
		duration: 2,
	});
};
</script>
<style lang="scss" scoped>
@import "~/assets/styles/main.scss";

nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2rem;
	padding-left: 3rem;

	button {
		background: none;
		border: none;

		cursor: pointer;
		color: $color-bg;
		text-decoration: none;
		position: relative;

		&::before {
			display: block;
			content: "";
			position: absolute;
			width: 8px;
			height: 8px;
			border-style: solid;
			border-width: 0.1rem 0.1rem 0 0;
			border-color: $color-bg;
			left: 0;
			top: 50%;
			transform: translate(-1rem, -50%) rotate(-135deg);
		}
	}
}

.page {
	padding: 2rem;

	@include desktop {
		padding: 4rem;
	}

	.block {
		margin: 2rem 0;
		max-width: 800px;
		line-height: 1.4;

		h2 {
			margin-bottom: 0.5rem;
		}

		:deep(ul) {
			list-style-type: disc;
			margin-top: 1rem;
			text-wrap: balance;

			li {
				margin-top: 0.5rem;
				line-height: 1.4;
			}
		}
	}
}

.scrollToTop {
	all: unset;
	display: block;
	float: right;

	// background-color: red;
	padding: 0.5rem;
	font-size: 0.8rem;
	color: red;
	text-decoration: underline;
	border-radius: 4px;
}

h1 {
	margin-bottom: 1rem;
	font-size: 2rem;
}
</style>
