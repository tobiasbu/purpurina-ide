import { ConsoleMessagePayload } from '../../../log/types';
import hyper from 'hyperhtml';
import LoggerMiddleware from '../../../log/LoggerMiddleware';

function spanMessage(message: string, index: number, args: any[]) {

  const style = (typeof (args[index]) === 'string') ? args[index] : '';

  return hyper()`
    <span style=${style}>${message.trim()}</span>
  `;
}

export function parseMessage(payload: ConsoleMessagePayload) {

  const type = typeof (payload.message);

  if (type === 'string') {
    if (payload.args.length > 0) {
      const split = (payload.message as string).split('%c').filter(v => v !== '');

      if (split.length > 0) {

        LoggerMiddleware.original.log(split);

        return hyper()`${split.map((value, index) => spanMessage(value, index, payload.args))}`;

      }

    }
    return (payload.message as string).trim();
  }

  return '';
}
