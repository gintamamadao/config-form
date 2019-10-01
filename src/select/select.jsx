import React from "react";
import { Select } from "antd";
import ItemView from "../item_view/item_view";
import Util from "../util/util";
import { Type } from "schema-verify";
import { DEFAULT_STYLE } from "../constant/constant";

const Option = Select.Option;

function filterOptionFn(input, option) {
    option = Type.object.safe(option);
    const props = Type.object.safe(option.props);
    let value = props.value || "";
    let children = props.children || "";
    input = Type.string.is(input) ? input.toLowerCase() : "";
    value = Type.string.is(value) ? value.toLowerCase() : "";
    children = Type.string.is(children) ? children.toLowerCase() : "";
    return value.match(input) || children.match(input);
}

class CSelect extends React.PureComponent {
    constructor(props) {
        Util.bindme(super(props), "handleChange");
    }

    handleChange(value) {
        const onChange = this.props.onChange;
        value = Type.string.is(value) ? value : "";
        Type.function.is(onChange) && onChange(value);
    }

    render() {
        const { props } = this;
        const { disabled, value, placeholder } = props;
        let disableOpts = props.disableOpts;
        let optionsData = props.optionsData;
        let filterOption = props.filterOption;
        let style = props.style;
        let isIllegal = props.isIllegal;

        disableOpts = Type.object.safe(disableOpts);
        optionsData = Type.object.safe(optionsData);

        const optionsHtml = [];
        for (const key in optionsData) {
            const optionInfo = optionsData[key];
            const text =
                Type.object.is(optionInfo) &&
                Type.string.isNotEmpty(optionInfo.text)
                    ? optionInfo.text
                    : key;
            optionsHtml.push(
                <Option disabled={disableOpts[key]} key={key} value={key}>
                    {text}
                </Option>
            );
        }

        style = Type.object.is(style) ? style : DEFAULT_STYLE;

        const selectProps = {
            style,
            disabled,
            placeholder,
            value,
            allowClear: true,
            onChange: this.handleChange
        };

        if (Type.function.is(filterOption) || filterOption === true) {
            selectProps["showSearch"] = true;
            selectProps["filterOption"] = Type.function.is(filterOption)
                ? filterOption
                : filterOptionFn;
        }

        isIllegal = isIllegal || !Type.string.isNotEmpty(value);
        const itemProps = Util.filterItemProps(props, { isIllegal });

        return (
            <ItemView {...itemProps}>
                <Select {...selectProps}>{optionsHtml}</Select>
            </ItemView>
        );
    }
}

export default CSelect;
