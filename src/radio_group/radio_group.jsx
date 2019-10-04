import React from "react";
import { Radio } from "antd";
import ItemView from "../item_view/item_view";
import Util from "../util/util";
import { Type } from "schema-verify";

const RadioGroup = Radio.Group;

class CRadioGroup extends React.PureComponent {
    constructor(props) {
        Util.bindme(super(props), "handleChange");
    }

    handleChange(e) {
        e = Type.object.safe(e);
        const target = Type.object.safe(e.target);
        const onChange = this.props.onChange;
        const value = Type.string.is(target.value) ? target.value : "";
        Type.function.is(onChange) && onChange(value);
    }

    render() {
        const { props } = this;
        const { disabled, value } = props;
        let disableOpts = props.disableOpts;
        let optionsData = props.optionsData;
        let isIllegal = props.isIllegal;

        disableOpts = Type.object.safe(disableOpts);
        optionsData = Type.object.safe(optionsData);

        const radiosOpts = [];
        for (const key in optionsData) {
            const optionInfo = optionsData[key];
            const text =
                Type.object.is(optionInfo) &&
                Type.string.isNotEmpty(optionInfo.text)
                    ? optionInfo.text
                    : key;
            const radioOpt = {
                label: text,
                value: key,
                disabled: disableOpts[key]
            };
            radiosOpts.push(radioOpt);
        }

        const radioGroupProps = {
            disabled,
            value,
            options: radiosOpts,
            onChange: this.handleChange
        };

        isIllegal = isIllegal || !Type.string.isNotEmpty(value);
        const itemProps = Util.filterItemProps(props, { isIllegal });

        return (
            <ItemView {...itemProps}>
                <RadioGroup {...radioGroupProps}></RadioGroup>
            </ItemView>
        );
    }
}

export default CRadioGroup;
