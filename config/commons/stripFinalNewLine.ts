
/**
 * Strip the final newline character from a string/buffer
 * @see https://github.com/sindresorhus/strip-final-newline
 *
 * @param input
 */
export default function<T extends any>(input: T): T {
  const LF = typeof input === 'string' ? '\n' : '\n'.charCodeAt(0);
	const CR = typeof input === 'string' ? '\r' : '\r'.charCodeAt(0);

	if (input[input.length - 1] === LF) {
		input = input.slice(0, input.length - 1);
	}

	if (input[input.length - 1] === CR) {
		input = input.slice(0, input.length - 1);
	}

	return input;
}
