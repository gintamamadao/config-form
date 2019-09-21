import Util from "../util/util";

const reactMoudle = Util.loadModule("react");
const antdMoudle = Util.loadModule("antd");
const AntdInput = antdMoudle.Input;

class Input extends reactMoudle.PureComponent {
    constructor(props) {
        super(props);
    }

    onChange() {}

    render() {
        <AntdInput placeholder="placeholder" />;
    }
}

export default Input;
