<template>
	<div class="searchField">
		<label for="term">Trefwoord</label>
		<input ref="inputSearch" type="text" id="term" v-model="searchTerm" />
	</div>
</template>
<script setup>
const inputSearch = ref(null);

const searchTerm = ref("");

const emit = defineEmits(["update:searchTerm"]);

onMounted(() => {
	inputSearch.value.addEventListener("change", (e) => {
		emit("update:searchTerm", { category: "q", values: e.target.value });
	});
});
</script>
<style lang="scss">
@import "~/assets/styles/main.scss";

.searchField {
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	margin-bottom: 2rem;

	label {
		font-size: 0.8rem;
	}

	input {
		font-size: 1.1rem;
		border: none;
		background: $color-bg;
		box-shadow: 1px 1px 10px 1px rgba(black, 0.1) inset;
		padding: 0.5rem;
		color: $color-text;
	}
}
</style>
