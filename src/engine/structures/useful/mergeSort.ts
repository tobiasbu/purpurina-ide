export type MergeSortFunction<T> = (a: T, b?: T) => number | boolean;

function merge<T>(
  array: T[],
  predicate: MergeSortFunction<T>,
  begin: number,
  begin_right: number,
  end: number
) {
  // Create a copy of the left and right halves.
  let left_size = begin_right - begin;
  let right_size = end - begin_right;
  let left = array.slice(begin, begin_right);
  let right = array.slice(begin_right, end);
  // Merge left and right halves back into original array.
  let i = begin,
    j = 0,
    k = 0;
  while (j < left_size && k < right_size)
    if (predicate(left[j], right[k]) <= 0) array[i++] = left[j++];
    else array[i++] = right[k++];
  // At this point, at least one of the two halves is finished.
  // Copy any remaining elements from left array back to original array.
  while (j < left_size) array[i++] = left[j++];
  // Copy any remaining elements from right array back to original array.
  while (k < right_size) array[i++] = right[k++];

  return array;
}

function msort<T>(
  array: T[],
  predicate: MergeSortFunction<T>,
  start: number,
  end: number
) {
  let len = end - start;

  if (len < 2) return undefined;

  let mid = start + (len >>> 1);
  //let left = list.slice(start, mid);
  //let right = list.slice(mid, end);
  msort(array, predicate, start, mid);
  msort(array, predicate, mid, end);
  return merge(array, predicate, start, mid, end);
}

// http://www.stoimen.com/blog/2010/07/02/friday-algorithms-javascript-merge-sort/
// https://codereview.stackexchange.com/questions/87000/fast-merge-sort-in-javascript
export default function mergeSort<T>(
  array: T[],
  predicate?: MergeSortFunction<T>
) {
  const size = array.length;

  if (size < 2) return array;

  if (predicate === undefined) {
    predicate = function (a: any, b: any) {
      return a < b ? -1 : a === b ? 0 : 1;
    };
  }

  return msort(array, predicate, 0, size); //mid,size);

  /*function merge(left, right)
    {
        var result = [];
 
        while (left.length && right.length) {
            if (left[0] <= right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
     
        while (left.length)
            result.push(left.shift());
     
        while (right.length)
            result.push(right.shift());
     
        return result;
    }*/

  //let mid = 0 + (size >>> 1);
}
