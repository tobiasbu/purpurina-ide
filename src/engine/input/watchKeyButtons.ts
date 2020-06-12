import KeyButtonControl, {
  KeyButtonStatus,
} from './keyButton/KeyButtonControl';
import CustomMap from '../structures/CustomMap';

/**
 *
 * @param {DataMap} watcher
 * @param {Array<KeyButtonControl>} garbage
 *
 */
export default function watchKeyButtons(
  watcher: CustomMap<string, KeyButtonControl>,
  garbage: string[]
) {
  if (watcher.size === 0) return;

  watcher.each(function (code: string, button: KeyButtonControl) {
    if (button.status === KeyButtonStatus.PRESSED) {
      button.status = KeyButtonStatus.POST_PRESSED;
    } else if (button.status === KeyButtonStatus.RELEASED) {
      button.status = KeyButtonStatus.NONE;
      garbage.push(code);
    }
  });

  if (garbage.length !== 0) {
    watcher.eraseList(garbage);
    garbage.splice(0, garbage.length);
  }
}
