interface StackTraceOptions {
  maxStackSize?: number;
}

export function backtrace(options?: StackTraceOptions) {
  const e = new Error('dummy');

  // const stack = [];
  // let maxStackSize = 10;

  // if (typeof options === 'object' && typeof options.maxStackSize === 'number') {
  //   maxStackSize = options.maxStackSize;
  // }

  // let curr = arguments.callee;
  // while (curr && stack.length < maxStackSize && curr['arguments']) {
  //   // Allow V8 optimizations
  //   // tslint:disable-next-line: prefer-array-literal
  //   const args = new Array(curr['arguments'].length);
  //   for (let i = 0; i < args.length; i += 1) {
  //     args[i] = curr['arguments'][i];
  //   }
  //   if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) {
  //     stack.push(new StackFrame({ args, functionName: RegExp.$1 || undefined }));
  //   } else {
  //     stack.push(new StackFrame({ args }));
  //   }

  //   try {
  //     curr = curr.caller;
  //   } catch (e) {
  //     break;
  //   }
  // }
  // return stack;
  return e.stack;
}
