export function keysOf<Obj extends object>(o: Obj): (keyof Obj)[] {
	return Object.keys(o) as (keyof Obj)[];
}
