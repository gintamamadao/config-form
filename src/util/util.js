import { Type } from "schema-verify";
import moment from "moment";
import { TIME_FORMAT } from "../constant/constant";

const Util = {
    loadModule(moduleName) {
        try {
            return require(moduleName);
        } catch (err) {
            if (err && err.code === "MODULE_NOT_FOUND") {
                throw new Error(`请先安装模块 ${moduleName}`);
            }
            throw err;
        }
    },
    bindme(context, ...funcs) {
        funcs.forEach(func => {
            if (Type.string.is(func) && Type.function.is(context[func])) {
                context[func] = context[func].bind(context);
            } else {
                throw new Error(`缺少 ${func} 属性方法`);
            }
        });
    },
    filterItemProps(props, newProps) {
        props = Type.object.safe(props);
        newProps = Type.object.safe(newProps);
        const result = {
            noRedPoint: props.noRedPoint,
            required: props.required,
            check: props.check,
            disabled: props.disabled,
            isIllegal: props.isIllegal,
            errorHint: props.errorHint,
            label: props.label,
            layout: props.layout,
            hidden: props.hidden,
            help: props.help
        };
        return Object.assign({}, result, newProps);
    },
    timeStampCheck(v) {
        const reg = new RegExp(/^\d{4}-\d{2}-\d{2}\s{1}\d{2}:\d{2}:\d{2}/);
        return reg.test(v);
    },
    getMomValue(v) {
        let result = v;
        if (Type.string.isNotEmpty(v)) {
            if (!Util.timeStampCheck(v)) {
                throw new Error("时间格式错误");
            }
            result = moment(v, TIME_FORMAT);
        }
        return moment.isMoment(result) && result.isValid() ? result : null;
    },
    objPropsFilter(obj, keys) {
        obj = Type.object.safe(obj);
        keys = Type.array.safe(keys);
        const result = {};
        keys.forEach(key => {
            if (!Type.string.isNotEmpty(key) || !obj.hasOwnProperty(key)) {
                return;
            }
            result[key] = obj[key];
        });
        return result;
    }
};

export default Util;
