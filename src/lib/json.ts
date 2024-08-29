export function parseJSON(data: string) {
	return JSON.parse(data, (key, value) => (value === null ? undefined : value));
}
