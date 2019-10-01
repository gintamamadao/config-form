import React from "react";
import { InputNumber } from "antd";
import ItemView from "../item_view/item_view";
import Util from "../util/util";
import { Type } from "schema-verify";
import styles from "./range.css";

const ILLEGAL_NUM_HINT = "当前输入存在非法数字";
const COMPARE_HINT = "下限数字不能大于上限";
const OVER_RANGE_HINT = "当前输入超过合法的范围";

class Range extends React.PureComponent {
    constructor(props) {
        Util.bindme(
            super(props),
            "handleChange",
            "handleMinChange",
            "handleMaxChange"
        );
    }

    handleMinChange(singleValue) {
        this.handleChange("min", singleValue);
    }

    handleMaxChange(singleValue) {
        this.handleChange("max", singleValue);
    }

    handleChange(type, singleValue) {
        const { props } = this;
        const { onChange, value } = props;
        const valuesArr = Type.array.safe(value);
        const minValue = valuesArr[0];
        const maxValue = valuesArr[1];
        const result = [minValue, maxValue];
        switch (type) {
            case "min":
                result[0] = singleValue;
                break;
            case "max":
                result[1] = singleValue;
                break;
        }
        Type.function.is(onChange) && onChange(result);
    }

    render() {
        const { props } = this;
        const { disabled, value } = props;
        let legalRange = props.legalRange;
        let isIllegal = props.isIllegal;
        let errorHint = props.errorHint;

        const valuesArr = Type.array.safe(value);
        const minValue = valuesArr[0];
        const maxValue = valuesArr[1];

        legalRange = Type.array.safe(legalRange);
        const legalMin = legalRange[0];
        const legalMax = legalRange[1];

        if (Type.number.is(minValue) && Type.number.is(maxValue)) {
            if (maxValue < minValue) {
                isIllegal = true;
                errorHint = COMPARE_HINT;
            }
            const isMinOver = Type.number.is(legalMin) && minValue < legalMin;
            const isMaxOver = Type.number.is(legalMax) && maxValue > legalMax;
            if (isMinOver || isMaxOver) {
                isIllegal = true;
                errorHint = OVER_RANGE_HINT;
            }
        } else {
            isIllegal = true;
            errorHint = ILLEGAL_NUM_HINT;
        }

        const inputProps = {
            disabled
        };

        if (Type.number.is(legalMin)) {
            inputProps["min"] = legalMin;
        }
        if (Type.number.is(legalMax)) {
            inputProps["max"] = legalMax;
        }

        const itemViewProps = Util.filterItemProps(props, {
            errorHint,
            isIllegal
        });

        return (
            <ItemView {...itemViewProps}>
                <div className={styles["range-inputs-view"]}>
                    <InputNumber
                        {...inputProps}
                        value={minValue}
                        onChange={this.handleMinChange}
                    />
                    <span className={styles["input-between-space"]}>{"-"}</span>
                    <InputNumber
                        {...inputProps}
                        value={maxValue}
                        onChange={this.handleMaxChange}
                    />
                </div>
            </ItemView>
        );
    }
}

export default Range;
