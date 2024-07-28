export function formatNumber(num: number, precision = 4) {
	// @ts-expect-error hex values are effectively numbers, but TS doesn't know that
	return +(Math.round(String(num) + `e+${precision}`) + `e-${precision}`);
}
