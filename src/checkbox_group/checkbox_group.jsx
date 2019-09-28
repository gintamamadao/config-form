import React from "react";
import { Checkbox } from "antd";
import ItemView from "../item_view/item_view";
import Util from "../util/util";
import { Type } from "schema-verify";

const CheckboxGroup = Checkbox.Group;

class CCheckboxGroup extends React.PureComponent {
    constructor(props) {
        Util.bindme(super(props), "handleChange");
    }

    handleChange(valuesArr) {
        const onChange = this.props.onChange;
        let optionsData = this.props.optionsData;
        optionsData = Type.object.safe(optionsData);
        valuesArr = Type.array.safe(valuesArr);
        let newValues = [];
        for (const valueKey of valuesArr) {
            if (valueKey in optionsData) {
                newValues.push(valueKey);
            }
        }
        Type.function.is(onChange) && onChange(newValues);
    }

    render() {
        const { props } = this;
        const { disabled, value } = props;
        let disableOpts = props.disableOpts;
        let optionsData = props.optionsData;
        let isIllegal = props.isIllegal;

        const valuesArr = Type.array.safe(value);
        disableOpts = Type.object.safe(disableOpts);
        optionsData = Type.object.safe(optionsData);

        const checkBoxOpts = [];
        for (const key in optionsData) {
            const optionInfo = optionsData[key];
            const text =
                Type.object.is(optionInfo) &&
                Type.string.isNotEmpty(optionInfo.text)
                    ? optionInfo.text
                    : key;
            const checkBoxOpt = {
                label: text,
                value: key,
                disabled: disableOpts[key]
            };
            checkBoxOpts.push(checkBoxOpt);
        }

        const checkboxProps = {
            disabled,
            value: valuesArr,
            options: checkBoxOpts,
            onChange: this.handleChange
        };

        isIllegal = isIllegal || !Type.array.isNotEmpty(valuesArr);
        const itemProps = Util.filterItemProps(props, { isIllegal });

        return (
            <ItemView {...itemProps}>
                <CheckboxGroup {...checkboxProps} />
            </ItemView>
        );
    }
}

export default CCheckboxGroup;
