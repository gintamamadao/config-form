import React from "react";
import { Button } from "antd";
import { Type } from "schema-verify";
import classnames from "classnames";
import UnctrlInput from "../unctrl_input/unctrl_input";
import ItemView from "../item_view/item_view";
import Util from "../util/util";
import styles from "./multi_input.css";
import FadeView from "../fade_view/fade_view";

const DEFAULT_TYPE = "text";
const TEXTAREA_TYPE = "textArea";
const DEFAULT_EMPTY_HINT = "当前表单输入为空";
const DEFAULT_ERROR_HINT = "当前表单存在空输入";

class MultiInput extends PureComponent {
    constructor(props) {
        Util.bindme(
            super(props),
            "handleChange",
            "handleItemAdd",
            "handleItemChange",
            "handleItemDel"
        );
        this.state = {
            valuesArr: []
        };
    }

    handleChange(valuesArr) {
        valuesArr = Type.array.safe(valuesArr);
        const onChange = this.props.onChange;
        Type.function.is(onChange) && onChange(valuesArr);
        this.state.valuesArr = valuesArr;
    }

    handleItemAdd() {
        const valuesArr = this.state.valuesArr;
        valuesArr = Type.array.safe(valuesArr);
        valuesArr.push("");
        this.handleChange(valuesArr);
    }

    handleItemChange(index, valuesArr, e) {
        const value = e.target.value;
        valuesArr[index] = value;
        this.handleChange(valuesArr);
    }

    handleItemDel(index, valuesArr) {
        valuesArr.splice(index, 1);
        this.handleChange(valuesArr);
    }

    render() {
        const { props, state } = this;
        const { disabled, focusControl, placeholder } = props;
        let type = props.type;
        let required = props.required;
        let errorHint = props.errorHint;
        let valueHintMap = props.valueHintMap;
        let valuesArr = state.valuesArr;

        type = type ? type : DEFAULT_TYPE;
        valuesArr = Type.array.safe(valuesArr);
        valueHintMap = Type.object.safe(valueHintMap);

        const inputItemClass = classnames({
            [styles["inputs-item"]]: true,
            [styles["inputs-textarea-item"]]: type === TEXTAREA_TYPE
        });
        const inputProps = {
            disabled,
            type,
            focusControl,
            placeholder
        };
        const buttonProps = {
            disabled,
            type: "danger",
            ghost: true,
            icon: "minus"
        };
        const itemsHtml = valuesArr.map((itemValue, index) => {
            const itemProps = {
                ...inputProps,
                value: itemValue,
                onChange: this.handleItemChange.bind(this, index, valuesArr)
            };
            const itemButtonProps = {
                ...buttonProps,
                onChange: this.handleItemDel.bind(this, index, valuesArr)
            };
            const hint = valueHintMap[itemValue];
            const isShowHint = Type.string.isNotEmpty(hint);
            return (
                <div className={inputItemClass}>
                    <div className={styles["item-input-view"]}>
                        <UnctrlInput {...itemProps} />
                        <FadeView hidden={!isShowHint}>
                            <div className={styles["item-input-hint"]}>
                                {hint}
                            </div>
                        </FadeView>
                    </div>
                    <Button {...itemButtonProps} />
                </div>
            );
        });

        const isExistIllegal = !valuesArr.every(v => {
            return Type.string.is(v);
        });

        if (Type.array.isNotEmpty(valuesArr)) {
            required = true;
        }

        isIllegal =
            isIllegal || Type.array.isEmpty(valuesArr) || isExistIllegal;

        if (!Type.string.isNotEmpty(errorHint)) {
            if (Type.array.isEmpty(valuesArr)) {
                errorHint = DEFAULT_EMPTY_HINT;
            }
            if (isExistIllegal) {
                errorHint = DEFAULT_ERROR_HINT;
            }
        }

        const itemProps = Util.filterItemProps(props, {
            required,
            isIllegal,
            errorHint
        });

        return (
            <ItemView {...itemProps}>
                <div className={styles["inputs-btns-view"]}>
                    <Button
                        disabled={disabled}
                        icon="plus"
                        onClick={this.onInputAdd}
                    />
                </div>
                {itemsHtml}
            </ItemView>
        );
    }
}

export default MultiInput;
