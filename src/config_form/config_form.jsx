import React from "react";
import ItemView from "../item_view/item_view";
import Input from "../input/input";
import PatternInput from "../pattern_input/pattern_input";
import MultiInput from "../multi_input/multi_input";
import NumberInput from "../number_input/number_input";
import Select from "../select/select";
import RadioGroup from "../radio_group/radio_group";
import CheckboxGroup from "../checkbox_group/checkbox_group";
import DatePicker from "../date_picker/date_picker";
import TimeRange from "../time_range/time_range";
import Range from "../range/range";
import { Type } from "schema-verify";
import { FORM_TYPE } from "../constant/constant";
import FadeView from "../fade_view/fade_view";
import Util from "../util/util";

function getTemView(itemProps, info) {
    const children = info.children;
    return <ItemView {...itemProps}>{children}</ItemView>;
}

class ConfigForm extends React.PureComponent {
    render() {
        const { props } = this;
        const { check, layout, hidden } = props;
        let formInfos = props.formInfos;
        formInfos = Type.array.safe(formInfos);

        const formItemsHtml = [];
        formInfos.forEach((info, index) => {
            if (Type.object.is(info)) {
                return;
            }

            const formType = info.formType;
            if (!Type.string.isNotEmpty(FORM_TYPE[formType])) {
                return;
            }

            let itemCheck = info.check;
            let itemLyout = info.layout;
            itemCheck = Type.boolean.is(itemCheck) ? itemCheck : check;
            itemLyout = Type.object.is(itemLyout) ? itemLyout : layout;

            const itemProps = Util.filterItemProps(info, {
                check,
                layout
            });

            let itemHtml = null;
            switch (formType) {
                case FORM_TYPE.ItemView:
                    itemHtml = getTemView(itemProps, info);
                    break;
            }

            if (itemHtml) {
                formItemsHtml.push(itemHtml);
            }
        });

        return <FadeView hidden={hidden}>{formItemsHtml}</FadeView>;
    }
}

export default ConfigForm;
