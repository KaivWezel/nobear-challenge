<template>
	<nuxt-link :to="'/jobs/' + hit._id" class="vacancyCard" :data-index="index">
		<h2 class="vacancyCard__title">{{ website.title }}</h2>
		<span class="vacancyCard__subtitle">{{ website.subtitle }}</span>

		<div class="vacancyCard__description">{{ website.intro }}</div>
		<div class="vacancyCard__grid">
			<div class="location">{{ website.location.place }}</div>
			<div class="salary">{{ vacancy.salary_indication.min }} tot {{ vacancy.salary_indication.max }}</div>
			<div class="hours">{{ vacancy.shiftwork[0] }}</div>
			<div class="sector">{{ website.sector }}</div>
			<div class="functie">{{ website.functie }}</div>
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
	padding: 2.5rem 2rem;
	padding-right: 6rem;
	border-radius: 4px;
	text-decoration: none;
	position: relative;
	color: black;
	background-color: white;

	&:visited {
		color: black;
	}

	&__title {
		margin-bottom: 0.25rem;
	}

	&__subtitle {
		display: block;
		font-size: 1.2rem;
		margin-bottom: 1.5rem;
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
