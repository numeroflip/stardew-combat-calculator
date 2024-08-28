type KeysOfUnion<T> = T extends T ? keyof T : never;

export function keysOf<Obj extends object>(o: Obj): KeysOfUnion<Obj>[] {
	return Object.keys(o) as KeysOfUnion<Obj>[];
}

export function createKeyedObject<
	T extends { [key: string]: unknown },
	Key extends keyof T & string,
	KeyValue extends T[Key] & string
>(key: Key, items: T[]): Record<KeyValue, T> {
	return items.reduce(
		(acc, item) => {
			const itemKey = item[key] as KeyValue;

			if (typeof itemKey !== 'string') {
				throw new Error('Invalid key type. It must be a string');
			}

			acc[itemKey] = item;
			return acc;
		},
		{} as Record<KeyValue, T>
	);
}
