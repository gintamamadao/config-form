import React from "react";
import { Form } from "antd";
import { Type } from "schema-verify";
import FadeView from "../fade_view/fade_view";

const FormItem = Form.Item;
const LAYOUT = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 6
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 14
        }
    }
};
const DEFAULT_HINT = "输入存在错误";
const DEFAULT_LABEL = "(未命名)";
const SUCC_STATUS = "success";
const ERR_STATUS = "error";

class ItemView extends React.PureComponent {
    render() {
        const { props } = this;
        const {
            isIllegal,
            noRedPoint,
            required,
            check,
            disabled,
            errorHint,
            hidden,
            help,
            children
        } = props;

        let layout = props.layout;
        let label = props.label;
        let valiStatus = {
            status: SUCC_STATUS
        };

        if (Type.string.isNotEmpty(help)) {
            valiStatus["text"] = help;
        }

        if (check && required && !disabled && isIllegal) {
            valiStatus = {
                status: ERR_STATUS,
                text: errorHint || DEFAULT_HINT
            };
        }

        layout = Type.object.is(layout) ? layout : LAYOUT;
        label = Type.string.isNotEmpty(label) ? label : DEFAULT_LABEL;

        return (
            <FadeView hidden={hidden}>
                <FormItem
                    {...layout}
                    required={!noRedPoint && required}
                    validateStatus={valiStatus.status}
                    help={valiStatus.text}
                    label={label}
                >
                    {children}
                </FormItem>
            </FadeView>
        );
    }
}

export default ItemView;
