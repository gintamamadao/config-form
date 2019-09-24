import React from "react";
import UnctrlInput from "../unctrl_input/unctrl_input";
import ItemView from "../item_view/item_view";
import Util from "../util/util";
import { Type } from "schema-verify";

const DEFAULT_TYPE = "text";
const TEXTAREA_TYPE = "textArea";
const DEFAULT_ROW = 3;

class CInput extends React.PureComponent {
    constructor(props) {
        Util.bindme(super(props), "onChange");
    }

    onChange(e) {
        const onChange = this.props.onChange;
        Type.function.is(onChange) && onChange(e);
    }

    render() {
        const { props } = this;
        const { disabled, value, focusControl, placeholder } = props;

        let type = props.type;
        let row = props.row;
        let isIllegal = props.isIllegal;

        type = type ? type : DEFAULT_TYPE;

        const inputProps = {
            disabled: disabled,
            type: type,
            value: value,
            focusControl: focusControl,
            placeholder: placeholder,
            onChange: this.onChange
        };

        if (type === TEXTAREA_TYPE) {
            row = Type.number.is(row) ? row : DEFAULT_ROW;
            inputProps["row"] = row;
            inputProps["isTextArea"] = true;
        }

        isIllegal = isIllegal || !Type.string.isNotEmpty(value);

        const itemProps = Util.filterItemProps(props, isIllegal);

        return (
            <ItemView {...itemProps}>
                <UnctrlInput {...inputProps} />
            </ItemView>
        );
    }
}

export default CInput;
