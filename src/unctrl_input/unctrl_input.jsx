import React from "react";
import { Input } from "antd";
import { Type } from "schema-verify";
import Util from "../util/util";
import styles from "./unctrl_input.css";

const TextArea = Input.TextArea;

class InInput extends React.PureComponent {
    constructor(props) {
        Util.bindme(
            super(props),
            "setDom",
            "handleBlur",
            "handleFocus",
            "focusDom"
        );
        this.domTemp = null;
    }

    setDom(dom) {
        if (dom && this.domTemp !== dom) {
            this.domTemp = dom;
        }
    }

    handleFocus(e) {
        const onFocus = this.props.onFocus;
        if (Type.function.is(onFocus)) {
            onFocus(e);
        }
    }

    handleBlur(e) {
        const onBlur = this.props.onBlur;
        if (Type.function.is(onBlur)) {
            onBlur(e);
        }
    }

    focusDom() {
        const dom = this.domTemp;
        if (dom && Type.function.is(dom.focus)) {
            dom.focus();
        }
    }

    componentDidMount() {
        this.focusDom();
    }

    render() {
        const { props } = this;
        const { isTextArea } = props;
        const newProps = { ...this.props };
        const InInputTag = isTextArea ? TextArea : Input;

        delete newProps["isTextArea"];
        delete newProps["onChange"];
        delete newProps["onBlur"];
        delete newProps["onFocus"];

        return (
            <InInputTag
                ref={this.setDom}
                {...newProps}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
            />
        );
    }
}

class UnctrlInput extends React.PureComponent {
    constructor(props) {
        Util.bindme(super(props), "handleChange", "handleBlur", "handleFocus");
        this.state = {
            isShowCtrlInput: true,
            defaultValue: null,
            unctrlValue: null
        };
    }

    handleChange(e) {
        const onChange = this.props.onChange;
        Type.function.is(onChange) && onChange(e);
    }

    handleFocus(e) {
        const onFocus = this.props.onFocus;
        let value = this.props.value;
        const focusControl = this.props.focusControl;
        const isShowCtrlInput = this.state.isShowCtrlInput;
        const unctrlValue = this.state.unctrlValue;
        if (!focusControl) {
            value =
                Type.string.isNot(value) && Type.string.isNotEmpty(unctrlValue)
                    ? unctrlValue
                    : value;
            setTimeout(() => {
                this.setState({
                    isShowCtrlInput: false,
                    defaultValue: value
                });
            }, 0);
            if (isShowCtrlInput) {
                return;
            }
        }
        Type.function.is(onFocus) && onFocus(e);
    }

    handleBlur(e) {
        const notTrim = this.props.notTrim;
        e = Type.object.safe(e);
        e.target = Type.object.safe(e.target);
        e.target.value = Type.string.safe(e.target.value);
        if (!notTrim) {
            e.target.value = e.target.value.trim();
        }
        const value = e.target.value;
        setTimeout(() => {
            this.setState({
                isShowCtrlInput: true,
                defaultValue: null,
                unctrlValue: value
            });
        }, 0);
        const onBlur = this.props.onBlur;
        const onChange = this.props.onChange;
        Type.function.is(onBlur) && onBlur(e);
        Type.function.is(onChange) && onChange(e);
    }

    render() {
        const { props, state } = this;
        const {
            type,
            disabled,
            placeholder,
            isTextArea,
            rows,
            focusControl
        } = props;
        const { isShowCtrlInput, defaultValue, unctrlValue } = state;
        let value = props.value;

        const InputTag = isTextArea ? TextArea : Input;

        const inputProps = {
            type: type,
            disabled: disabled,
            placeholder: placeholder,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onChange: this.handleChange
        };

        if (Type.number.is(rows)) {
            inputProps["rows"] = rows;
        }

        let inputhtml = null;
        if (isShowCtrlInput || focusControl) {
            value =
                Type.string.isNot(value) && Type.string.isNotEmpty(unctrlValue)
                    ? unctrlValue
                    : value;
            inputhtml = (
                <div className={styles["ctrl-input-view"]}>
                    <InputTag
                        {...inputProps}
                        className={styles["ctrl-input"]}
                        value={value}
                    />
                </div>
            );
        } else {
            inputhtml = (
                <div className={styles["unctrl-input-view"]}>
                    <InInput
                        {...inputProps}
                        defaultValue={defaultValue}
                        isTextArea={isTextArea}
                    />
                </div>
            );
        }

        return inputhtml;
    }
}

export default UnctrlInput;
