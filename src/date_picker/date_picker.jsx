import React from "react";
import { DatePicker, Checkbox } from "antd";
import styles from "./date_picker.css";
import ItemView from "../item_view/item_view";
import Util from "../util/util";
import { Type } from "schema-verify";
import moment from "moment";

const DEFAULT_STYLE = { width: "100%" };
const RESET_STATUS = "reset";
const MAX_STATUS = "maxValue";
const RESET_STATUS_VALUE = "00:00:00";
const MAX_STATUS_VALUE = "23:59:59";
const DATE_PANEL = "date";
const TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

function timeStampCheck(v) {
    const reg = new RegExp(/^\d{4}-\d{2}-\d{2}\s{1}\d{2}:\d{2}:\d{2}/);
    return reg.test(v);
}

function getMomValue(time) {
    if (!Type.string.isNotEmpty(time) || !timeStampCheck(time)) {
        throw new Error("时间格式错误");
    }
    const value = moment(time, TIME_FORMAT);
    return moment.isMoment(value) && value.isValid() ? value : null;
}

class CDatePicker extends React.PureComponent {
    constructor(props) {
        Util.bindme(
            super(props),
            "handleChange",
            "setHMSValue",
            "handlePanelChange",
            "handleOpenChange",
            "datePanelFooter"
        );
        this.state = {
            panelType: DATE_PANEL,
            hmsValueStatus: null,
            tempValue: null
        };
    }

    setHMSValue(status, e) {
        e = Type.object.safe(e);
        const target = Type.object.safe(e.target);
        const checked = target.checked;
        this.setState({
            hmsValueStatus: status
        });
        if (checked) {
            setTimeout(() => {
                this.handleChange(this.state.tempValue);
            }, 0);
        }
    }

    handleChange(value) {
        const { props } = this;
        const { onChange, panelModel } = props;
        let result = null;
        Type.function.is(onChange) && onChange(result);
    }

    handlePanelChange(value, model) {
        this.state.panelType = model;
    }

    handleOpenChange(status) {
        if (!Type.string.isNotEmpty(status)) {
            this.state.panelType = "date";
        }
    }

    datePanelFooter() {
        const { state } = this;
        const { panelType, hmsValueStatus } = state;
        const disabled = panelType !== DATE_PANEL;
        return (
            <div className={styles["date-footer-view"]}>
                <Checkbox
                    disabled={disabled}
                    checked={hmsValueStatus === RESET_STATUS}
                    onChange={this.setHMSValue.bind(this, RESET_STATUS)}
                >
                    {RESET_STATUS_VALUE}
                </Checkbox>
                <Checkbox
                    disabled={disabled}
                    checked={hmsValueStatus === MAX_STATUS}
                    onChange={this.setHMSValue.bind(this, MAX_STATUS)}
                >
                    {MAX_STATUS_VALUE}
                </Checkbox>
            </div>
        );
    }

    render() {
        const { props } = this;
        const { disabled, disabledDate } = props;
        let value = props.value;
        let style = props.style;
        let errorHint = props.errorHint;
        let isIllegal = props.isIlleg;

        value = getMomValue(value);
        this.state.tempValue = value;

        isIllegal = isIllegal || !Type.object.is(value);

        if (Type.function.is(disabledDate) && disabledDate(value)) {
            isIllegal = true;
            errorHint = "时间不在合法范围";
        }

        style = Type.object.is(style)
            ? Object.assign({}, DEFAULT_STYLE, style)
            : DEFAULT_STYLE;

        const dateProps = {
            showTime: true,
            format: TIME_FORMAT,
            disabled,
            disabledDate,
            style,
            value,
            onChange: this.handleChange,
            onOpenChange: this.handleOpenChange,
            onPanelChange: this.handlePanelChange,
            renderExtraFooter: this.datePanelFooter
        };

        const itemProps = Util.filterItemProps(props, { errorHint, isIllegal });

        return (
            <ItemView {...itemProps}>
                <DatePicker {...dateProps} />
            </ItemView>
        );
    }
}

export default CDatePicker;
