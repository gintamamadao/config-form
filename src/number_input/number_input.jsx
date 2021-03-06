import React from "react";
import { InputNumber } from "antd";
import ItemView from "../item_view/item_view";
import Util from "../util/util";
import { Type } from "schema-verify";

class NumberInput extends React.PureComponent {
    constructor(props) {
        Util.bindme(super(props), "handleChange");
    }

    handleChange(value) {
        const onChange = this.props.onChange;
        value = Type.number.is(value) ? value : null;
        Type.function.is(onChange) && onChange(value);
    }

    render() {
        const { props } = this;
        const { disabled, value } = props;
        let max = props.max;
        let min = props.min;
        let step = props.step;
        let isIllegal = props.isIllegal;

        const inputProps = {
            disabled,
            value,
            onChange: this.handleChange
        };

        if (Type.number.is(max)) {
            inputProps["max"] = max;
        }

        if (Type.number.is(min)) {
            inputProps["min"] = min;
        }

        if (Type.number.is(step)) {
            inputProps["step"] = step;
        }

        isIllegal = isIllegal || Type.number.isNot(value);
        const itemProps = Util.filterItemProps(props, { isIllegal });

        return (
            <ItemView {...itemProps}>
                <InputNumber {...inputProps} />
            </ItemView>
        );
    }
}

export default NumberInput;
