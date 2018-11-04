
export type FindPredicate<T> = (element: T) => number | boolean;
export type ListEachFunction<T> = (element: T, index: number, ...args: any[]) => any

export type MapEachFunction<V> = (key: string, value: V) => any;
export type MapFindPredicate<V> = (property: string, value: V) => void | boolean | number;