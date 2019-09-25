import { Type } from "schema-verify";

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
    filterItemProps(props, isIllegal) {
        props = Type.object.safe(props);
        const result = {
            noRedPoint: props.noRedPoint,
            required: props.required,
            check: props.check,
            label: props.label,
            disabled: props.disabled,
            errorHint: props.errorHint,
            layout: props.layout,
            hidden: props.hidden,
            help: props.help,
            isIllegal: isIllegal
        };
        return result;
    }
};

export default Util;
