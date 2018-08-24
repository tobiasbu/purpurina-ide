import { Widget } from "@phosphor/widgets";
import { WidgetProps } from "./ReactComponentBase";

export interface IReactWidgetBase extends Widget {

    readonly width: number;
    readonly height: number;
    readonly reactComponent: React.Component;
    readonly reactElement: React.ReactElement<WidgetProps>

}