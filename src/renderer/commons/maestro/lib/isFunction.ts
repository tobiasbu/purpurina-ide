type Func = (...args: any[]) => void;

export default function isFunction(obj: any): obj is Func {
  return toString.call(obj) === '[object Function]';
}
