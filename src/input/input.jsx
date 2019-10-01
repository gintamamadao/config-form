import React from "react";
import UnctrlInput from "../unctrl_input/unctrl_input";
import ItemView from "../item_view/item_view";
import Util from "../util/util";
import { Type } from "schema-verify";
import { DEFAULT_STYLE } from "../constant/constant";

const DEFAULT_TYPE = "text";
const TEXTAREA_TYPE = "textArea";
const DEFAULT_ROW = 3;

class CInput extends React.PureComponent {
    constructor(props) {
        Util.bindme(super(props), "handleChange");
    }

    handleChange(e) {
        const onChange = this.props.onChange;
        const value = e.target.value;
        Type.function.is(onChange) && onChange(value);
    }

    render() {
        const { props } = this;
        const { disabled, value, focusControl, placeholder } = props;

        let type = props.type;
        let row = props.row;
        let style = props.style;
        let isIllegal = props.isIllegal;

        type = Type.string.isNotEmpty(type) ? type : DEFAULT_TYPE;
        style = Type.object.is(style) ? style : DEFAULT_STYLE;

        const inputProps = {
            style,
            disabled,
            type,
            value,
            focusControl,
            placeholder,
            onChange: this.handleChange
        };

        if (type === TEXTAREA_TYPE) {
            row = Type.number.is(row) ? row : DEFAULT_ROW;
            inputProps["row"] = row;
            inputProps["isTextArea"] = true;
        }

        isIllegal = isIllegal || !Type.string.isNotEmpty(value);

        const itemProps = Util.filterItemProps(props, { isIllegal });

        return (
            <ItemView {...itemProps}>
                <UnctrlInput {...inputProps} />
            </ItemView>
        );
    }
}

export default CInput;
