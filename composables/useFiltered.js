export default function useFiltered() {
	const route = useRoute();
	const filtered = ref(null);

	async function filterJobs(query) {
		const filterFunction = query?.functie || [];
		const filterSector = query?.sector || [];
		const filterShift = query?.ploegendienst || [];
		const filterSalary = Array.isArray(query.salaris) ? query?.salaris : [query?.salaris] || [];

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

		// Filter for shift
		temp = temp.filter((job) => {
			const jobShift = job._source.vacancy.shiftwork;
			if (filterShift.length && jobShift) {
				return jobShift.some((f) => filterShift.includes(f));
			} else {
				return true;
			}
		});

		// Filter for salary
		temp = temp.filter((job) => {
			const jobSalary = job._source.vacancy.salary_indication;
			const min_sal = jobSalary.min;
			const max_sal = jobSalary.max;
			const filters = filterSalary.map((val) => {
				const [min, max] = val.split("-");
				return { min, max };
			});
			if (filterSalary.length) {
				return filters.some((val) => {
					if (val.min && val.max) {
						return min_sal >= val.min && min_sal <= val.max;
					} else {
						return false;
					}
				});
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
