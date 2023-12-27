export default function useFiltered() {
	const route = useRoute();
	const filtered = ref(null);

	async function filterJobs(query) {
		const filterFunction = query?.functie || [];
		const filterSector = query?.sector || [];
		const filterShift = query?.ploegendienst || [];
		const filterSalary = query?.salaris | [];

		const { data } = await useFetch("/api/jobs");

		// Filter for function
		let temp = await data.value.jobs.hits.hits.filter((job) => {
			// Catergory filter || functie
			const jobFunction = job._source.website.category;
			const jobSector = job._source.website.sector;
			const jobShift = job._source.vacancy.shiftwork;
			const jobSalary = job._source.vacancy.salary_indication;

			if (filterFunction.length) {
				return jobFunction.some((f) => filterFunction.includes(f));
			} else {
				return true;
			}
		});

		// Filter for sector
		temp = temp.filter((job) => {
			const jobSector = job._source.website.sector;
			if (filterSector.length && jobSector) {
				return jobSector.some((f) => filterSector.includes(f));
			} else {
				return true;
			}
		});

		filtered.value = temp;
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
