<template>
	<nuxt-link :to="'/jobs/' + hit._id" class="vacancyCard" :data-index="index">
		<h3 class="vacancyCard__title">{{ website.title }}</h3>
		<span class="vacancyCard__subtitle">{{ website.subtitle }}</span>

		<!-- <div class="vacancyCard__description">{{ website.intro }}</div> -->
		<div class="vacancyCard__grid">
			<div class="location">{{ website.location.place }}</div>
			<div class="salary">€{{ vacancy.salary_indication.min }} tot €{{ vacancy.salary_indication.max }}</div>
			<div class="hours">{{ vacancy.shiftwork[0] }}</div>
			<div class="sector">{{ website.category?.[0] }}</div>
		</div>
		<div class="vacancyCard__links">
			<nuxt-link class="detail" :to="'/jobs/' + hit._id">Bekijk vacature</nuxt-link>
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
@import "~/assets/styles/main.scss";
.vacancyCard {
	display: grid;
	flex-direction: column;
	border: 1px solid rgba(black, 0.1);
	width: 100%;
	padding: 1.5rem 1rem;
	// padding-right: 6rem;
	border-radius: 4px;
	text-decoration: none;
	position: relative;
	color: $color-text;
	background-color: $color-bg;

	box-shadow: 3px 3px 10px 4px rgba($color-text, 0.1);

	transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);

	&:hover {
		border: 1px solid rgba(red, 0.5);
		box-shadow: 2px 2px 8px 2px rgba($color-text, 0.05);

		a::before {
			transform: translate(1.2rem, -50%) rotate(45deg);
		}
	}

	&__title {
		margin-bottom: 1.5rem;
		font-size: 1.5rem;
		line-height: 1.25;

		@include desktop {
			font-size: 2rem;
		}
	}

	&__subtitle {
		display: block;
		font-size: 1rem;
		font-weight: 400;
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
		font-weight: 200;
		letter-spacing: 0.012rem;
	}

	&__links {
		align-self: flex-end;

		a {
			text-decoration: none;
			color: red;
			position: relative;

			&::before,
			&::after {
				display: block;
				content: "";
				position: absolute;
			}

			&::before {
				width: 8px;
				height: 8px;
				border-style: solid;
				border-width: 0.2rem 0.2rem 0 0;
				right: 0;
				top: 50%;
				transform: translate(1rem, -50%) rotate(45deg);

				transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
			}
		}
	}
}
</style>
