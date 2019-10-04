# config-form

根据 json 配置生成输入表单

## 项目简介

中后台系统往往需要编写大量的表单逻辑，而且其中大量工作重复度高，为了减少没必要的重复工作，对 antd 组件库中的表单组件结合一些常用的表单逻辑封装成一个组件，该组件可以根据 json 配置生成表单逻辑。

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
    -   [ItemView](#itemView)
    -   [Input](#input)
    -   [PatternInput](#patterninput)
    -   [MultiInput](#multiinput)
    -   [NumberInput](#numberinput)
    -   [Select](#select)
    -   [RadioGroup](#radiogroup)
    -   [CheckboxGroup](#checkboxgroup)
    -   [DatePicker](#datepicker)
    -   [TimeRange](#timerange)
    -   [Range](#range)

## ConfigForm

#### 属性

| 字段      |    类型     |                                             说明 |
| --------- | :---------: | -----------------------------------------------: |
| formInfos | object arry |                                 要生成表单的信息 |
| check     |   boolean   | 默认值为 false, 当值为 true 时，才会显示错误信息 |
| layout    |   object    |       即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden    |   boolean   |         默认值为 false, 当值为 true 时，表单隐藏 |

#### formInfos 属性配置

| 字段     |  类型  |           说明 |
| -------- | :----: | -------------: |
| formType | string | 要成表单的类型 |
| ...      |  ...   |            ... |

-   formType 指定了用那一个表单组件，formInfos 属性的配置会根据不同的表单组件有不同的属性，下面我们分别介绍。

### ItemView

-   antd 组件库中的 Form.Item 的再一层封装的容器组件，下面所有的输入组件都用这个组件包装的，所以都有以下配置属性，除了 children 属性。

#### 属性配置

| 字段      |        类型        |                                             说明 |
| --------- | :----------------: | -----------------------------------------------: |
| required  |      boolean       |                                         是否必要 |
| check     |      boolean       | 默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled  |      boolean       |         默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal |      boolean       |   默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint |       string       |                                         错误提示 |
| label     |       string       |                                             标签 |
| layout    |       object       |       即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden    |      boolean       |         默认值为 false, 当值为 true 时，表单隐藏 |
| help      |       string       |                                         帮助提示 |
| children  | object or funciton |                                           子元素 |

### Input

-   字符串输入框

#### 属性配置

| 字段         |   类型   |                                                 说明 |
| ------------ | :------: | ---------------------------------------------------: |
| required     | boolean  |                                             是否必要 |
| check        | boolean  |     默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled     | boolean  |             默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal    | boolean  |       默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint    |  string  |                                             错误提示 |
| label        |  string  |                                                 标签 |
| layout       |  object  |           即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden       | boolean  |             默认值为 false, 当值为 true 时，表单隐藏 |
| help         |  string  |                                             帮助提示 |
| style        |  object  |                                   input 输入框的样式 |
| type         |  string  | 输入框的类型，值为"text" 或 "textArea" 默认为 "text" |
| value        |  string  |                                           输入框的值 |
| focusControl | boolean  |       默认值为 false, 当值为 true 时，组件为受控组件 |
| placeholder  |  string  |                                       输入框的占位符 |
| row          |  number  |           当 type 的值为 "textArea" 时，输入框的行数 |
| onChange     | function |                               当输入值变化的回调函数 |

### PatternInput

-   带格式校验的字符串输入框

#### 属性配置

| 字段         |   类型   |                                                 说明 |
| ------------ | :------: | ---------------------------------------------------: |
| required     | boolean  |                                             是否必要 |
| check        | boolean  |     默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled     | boolean  |             默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal    | boolean  |       默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint    |  string  |                                             错误提示 |
| label        |  string  |                                                 标签 |
| layout       |  object  |           即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden       | boolean  |             默认值为 false, 当值为 true 时，表单隐藏 |
| help         |  string  |                                             帮助提示 |
| style        |  object  |                                   input 输入框的样式 |
| type         |  string  | 输入框的类型，值为"text" 或 "textArea" 默认为 "text" |
| value        |  string  |                                           输入框的值 |
| focusControl | boolean  |       默认值为 false, 当值为 true 时，组件为受控组件 |
| placeholder  |  string  |                                       输入框的占位符 |
| row          |  number  |           当 type 的值为 "textArea" 时，输入框的行数 |
| pattern      |  string  |                               对当前输入值的格式要求 |
| patternInfo  |  object  |                         自定义对当前输入值的格式要求 |
| onChange     | function |                               当输入值变化的回调函数 |

#### pattern 支持的格式要求

-   sign （标识）
-   uri （链接）
-   version （版本号）
-   email （邮件地址）
-   phone （手机号）
-   json （json 字符串）

#### patternInfo 属性配置

| 字段        |   类型   |                           说明 |
| ----------- | :------: | -----------------------------: |
| name        |  string  |                     格式要求名 |
| patternHint |  string  | 当前输入不符合格式要求时的提示 |
| check       | function |         校验格式是否合格的函数 |

### MultiInput

-   多个字符串输入框

#### 属性配置

| 字段         |   类型   |                                                 说明 |
| ------------ | :------: | ---------------------------------------------------: |
| required     | boolean  |                                             是否必要 |
| check        | boolean  |     默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled     | boolean  |             默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal    | boolean  |       默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint    |  string  |                                             错误提示 |
| label        |  string  |                                                 标签 |
| layout       |  object  |           即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden       | boolean  |             默认值为 false, 当值为 true 时，表单隐藏 |
| help         |  string  |                                             帮助提示 |
| style        |  object  |                                   input 输入框的样式 |
| type         |  string  | 输入框的类型，值为"text" 或 "textArea" 默认为 "text" |
| value        |  array   |                             包含所有输入框的值的数组 |
| focusControl | boolean  |       默认值为 false, 当值为 true 时，组件为受控组件 |
| placeholder  |  string  |                                       输入框的占位符 |
| row          |  number  |           当 type 的值为 "textArea" 时，输入框的行数 |
| indexHintMap |  object  |                       用于在某个输入框的下面显示提示 |
| onChange     | function |                               当输入值变化的回调函数 |

#### indexHintMap 属性配置

| 字段    |  类型  |                                           说明 |
| ------- | :----: | ---------------------------------------------: |
| [index] | object | key [index] 为输入框的位置 , value 为 提示配置 |

##### indexHintMap 某个[index]的属性配置

| 字段   |  类型   |                                           说明 |
| ------ | :-----: | ---------------------------------------------: |
| text   | string  |                                       提示文字 |
| status | boolean | 默认值为 false, 当值为 true 时，提示文字为红色 |

##### indexHintMap 配置例子

```js
{
    0: {
        text: '请在第一个输入框输入姓名',
        status: true,
    }
}
```

-   该提示会出现在第一个输入框和第二输入框中间

### NumberInput

-   数字输入框

#### 属性配置

| 字段      |   类型   |                                             说明 |
| --------- | :------: | -----------------------------------------------: |
| required  | boolean  |                                         是否必要 |
| check     | boolean  | 默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled  | boolean  |         默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal | boolean  |   默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint |  string  |                                         错误提示 |
| label     |  string  |                                             标签 |
| layout    |  object  |       即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden    | boolean  |         默认值为 false, 当值为 true 时，表单隐藏 |
| help      |  string  |                                         帮助提示 |
| value     |  number  |                                       输入框的值 |
| max       |  number  |                                 可以输入的最大值 |
| min       |  number  |                                 可以输入的最小值 |
| step      |  number  |                                   增加数字的步长 |
| onChange  | function |                           当输入值变化的回调函数 |

### Select

-   选择器

#### 属性配置

| 字段         |        类型         |                                                       说明 |
| ------------ | :-----------------: | ---------------------------------------------------------: |
| required     |       boolean       |                                                   是否必要 |
| check        |       boolean       |           默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled     |       boolean       |                   默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal    |       boolean       |             默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint    |       string        |                                                   错误提示 |
| label        |       string        |                                                       标签 |
| layout       |       object        |                 即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden       |       boolean       |                   默认值为 false, 当值为 true 时，表单隐藏 |
| help         |       string        |                                                   帮助提示 |
| style        |       object        |                                               输入框的样式 |
| value        |       string        |                                             选择的选项的值 |
| placeholder  |       string        |                                             输入框的占位符 |
| optionsData  |       object        |                                                   选项信息 |
| disableOpts  |       object        |                                             禁止选择的选项 |
| filterOption | boolean or function | 当值为 true 时开启默认搜索过滤选项，函数则为自定义过滤规则 |
| onChange     |      function       |                                     当输入值变化的回调函数 |

#### optionsData 属性配置

| 字段  |  类型  |                  说明 |
| ----- | :----: | --------------------: |
| [key] | object | [key] 是选项的 value, |

#### optionsData 某个[key]的属性配置

| 字段 |  类型  |           说明 |
| ---- | :----: | -------------: |
| text | string | 选项的文字内容 |

##### optionsData 配置例子

```js
{
    man: {
        text: "男";
    },
    woman: {
        text: "女";
    }
}
```

#### disableOpts 属性配置

| 字段  |  类型   |                                                               说明 |
| ----- | :-----: | -----------------------------------------------------------------: |
| [key] | boolean | [key] 是选项的 value, 默认值为 false, 当值为 true 时，选项无法选择 |

```js
{
    man: true;
}
```

### RadioGroup

-   单选框组

#### 属性配置

| 字段        |   类型   |                                             说明 |
| ----------- | :------: | -----------------------------------------------: |
| required    | boolean  |                                         是否必要 |
| check       | boolean  | 默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled    | boolean  |         默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal   | boolean  |   默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint   |  string  |                                         错误提示 |
| label       |  string  |                                             标签 |
| layout      |  object  |       即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden      | boolean  |         默认值为 false, 当值为 true 时，表单隐藏 |
| help        |  string  |                                         帮助提示 |
| value       |  string  |                                   选择的选项的值 |
| optionsData |  object  |                                         选项信息 |
| disableOpts |  object  |                                   禁止选择的选项 |
| onChange    | function |                           当输入值变化的回调函数 |

#### optionsData 属性配置

| 字段  |  类型  |                   说明 |
| ----- | :----: | ---------------------: |
| [key] | object | [key] 是选项 的 value, |

#### optionsData 某个[key]的属性配置

| 字段 |  类型  |         说明 |
| ---- | :----: | -----------: |
| text | string | 选项的 label |

##### optionsData 配置例子

```js
{
    man: {
        text: "男";
    },
    woman: {
        text: "女";
    }
}
```

#### disableOpts 属性配置

| 字段  |  类型   |                                                               说明 |
| ----- | :-----: | -----------------------------------------------------------------: |
| [key] | boolean | [key] 是选项的 value, 默认值为 false, 当值为 true 时，选项无法选择 |

```js
{
    man: true;
}
```

### CheckboxGroup

-   多选框组

#### 属性配置

| 字段        |   类型   |                                             说明 |
| ----------- | :------: | -----------------------------------------------: |
| required    | boolean  |                                         是否必要 |
| check       | boolean  | 默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled    | boolean  |         默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal   | boolean  |   默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint   |  string  |                                         错误提示 |
| label       |  string  |                                             标签 |
| layout      |  object  |       即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden      | boolean  |         默认值为 false, 当值为 true 时，表单隐藏 |
| help        |  string  |                                         帮助提示 |
| value       |  array   |                     包含所有选择的选项的值的组合 |
| optionsData |  object  |                                         选项信息 |
| disableOpts |  object  |                                   禁止选择的选项 |
| onChange    | function |                           当输入值变化的回调函数 |

#### optionsData 属性配置

| 字段  |  类型  |                  说明 |
| ----- | :----: | --------------------: |
| [key] | object | [key] 是选项的 value, |

#### optionsData 某个[key]的属性配置

| 字段 |  类型  |         说明 |
| ---- | :----: | -----------: |
| text | string | 选项的 label |

##### optionsData 配置例子

```js
{
    man: {
        text: "男";
    },
    woman: {
        text: "女";
    }
}
```

#### disableOpts 属性配置

| 字段  |  类型   |                                                               说明 |
| ----- | :-----: | -----------------------------------------------------------------: |
| [key] | boolean | [key] 是选项的 value, 默认值为 false, 当值为 true 时，选项无法选择 |

```js
{
    man: true;
}
```

### DatePicker

-   日期选择器

#### 属性配置

| 字段           |   类型   |                                                                               说明 |
| -------------- | :------: | ---------------------------------------------------------------------------------: |
| required       | boolean  |                                                                           是否必要 |
| check          | boolean  |                                   默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled       | boolean  |                                           默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal      | boolean  |                                     默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint      |  string  |                                                                           错误提示 |
| label          |  string  |                                                                               标签 |
| layout         |  object  |                                         即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden         | boolean  |                                           默认值为 false, 当值为 true 时，表单隐藏 |
| help           |  string  |                                                                           帮助提示 |
| style          |  object  |                                                                       输入框的样式 |
| value          |  string  |                                       选择的日期， 格式必须为"YYYY-MM-DD HH:mm:ss" |
| disabledDate   | function |                                                             判断日期是否合法的函数 |
| hmsValueStatus |  string  | 日期的时分秒的默认值类型，reset-默认值是 "00:00:00" ，maxValue-默认值是 "23:59:59" |
| onChange       | function |                                                             当输入值变化的回调函数 |

### TimeRange

-   日期范围选择器

#### 属性配置

| 字段         |   类型   |                                                           说明 |
| ------------ | :------: | -------------------------------------------------------------: |
| required     | boolean  |                                                       是否必要 |
| check        | boolean  |               默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled     | boolean  |                       默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal    | boolean  |                 默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint    |  string  |                                                       错误提示 |
| label        |  string  |                                                           标签 |
| layout       |  object  |                     即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden       | boolean  |                       默认值为 false, 当值为 true 时，表单隐藏 |
| help         |  string  |                                                       帮助提示 |
| style        |  object  |                                                   输入框的样式 |
| value        |  array   |          选择的日期组合，每个值格式必须为"YYYY-MM-DD HH:mm:ss" |
| disabledDate | function |                                         判断日期是否合法的函数 |
| legalRange   |  array   |          合法的日期范围，每个值格式必须为"YYYY-MM-DD HH:mm:ss" |
| itemLayout   |  object  | 即 antd 组件库中的 Form 组件的 layout 属性，但是配置给子表单的 |
| onChange     | function |                                         当输入值变化的回调函数 |

### Range

-   数字范围输入框

#### 属性配置

| 字段       |   类型   |                                             说明 |
| ---------- | :------: | -----------------------------------------------: |
| required   | boolean  |                                         是否必要 |
| check      | boolean  | 默认值为 false, 当值为 true 时，才会显示错误信息 |
| disabled   | boolean  |         默认值为 false, 当值为 true 时，禁止修改 |
| isIllegal  | boolean  |   默认值为 false, 当值为 true 时表明当前输入错误 |
| errorHint  |  string  |                                         错误提示 |
| label      |  string  |                                             标签 |
| layout     |  object  |       即 antd 组件库中的 Form 组件的 layout 属性 |
| hidden     | boolean  |         默认值为 false, 当值为 true 时，表单隐藏 |
| help       |  string  |                                         帮助提示 |
| value      |  array   |                                   填入的数字范围 |
| legalRange |  array   |                                   合法的数字范围 |
| onChange   | function |                           当输入值变化的回调函数 |
