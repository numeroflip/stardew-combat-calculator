export function formatNumber(num: number) {
	// @ts-expect-error
	return +(Math.round(String(num) + 'e+4') + 'e-4');
}
