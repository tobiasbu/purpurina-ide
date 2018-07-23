
import * as GoldenLayout from 'golden-layout';
import {TestComponent} from './TestComponent';

export default function registerComponents(layout: GoldenLayout) {

    layout.registerComponent('test-component', TestComponent);

}