
type Stripable = string | Buffer;

/**
 * Strip the final newline character from a string/buffer
 * @see https://github.com/sindresorhus/strip-final-newline
 *
 * @param input
 */
export default function<T extends Stripable>(input: T): Stripable {
  const LF = typeof input === 'string' ? '\n' : '\n'.charCodeAt(0);
  const CR = typeof input === 'string' ? '\r' : '\r'.charCodeAt(0);
  let result: Stripable;

	if (input[input.length - 1] === LF) {
		result = input.slice(0, input.length - 1);
	}

	if (input[input.length - 1] === CR) {
		result = input.slice(0, input.length - 1);
	}

	return result;
}
