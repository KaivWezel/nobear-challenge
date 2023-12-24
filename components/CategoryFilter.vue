<template>
	<div class="filterCategory">
		<h3>{{ category }}</h3>
		<span>{{ checkedValues }}</span>
		<div class="filterCategory__values">
			<div class="filterCategory__value" v-for="(value, index) in props.values" :key="index">
				<input type="checkbox" :id="value" :value="value" v-model="checkedValues" />
				<label :for="value">{{ value }}</label>
			</div>
		</div>
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
<style lang="scss"></style>
