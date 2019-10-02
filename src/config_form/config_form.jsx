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

class ConfigForm extends React.PureComponent {
    render() {
        const { props } = this;
        const { formInfos, data, formCheck, layout } = props;

        return (
            <ItemView {...itemProps}>
                <UnctrlInput {...inputProps} />
            </ItemView>
        );
    }
}

export default ConfigForm;
