<template>
	<div class="vacancyCard">
		<h2>Vacancy card {{ props.index + 1 }}</h2>
		<h3>{{ hit._source.website.title }}</h3>
	</div>
</template>
<script setup>
const props = defineProps({
	index: { type: Number, default: -1 },
	hit: { default: {} },
});
</script>
<style lang="scss"></style>
