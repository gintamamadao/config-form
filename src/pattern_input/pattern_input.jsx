import React from "react";
import { Type, Pattern } from "schema-verify";
import Input from "../input/input";

const PATTERN_INFO = {
    default: {
        name: "字符串",
        patternHint: "当前值不符合规定格式",
        emptyHint: "当前输入不能为空",
        check: () => true
    },
    sign: {
        name: "标识",
        patternHint: "只允许字母、下划线或数字组成",
        check: v => Pattern.sign.is(v)
    },
    uri: {
        name: "链接",
        patternHint: "只允许输入链接",
        check: v => Pattern.uri.is(v)
    },
    version: {
        name: "版本",
        patternHint: "只允许字母v，数字和小数点组成",
        check: v => Pattern.version.is(v)
    },
    email: {
        name: "邮件地址",
        patternHint: "只允许输入电子邮件地址",
        check: v => Pattern.email.is(v)
    },
    phone: {
        name: "手机",
        patternHint: "只允许11位的手机号",
        check: v => Pattern.phone.is(v)
    },
    json: {
        name: "json字符串",
        patternHint: "无法解析json字符串",
        check: v => Pattern.jsonStr.is(v)
    }
};

class PatternInput extends React.PureComponent {
    render() {
        const { props } = this;
        const { pattern, value } = props;
        const inputProps = { ...props };
        let errorHint = props.errorHint;
        let placeholder = props.placeholder;
        let patternInfo = props.patternInfo;
        let required = props.required;
        let isIllegal = props.isIllegal;

        info = PATTERN_INFO[pattern] || PATTERN_INFO["default"];
        if (Type.object.is(patternInfo)) {
            patternInfo = Object.assign({}, info, patternInfo);
        } else {
            patternInfo = info;
        }

        if (!Type.string.isNotEmpty(placeholder)) {
            const name = Type.string.is(patternInfo.name)
                ? patternInfo["name"]
                : PATTERN_INFO["default"]["name"];
            placeholder = `请输入${name}`;
        }

        switch (true) {
            case !Type.string.isNotEmpty(value):
                errorHint = Type.string.isNotEmpty(errorHint)
                    ? errorHint
                    : PATTERN_INFO["default"]["emptyHint"];
                isIllegal = true;
                break;
            case Type.string.isNotEmpty(value) &&
                Type.function.is(patternInfo.check) &&
                !patternInfo.check(value):
                errorHint = Type.string.is(patternInfo.patternHint)
                    ? patternInfo["patternHint"]
                    : PATTERN_INFO["default"]["patternHint"];
                isIllegal = true;
                break;
        }

        if (Type.string.isNotEmpty(value)) {
            required = true;
        }

        inputProps["placeholder"] = placeholder;
        inputProps["errorHint"] = errorHint;
        inputProps["required"] = required;
        inputProps["isIllegal"] = isIllegal;
        delete inputProps["patternInfo"];

        return <Input {...inputProps}></Input>;
    }
}

export default PatternInput;
