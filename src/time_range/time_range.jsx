import React from "react";
import DatePicker from "../date_picker/date_picker";
import ItemView from "../item_view/item_view";
import Util from "../util/util";
import moment from "moment";
import { Type } from "schema-verify";
import { RESET_STATUS, MAX_STATUS } from "../constant/constant";

const BE_FUTRUE_HINT = "开始时间晚于结束时间";
const BE_OVER_RANGE_HINT = "时间超过合法的范围";
const START_TIME_LABEL = "开始时间";
const END_TIME_LABEL = "结束时间";
const START_TIME_EMPTY_HINT = "开始时间为空";
const END_TIME_EMPTY_HINT = "结束时间为空";
const DATE_ITEM_LAYOUT = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 5
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 19
        }
    }
};

class TimeRange extends React.PureComponent {
    constructor(props) {
        Util.bindme(
            super(props),
            "handleChange",
            "handleStartChange",
            "handleEndChange"
        );
    }

    handleStartChange(singleValue) {
        this.handleChange("start", singleValue);
    }

    handleEndChange(singleValue) {
        this.handleChange("end", singleValue);
    }

    handleChange(type, singleValue) {
        const props = this.props;
        const onChange = props.onChange;
        const valuesArr = props.value;

        const formatValue = Util.timeStampCheck(singleValue)
            ? singleValue
            : null;

        const startValue = Type.string.isNotEmpty(valuesArr[0])
            ? valuesArr[0]
            : null;

        const endValue = Type.string.isNotEmpty(valuesArr[1])
            ? valuesArr[1]
            : null;

        const result = [startValue, endValue];
        switch (type) {
            case "start":
                result[0] = formatValue;
                break;
            case "end":
                result[1] = formatValue;
                break;
        }
        Type.function.is(onChange) && onChange(result);
    }

    render() {
        const { props } = this;
        const { value, disabled, disabledDate } = props;
        let legalRange = props.legalRange;
        let isIllegal = props.isIllegal;
        let itemLayout = props.itemLayout;
        let style = props.style;
        let errorHint = props.errorHint;

        const valuesArr = Type.array.safe(value);
        const startValue = Util.getMomValue(valuesArr[0]);
        const endValue = Util.getMomValue(valuesArr[1]);

        legalRange = Type.array.safe(legalRange);
        const legalStart = Util.getMomValue(legalRange[0]);
        const legalEnd = Util.getMomValue(legalRange[1]);

        if (moment.isMoment(startValue) && moment.isMoment(endValue)) {
            if (startValue.isAfter(endValue)) {
                isIllegal = true;
                errorHint = BE_FUTRUE_HINT;
            }
            const isStartOver =
                moment.isMoment(legalStart) && startValue.isBefore(legalStart);
            const isEndOver =
                moment.isMoment(legalEnd) && endValue.isAfter(legalEnd);

            if (isStartOver || isEndOver) {
                isIllegal = true;
                errorHint = BE_OVER_RANGE_HINT;
            }
        }

        itemLayout = Type.object.is(itemLayout) ? itemLayout : DATE_ITEM_LAYOUT;

        const dateProps = {
            disabled,
            disabledDate,
            style,
            layout: itemLayout
        };

        const itemViewProps = Util.filterItemProps(props, {
            errorHint,
            isIllegal
        });

        const itemDateProps = Object.assign({}, itemViewProps, dateProps);

        delete itemDateProps["isIllegal"];
        delete itemDateProps["help"];
        delete itemDateProps["errorHint"];

        return (
            <ItemView {...itemViewProps}>
                <DatePicker
                    {...itemDateProps}
                    label={START_TIME_LABEL}
                    errorHint={START_TIME_EMPTY_HINT}
                    value={startValue}
                    hmsValueStatus={RESET_STATUS}
                    onChange={this.handleStartChange}
                />
                <DatePicker
                    {...itemDateProps}
                    label={END_TIME_LABEL}
                    errorHint={END_TIME_EMPTY_HINT}
                    value={endValue}
                    hmsValueStatus={MAX_STATUS}
                    onChange={this.handleEndChange}
                />
            </ItemView>
        );
    }
}

export default TimeRange;
