import React from "react";
import { Button } from "antd";
import { Type } from "schema-verify";
import classnames from "classnames";
import UnctrlInput from "../unctrl_input/unctrl_input";
import ItemView from "../item_view/item_view";
import Util from "../util/util";
import styles from "./multi_input.css";
import FadeView from "../fade_view/fade_view";
import { DEFAULT_STYLE } from "../constant/constant";

const DEFAULT_TYPE = "text";
const TEXTAREA_TYPE = "textArea";
const DEFAULT_ROW = 3;
const DEFAULT_EMPTY_HINT = "当前表单输入为空";
const DEFAULT_ERROR_HINT = "当前表单存在空输入";

class MultiInput extends React.PureComponent {
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
        const valuesArr = Type.array.safe(this.state.valuesArr);
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
        const { props } = this;
        const { value, disabled, focusControl, placeholder } = props;
        let type = props.type;
        let style = props.style;
        let required = props.required;
        let isIllegal = props.isIllegal;
        let errorHint = props.errorHint;
        let row = props.row;
        let indexHintMap = props.indexHintMap;

        type = Type.string.isNotEmpty(type) ? type : DEFAULT_TYPE;
        style = Type.object.is(style) ? style : DEFAULT_STYLE;
        indexHintMap = Type.object.safe(indexHintMap);

        const valuesArr = Type.array.safe(value);
        this.state.valuesArr = valuesArr;

        const isTextArea = type === TEXTAREA_TYPE;

        const inputItemClass = classnames({
            [styles["inputs-item"]]: true,
            [styles["inputs-textarea-item"]]: isTextArea
        });

        const inputProps = {
            style,
            disabled,
            type,
            focusControl,
            placeholder
        };

        if (isTextArea) {
            row = Type.number.is(row) ? row : DEFAULT_ROW;
            inputProps["row"] = row;
            inputProps["isTextArea"] = true;
        }
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
                onClick: this.handleItemDel.bind(this, index, valuesArr)
            };
            const hint = Type.object.safe(indexHintMap[index]);
            const hintText = hint.text;
            const hintStatus = hint.status;
            const isShowHint = Type.string.isNotEmpty(hintText);

            const inputHintClass = classnames({
                [styles["item-input-hint"]]: true,
                [styles["item-input-err-hint"]]: isShowHint && !hintStatus
            });

            return (
                <div key={index} className={inputItemClass}>
                    <div className={styles["item-input-view"]}>
                        <UnctrlInput {...itemProps} />
                        <FadeView hidden={!isShowHint}>
                            <div className={inputHintClass}>{hintText}</div>
                        </FadeView>
                    </div>
                    <Button {...itemButtonProps} />
                </div>
            );
        });

        const isExistIllegal = !valuesArr.every(v => {
            return Type.string.isNotEmpty(v);
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
                        onClick={this.handleItemAdd}
                    />
                </div>
                <div className={styles["inputs-list-view"]}>{itemsHtml}</div>
            </ItemView>
        );
    }
}

export default MultiInput;
