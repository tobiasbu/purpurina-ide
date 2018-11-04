
namespace ArrayUtils {

    export function remove<T>(array: Array<T>, item: T): boolean {
        const index = array.indexOf(item);
        return !!~index && !!array.splice(index, 1);
    }

    /**
  * An array-like object which supports item assignment.
  */
    export type MutableArrayLike<T> = {
        readonly length: number;
        [index: number]: T;
    };

    /**
       * Move an element in an array from one index to another.
       *
       * @param array - The mutable array-like object of interest.
       *
       * @param fromIndex - The index of the element to move. Negative
       *   values are taken as an offset from the end of the array.
       *
       * @param toIndex - The target index of the element. Negative
       *   values are taken as an offset from the end of the array.
       *
       * #### Complexity
       * Linear.
       *
       * #### Undefined Behavior
       * A `fromIndex` or `toIndex` which is non-integral.
       *
       * #### Example
       * ```typescript
       * import { ArrayExt } from from '@phosphor/algorithm';
       *
       * let data = [0, 1, 2, 3, 4];
       * ArrayExt.move(data, 1, 2);  // [0, 2, 1, 3, 4]
       * ArrayExt.move(data, 4, 2);  // [0, 2, 4, 1, 3]
       * ```
       */
    export function move<T>(array: MutableArrayLike<T>, fromIndex: number, toIndex: number): void {
        let n = array.length;
        if (n <= 1) {
            return;
        }
        if (fromIndex < 0) {
            fromIndex = Math.max(0, fromIndex + n);
        } else {
            fromIndex = Math.min(fromIndex, n - 1);
        }
        if (toIndex < 0) {
            toIndex = Math.max(0, toIndex + n);
        } else {
            toIndex = Math.min(toIndex, n - 1);
        }
        if (fromIndex === toIndex) {
            return
        }
        let value = array[fromIndex];
        let d = fromIndex < toIndex ? 1 : -1;
        for (let i = fromIndex; i !== toIndex; i += d) {
            array[i] = array[i + d];
        }
        array[toIndex] = value;
    }

    /**
     * Insert a value into an array at a specific index.
     *
     * @param array - The array of interest.
     *
     * @param index - The index at which to insert the value. Negative
     *   values are taken as an offset from the end of the array.
     *
     * @param value - The value to set at the specified index.
     *
     * #### Complexity
     * Linear.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral.
     *
     * #### Example
     * ```typescript
     * import { ArrayExt } from '@phosphor/algorithm';
     *
     * let data = [0, 1, 2];
     * ArrayExt.insert(data, 0, -1);  // [-1, 0, 1, 2]
     * ArrayExt.insert(data, 2, 12);  // [-1, 0, 12, 1, 2]
     * ArrayExt.insert(data, -1, 7);  // [-1, 0, 12, 1, 7, 2]
     * ArrayExt.insert(data, 6, 19);  // [-1, 0, 12, 1, 7, 2, 19]
     * ```
     */
    export function insert<T>(array: Array<T>, index: number, value: T): void {
        let n = array.length;
        if (index < 0) {
            index = Math.max(0, index + n);
        } else {
            index = Math.min(index, n);
        }
        for (let i = n; i > index; --i) {
            array[i] = array[i - 1];
        }
        array[index] = value;
    }

}

export default ArrayUtils;