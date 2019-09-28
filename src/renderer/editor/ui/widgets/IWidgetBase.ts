import { Widget } from '@phosphor/widgets';

export interface IWidgetBase extends Widget {
  readonly height: number;
  readonly width: number;
}
