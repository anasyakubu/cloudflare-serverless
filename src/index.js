export default {
	async fetch(request, env, ctx) {
		const url = "https://api.dailyinvoice.com.ng/waitlist";

		// gatherResponse returns both content-type & response body as a string
		async function gatherResponse(response) {
			const { headers } = response;
			const contentType = headers.get("content-type") || "";
			if (contentType.includes("application/json")) {
				return { contentType, result: JSON.stringify(await response.json()) };
			}
			return { contentType, result: response.text() };
		}

		const response = await fetch(url);
		const { contentType, result } = await gatherResponse(response);

		const options = { headers: { "content-type": contentType } };
		return new Response(result, options);
	},
};