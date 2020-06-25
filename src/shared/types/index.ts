/**
 * Interface used to communicate between main and renderer process.
 */
export interface Message {
  type: number;
  payload: {};
}
