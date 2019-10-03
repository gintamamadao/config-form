# config-form

根据 json 配置生成输入表单

## 项目简介

中后台系统往往需要编写大量的表单逻辑，为了能更方便快捷的编写表单，对 antd 组件库中的表单组件再进行一层封装，可以利用 json 配置生成表单逻辑。

## 环境安装

-   安装本项目

```sh
npm i config-form --save
```

## 使用例子

```js
import { ConfigForm } from "config-form";

const UserForm = ({ data }) => {
    const [value, setValue] = useState("");
    const formInfos = [
        {
            formType: "Input",
            label: "账号",
            help: "输入邮箱或者手机号作为账号",
            placeholder: "请输入账号",
            errorHint: "账号不能为空",
            required: true,
            value: value,
            onChange: v => setValue(v)
        }
    ];
    return <ConfigForm formInfos={formInfos}></ConfigForm>;
};
```

上面的例子中，ConfigForm 根据 formInfos 里的信息生成了一个包含标签，提示，占位符，错误提示等逻辑的字符串输入框。
