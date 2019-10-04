# config-form

根据 json 配置生成输入表单

## 项目简介

中后台系统往往需要编写大量的表单逻辑，为了能更方便快捷的编写表单，对 antd 组件库中的表单组件结合一些常用的表单逻辑进行封装，使得可以利用 json 配置生成表单逻辑。

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

上面的例子中，ConfigForm 根据 formInfos 里的信息生成了一个包含了标签，提示，占位符，错误提示等逻辑的字符串输入框。

## 目录

<!-- TOC -->

-   [ConfigForm](#configform)
    -   [Input](#input)
    -   [PatternInput](#patterninput)

## ConfigForm

#### props 属性说明

| 字段      |    类型     |                                             说明 |
| --------- | :---------: | -----------------------------------------------: |
| formInfos | object arry |                                 要生成表单的信息 |
| check     |   boolean   | 默认值为 false, 当值为 true 时，才会显示错误信息 |
| layout    |   object    |       即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden    |   boolean   |         默认值为 false, 当值为 true 时，表单隐藏 |

#### formInfos 属性的配置说明

| 字段     |  类型  |           说明 |
| -------- | :----: | -------------: |
| formType | string | 要成表单的类型 |
| ...      |  ...   |            ... |

-   formType 指定了用那一个表单组件，formInfos 属性的配置会根据不同的表单组件有不同的属性，下面我们分别介绍。

### Input

-   字符串输入框

#### 属性配置说明

| 字段         |  类型   |                                                 说明 |
| ------------ | :-----: | ---------------------------------------------------: |
| required     | boolean |                                             是否必要 |
| check        | boolean |     默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled     | boolean |             默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal    | boolean |       默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint    | string  |                                             错误提示 |
| label        | string  |                                                 标签 |
| layout       | boolean |           即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden       | boolean |             默认值为 false, 当值为 true 时，表单隐藏 |
| help         | boolean |                                             帮助提示 |
| style        | object  |                                   input 输入框的样式 |
| type         | string  | 输入框的类型，值为"text" 或 "textArea" 默认为 "text" |
| value        | string  |                                           输入框的值 |
| focusControl | boolean |       默认值为 false, 当值为 true 时，组件为受控组件 |
| placeholder  | string  |                                       输入框的占位符 |
| row          | number  |           当 type 的值为 "textArea" 时，输入框的行数 |
| onChange     | object  |                               当输入值变化的回调函数 |

### PatternInput

-   带格式校验的字符串输入框

#### 属性配置说明

| 字段         |  类型   |                                                 说明 |
| ------------ | :-----: | ---------------------------------------------------: |
| required     | boolean |                                             是否必要 |
| check        | boolean |     默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled     | boolean |             默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal    | boolean |       默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint    | string  |                                             错误提示 |
| label        | string  |                                                 标签 |
| layout       | boolean |           即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden       | boolean |             默认值为 false, 当值为 true 时，表单隐藏 |
| help         | boolean |                                             帮助提示 |
| style        | object  |                                   input 输入框的样式 |
| type         | string  | 输入框的类型，值为"text" 或 "textArea" 默认为 "text" |
| value        | string  |                                           输入框的值 |
| focusControl | boolean |       默认值为 false, 当值为 true 时，组件为受控组件 |
| placeholder  | string  |                                       输入框的占位符 |
| row          | number  |           当 type 的值为 "textArea" 时，输入框的行数 |
| pattern      | string  |                               对当前输入值的格式要求 |
| patternInfo  | object  |                         自定义对当前输入值的格式要求 |
| onChange     | object  |                               当输入值变化的回调函数 |

#### pattern 支持的格式要求

-   sign （标识）
-   uri （链接）
-   version （版本号）
-   email （邮件地址）
-   phone （手机号）
-   json （json 字符串）

#### patternInfo 属性介绍

| 字段        |  类型  |                           说明 |
| ----------- | :----: | -----------------------------: |
| name        | string |                     格式要求名 |
| patternHint | string | 当前输入不符合格式要求时的提示 |
| check       | string |         校验格式是否合格的函数 |
