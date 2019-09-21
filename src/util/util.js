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
                throw new Error(`Method ${func} is not defined`);
            }
        });
    }
};

export default Util;
