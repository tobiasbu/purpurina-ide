
export interface StackFrameProps {
  functionName?: string;
  args?: any[];
}

export default class StackFrame {
  public readonly functionName: string;
  public readonly args: any[];

  constructor(props?: StackFrameProps) {
    if (props) {
      this.functionName = props.functionName;
      this.args = props.args;
    }
  }

}
