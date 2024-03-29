export async function post(
	url: string,
	data: Record<string, unknown>
): Promise<Response> {
	return fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	});
}
