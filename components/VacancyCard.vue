<template>
	<div class="vacancyCard" :data-index="index">
		<h2 class="vacancyCard__title">{{ website.title }}</h2>
		<span class="vacancyCard__subtitle">{{ website.subtitle }}</span>

		<div class="vacancyCard__description">{{ website.intro }}</div>
		<div class="vacancyCard__grid">
			<div class="location">{{ website.location.place }}</div>
			<div class="salary">{{ vacancy.salary_indication.min }} tot {{ vacancy.salary_indication.max }}</div>
			<div class="hours">{{ vacancy.shiftwork[0] }}</div>
			<div class="sector">{{ website.sector?.[0] }}</div>
		</div>
	</div>
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
	border: 1px solid black;
	padding: 2.5rem 2rem;

	&__title {
		margin-bottom: 0.5rem;
	}

	&__subtitle {
		display: block;
		font-size: 1.2rem;
		margin-bottom: 1rem;
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
		gap: 1rem;
	}
}
</style>
