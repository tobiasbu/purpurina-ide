
type MemoFn<T> = () => T;
type Memo<T> = T | MemoFn<T>;

export default function memoize<T>(memo: Memo<T>, ...dependencies: any[]) {
  let value: T;
  let deps: any[] = dependencies;

  if (typeof memo !== 'function') {
    const initialMemo = memo;
    // tslint:disable-next-line: no-parameter-reassignment
    memo = (function () {
      return initialMemo;
    });
  }

  function someValueChanged(value: any, index: number) {
    return value !== deps[index];
  }
  function hasChanged(...newDeps: any[]) {
    return newDeps.some(someValueChanged);
  }
  function update(...newDeps: any[]) {
    if (hasChanged(newDeps)) {
      value = (memo as MemoFn<T>)();
      deps = newDeps;
    }
    return value;
  }

  function get() {
    return value;
  }

  update();

  return {
    update,
    get,
  };
}
