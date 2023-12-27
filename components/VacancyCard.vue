<template>
	<nuxt-link :to="'/jobs/' + hit._id" class="vacancyCard" :data-index="index">
		<h2 class="vacancyCard__title">{{ website.title }}</h2>
		<span class="vacancyCard__subtitle">{{ website.subtitle }}</span>

		<!-- <div class="vacancyCard__description">{{ website.intro }}</div> -->
		<div class="vacancyCard__grid">
			<div class="location">{{ website.location.place }}</div>
			<div class="salary">{{ vacancy.salary_indication.min }} tot {{ vacancy.salary_indication.max }}</div>
			<div class="hours">{{ vacancy.shiftwork[0] }}</div>
			<div class="sector">{{ website.sector?.[0] }}</div>
		</div>
		<div class="vacancyCard__links">
			<nuxt-link :to="'/jobs/' + hit._id">Bekijk vacature</nuxt-link>
		</div>
	</nuxt-link>
</template>
<script setup>
const props = defineProps({
	index: { type: Number, default: -1 },
	hit: { default: {} },
});

const website = computed(() => props.hit._source.website);
const vacancy = computed(() => props.hit._source.vacancy);
</script>
<style lang="scss" scoped>
.vacancyCard {
	display: block;
	border: 1px solid rgba(black, 0.1);
	width: 100%;
	padding: 1.5rem 1rem;
	// padding-right: 6rem;
	border-radius: 4px;
	text-decoration: none;
	position: relative;
	color: black;
	background-color: white;

	box-shadow: 2px 2px 10px 2px rgba(black, 0.1);

	&:visited {
		color: black;
	}

	&__title {
		margin-bottom: 1.5rem;
		font-size: 1.2rem;
	}

	&__subtitle {
		display: block;
		font-size: 1rem;
		margin-bottom: 1.5rem;
		font-size: max(0.8rem, 10x);
	}

	&__description {
		line-height: 1.2rem;
		max-height: 3.6rem;
		word-wrap: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 1.5rem;
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}
}
</style>
