type KeysOfUnion<T> = T extends T ? keyof T : never;

export function keysOf<Obj extends object>(o: Obj): KeysOfUnion<Obj>[] {
	return Object.keys(o) as KeysOfUnion<Obj>[];
}
