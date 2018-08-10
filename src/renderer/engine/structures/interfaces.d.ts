
type MergeSortFunction<T> = (a: T, b?: T) => number | boolean;
type FindPredicate<T> = (element: T) => number | boolean;
type ListEachFunction<T> = (element: T, index: number, ...args: any[]) => T | void;

