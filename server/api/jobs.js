import Jobs from "~/assets/data/jobs.json";
export default defineEventHandler((event) => {
	const query = getQuery(event);

	return { jobs: Jobs, query, params: query.params };
});
