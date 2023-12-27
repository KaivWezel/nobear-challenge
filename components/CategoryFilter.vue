<template>
	<div class="filterCategory">
		<h3 class="filterCategory__title">{{ category.toUpperCase() }}</h3>

		<div class="filterCategory__values">
			<template v-for="(value, index) in props.values" :key="index">
				<div class="filterCategory__value" v-if="index + 1 <= visibleAmount">
					<input type="checkbox" :id="value.text" :value="value.value" v-model="checkedValues" />
					<label :for="value.text">{{ value.text }}</label>
				</div>
			</template>
		</div>

		<button class="showMore" @click="showMore = !showMore">{{ showMore ? "Minder tonen" : "Alles tonen" }}</button>
	</div>
</template>
<script setup>
const route = useRoute();
const props = defineProps({
	category: {
		type: String,
		default: "category x",
	},
	values: {
		type: Array,
		default: [],
	},
});

const showMore = ref(false);
const visibleAmount = computed(() => (showMore.value ? props.values.length : 5));
const checkedValues = ref([]);

onMounted(() => {
	setFilter();
});

const setFilter = () => {
	if (!route.query[props.category]) {
		checkedValues.value = [];
	} else {
		checkedValues.value = checkedValues.value.concat(route.query[props.category]);
	}
};

const updateFilter = () => {
	emit("update:category", { category: props.category, values: checkedValues.value });
};

watch(checkedValues, updateFilter);

const emit = defineEmits(["update:category"]);
</script>
<style lang="scss">
@import "~/assets/styles/main.scss";

.filterCategory {
	margin-bottom: 2rem;

	&__title {
		position: relative;
		display: inline-block;
		margin-bottom: 0.5rem;
	}

	&__values {
	}

	&__value {
		margin-bottom: 0.25rem;

		input {
			display: inline-block;
			margin-right: 0.5rem;
			padding: 4rem;
		}
	}

	.showMore {
		all: unset;
		font-size: 0.8rem;
		color: $color-black;
		text-decoration: underline;
		cursor: pointer;
	}
}
</style>
