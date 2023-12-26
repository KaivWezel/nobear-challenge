export default function useFiltered() {
	const route = useRoute();
	const filtered = ref(null);

	async function filterJobs(query) {
		const filterFunction = query?.functie;
		const filterSector = query?.sector;
		const filterShift = query?.ploegendienst;
		const filterSalary = query?.salaris;

		const { data } = await useFetch("/api/jobs");

		const temp = await data.value.jobs.hits.hits.filter((job) => {
			// Catergory filter || functie
			const jobFunction = job._source.website.category;
			const jobSector = job._source.website.sector;
			const jobShift = job._source.vacancy.shiftwork;
			const jobSalary = job._source.vacancy.salary_indication;

			if (filterFunction.length != 0) {
				return jobFunction.some((f) => filterFunction.includes(f));
			}
		});

		filtered.value = toValue(temp);
	}

	watch(
		() => route.query,
		(val) => {
			filterJobs(val);
		},
		{ immediate: true }
	);

	return filtered;
}
