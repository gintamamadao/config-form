import { PureComponent } from "react";
import antd from "antd";

const AntdInput = antd.Input;

class Input extends PureComponent {
    constructor(props) {
        super(props);
    }

    onChange() {}

    render() {
        <AntdInput placeholder="placeholder" />;
    }
}

export default Input;
