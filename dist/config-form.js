'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var antd = require('antd');
var schemaVerify = require('schema-verify');
var reactTransitionGroup = require('react-transition-group');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var Util = {
  loadModule: function loadModule(moduleName) {
    try {
      return require(moduleName);
    } catch (err) {
      if (err && err.code === "MODULE_NOT_FOUND") {
        throw new Error("\u8BF7\u5148\u5B89\u88C5\u6A21\u5757 ".concat(moduleName));
      }

      throw err;
    }
  },
  bindme: function bindme(context) {
    for (var _len = arguments.length, funcs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      funcs[_key - 1] = arguments[_key];
    }

    funcs.forEach(function (func) {
      if (schemaVerify.Type.string.is(func) && schemaVerify.Type["function"].is(context[func])) {
        context[func] = context[func].bind(context);
      } else {
        throw new Error("\u7F3A\u5C11 ".concat(func, " \u5C5E\u6027\u65B9\u6CD5"));
      }
    });
  },
  filterItemProps: function filterItemProps(props, isIllegal) {
    props = schemaVerify.Type.object.safe(props);
    var result = {
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

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".unctrl_input_ctrl-input-view__197Y9 {\r\n    position: relative;\r\n    width: 100%;\r\n}\r\n\r\n.unctrl_input_ctrl-input__3M-Nn {\r\n    box-shadow: 0 !important;\r\n    border-color: #d9d9d9 !important;\r\n}\r\n\r\n.unctrl_input_unctrl-input-view__2Djd7 {\r\n    position: relative;\r\n    width: 100%;\r\n}\r\n";
var styles = {"ctrl-input-view":"unctrl_input_ctrl-input-view__197Y9","ctrl-input":"unctrl_input_ctrl-input__3M-Nn","unctrl-input-view":"unctrl_input_unctrl-input-view__2Djd7","ctrlInputView":"unctrl_input_ctrl-input-view__197Y9","ctrlInput":"unctrl_input_ctrl-input__3M-Nn","unctrlInputView":"unctrl_input_unctrl-input-view__2Djd7"};
styleInject(css);

var TextArea = antd.Input.TextArea;

var InInput =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(InInput, _React$PureComponent);

  function InInput(props) {
    var _this;

    _classCallCheck(this, InInput);

    Util.bindme(_this = _possibleConstructorReturn(this, _getPrototypeOf(InInput).call(this, props)), "setDom", "handleBlur", "handleFocus", "focusDom");
    _this.domTemp = null;
    return _this;
  }

  _createClass(InInput, [{
    key: "setDom",
    value: function setDom(dom) {
      if (dom && this.domTemp !== dom) {
        this.domTemp = dom;
      }
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(e) {
      var onFocus = this.props.onFocus;

      if (schemaVerify.Type["function"].is(onFocus)) {
        onFocus(e);
      }
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(e) {
      var onBlur = this.props.onBlur;

      if (schemaVerify.Type["function"].is(onBlur)) {
        onBlur(e);
      }
    }
  }, {
    key: "focusDom",
    value: function focusDom() {
      var dom = this.domTemp;

      if (dom && schemaVerify.Type["function"].is(dom.focus)) {
        dom.focus();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.focusDom();
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var isTextArea = props.isTextArea;

      var newProps = _objectSpread2({}, this.props);

      var InInputTag = isTextArea ? TextArea : antd.Input;
      delete newProps["isTextArea"];
      delete newProps["onChange"];
      delete newProps["onBlur"];
      delete newProps["onFocus"];
      return React.createElement(InInputTag, _extends({
        ref: this.setDom
      }, newProps, {
        onBlur: this.handleBlur,
        onFocus: this.handleFocus
      }));
    }
  }]);

  return InInput;
}(React.PureComponent);

var UnctrlInput =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(UnctrlInput, _React$PureComponent2);

  function UnctrlInput(props) {
    var _this2;

    _classCallCheck(this, UnctrlInput);

    Util.bindme(_this2 = _possibleConstructorReturn(this, _getPrototypeOf(UnctrlInput).call(this, props)), "handleChange", "handleBlur", "handleFocus");
    _this2.state = {
      isCtrlInputShow: true,
      defaultValue: null
    };
    return _this2;
  }

  _createClass(UnctrlInput, [{
    key: "handleChange",
    value: function handleChange(e) {
      var onChange = this.props.onChange;
      schemaVerify.Type["function"].is(onChange) && onChange(e);
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(e) {
      var _this3 = this;

      var onFocus = this.props.onFocus;
      var focusControl = this.props.focusControl;
      var isCtrlInputShow = this.state.isCtrlInputShow;

      if (!focusControl && isCtrlInputShow) {
        var value = this.props.value;
        value = schemaVerify.Type.string.is(value) ? value : "";
        setTimeout(function () {
          _this3.setState({
            isCtrlInputShow: false,
            defaultValue: value
          });
        }, 0);
        return;
      }

      schemaVerify.Type["function"].is(onFocus) && onFocus(e);
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(e) {
      var _this4 = this;

      var notTrim = this.props.notTrim;
      e = schemaVerify.Type.object.safe(e);
      e.target = schemaVerify.Type.object.safe(e.target);
      e.target.value = schemaVerify.Type.string.safe(e.target.value);

      if (!notTrim) {
        e.target.value = e.target.value.trim();
      }

      setTimeout(function () {
        _this4.setState({
          isCtrlInputShow: true,
          defaultValue: null
        });
      }, 0);
      var onBlur = this.props.onBlur;
      var onChange = this.props.onChange;
      schemaVerify.Type["function"].is(onBlur) && onBlur(e);
      schemaVerify.Type["function"].is(onChange) && onChange(e);
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props,
          state = this.state;
      var type = props.type,
          disabled = props.disabled,
          placeholder = props.placeholder,
          isTextArea = props.isTextArea,
          rows = props.rows,
          focusControl = props.focusControl;
      var isCtrlInputShow = state.isCtrlInputShow,
          defaultValue = state.defaultValue;
      var value = props.value;
      var InputTag = isTextArea ? TextArea : antd.Input;
      var inputProps = {
        type: type,
        disabled: disabled,
        placeholder: placeholder,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onChange: this.handleChange
      };

      if (schemaVerify.Type.number.is(rows)) {
        inputProps["rows"] = rows;
      }

      var inputhtml = null;

      if (isCtrlInputShow || focusControl) {
        value = schemaVerify.Type.string.is(value) ? value : "";
        inputhtml = React.createElement("div", {
          className: styles["ctrl-input-view"]
        }, React.createElement(InputTag, _extends({}, inputProps, {
          className: styles["ctrl-input"],
          value: value
        })));
      } else {
        inputhtml = React.createElement("div", {
          className: styles["unctrl-input-view"]
        }, React.createElement(InInput, _extends({}, inputProps, {
          defaultValue: defaultValue,
          isTextArea: isTextArea
        })));
      }

      return inputhtml;
    }
  }]);

  return UnctrlInput;
}(React.PureComponent);

var DURATION = 300;
var DEFAULT_STYLES = {
  position: "relative",
  width: "100%",
  transition: "opacity ".concat(DURATION, "ms ease-in-out"),
  opacity: 0
};
var TRANS_STYLES = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  },
  exiting: {
    opacity: 0
  },
  exited: {
    opacity: 0
  }
};

var FadeView =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(FadeView, _React$PureComponent);

  function FadeView() {
    _classCallCheck(this, FadeView);

    return _possibleConstructorReturn(this, _getPrototypeOf(FadeView).apply(this, arguments));
  }

  _createClass(FadeView, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var hidden = props.hidden,
          children = props.children;
      return React.createElement(reactTransitionGroup.Transition, {
        unmountOnExit: true,
        "in": !hidden,
        timeout: DURATION
      }, function (state) {
        return React.createElement("div", {
          style: _objectSpread2({}, DEFAULT_STYLES, {}, TRANS_STYLES[state])
        }, children);
      });
    }
  }]);

  return FadeView;
}(React.PureComponent);

var FormItem = antd.Form.Item;
var LAYOUT = {
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
var DEFAULT_HINT = "当前输入存在错误";
var DEFAULT_LABEL = "(未命名)";
var SUCC_STATUS = "success";
var ERR_STATUS = "error";

var ItemView =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ItemView, _React$PureComponent);

  function ItemView() {
    _classCallCheck(this, ItemView);

    return _possibleConstructorReturn(this, _getPrototypeOf(ItemView).apply(this, arguments));
  }

  _createClass(ItemView, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var isIllegal = props.isIllegal,
          noRedPoint = props.noRedPoint,
          required = props.required,
          check = props.check,
          disabled = props.disabled,
          errorHint = props.errorHint,
          hidden = props.hidden,
          help = props.help,
          children = props.children;
      var layout = props.layout;
      var label = props.label;
      var valiStatus = {
        status: SUCC_STATUS
      };

      if (schemaVerify.Type.string.isNotEmpty(help)) {
        valiStatus["text"] = help;
      }

      if (check && required && !disabled && isIllegal) {
        valiStatus = {
          status: ERR_STATUS,
          text: errorHint || DEFAULT_HINT
        };
      }

      layout = schemaVerify.Type.object.is(layout) ? layout : LAYOUT;
      label = schemaVerify.Type.string.isNotEmpty(label) ? label : DEFAULT_LABEL;
      return React.createElement(FadeView, {
        hidden: hidden
      }, React.createElement(FormItem, _extends({}, layout, {
        required: !noRedPoint && required,
        validateStatus: valiStatus.status,
        help: valiStatus.text,
        label: label
      }), children));
    }
  }]);

  return ItemView;
}(React.PureComponent);

var DEFAULT_TYPE = "text";
var TEXTAREA_TYPE = "textArea";
var DEFAULT_ROW = 3;

var CInput =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CInput, _React$PureComponent);

  function CInput(props) {
    var _this;

    _classCallCheck(this, CInput);

    Util.bindme(_this = _possibleConstructorReturn(this, _getPrototypeOf(CInput).call(this, props)), "onChange");
    return _this;
  }

  _createClass(CInput, [{
    key: "onChange",
    value: function onChange(e) {
      var onChange = this.props.onChange;
      var value = e.target.value;
      schemaVerify.Type["function"].is(onChange) && onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var disabled = props.disabled,
          value = props.value,
          focusControl = props.focusControl,
          placeholder = props.placeholder;
      var type = props.type;
      var row = props.row;
      var isIllegal = props.isIllegal;
      type = type ? type : DEFAULT_TYPE;
      var inputProps = {
        disabled: disabled,
        type: type,
        value: value,
        focusControl: focusControl,
        placeholder: placeholder,
        onChange: this.onChange
      };

      if (type === TEXTAREA_TYPE) {
        row = schemaVerify.Type.number.is(row) ? row : DEFAULT_ROW;
        inputProps["row"] = row;
        inputProps["isTextArea"] = true;
      }

      isIllegal = isIllegal || !schemaVerify.Type.string.isNotEmpty(value);
      var itemProps = Util.filterItemProps(props, isIllegal);
      return React.createElement(ItemView, itemProps, React.createElement(UnctrlInput, inputProps));
    }
  }]);

  return CInput;
}(React.PureComponent);

var PATTERN_INFO = {
  "default": {
    name: "字符串",
    patternHint: "当前值不符合规定格式",
    emptyHint: "当前输入不能为空",
    check: function check() {
      return true;
    }
  },
  sign: {
    name: "标识",
    patternHint: "只允许字母、下划线或数字组成",
    check: function check(v) {
      return schemaVerify.Pattern.sign.is(v);
    }
  },
  uri: {
    name: "链接",
    patternHint: "只允许输入链接",
    check: function check(v) {
      return schemaVerify.Pattern.uri.is(v);
    }
  },
  version: {
    name: "版本",
    patternHint: "只允许字母v，数字和小数点组成",
    check: function check(v) {
      return schemaVerify.Pattern.version.is(v);
    }
  },
  email: {
    name: "邮件地址",
    patternHint: "只允许输入电子邮件地址",
    check: function check(v) {
      return schemaVerify.Pattern.email.is(v);
    }
  },
  phone: {
    name: "手机",
    patternHint: "只允许11位的手机号",
    check: function check(v) {
      return schemaVerify.Pattern.phone.is(v);
    }
  },
  json: {
    name: "json字符串",
    patternHint: "无法解析json字符串",
    check: function check(v) {
      return schemaVerify.Pattern.jsonStr.is(v);
    }
  }
};

var PatternInput =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(PatternInput, _React$PureComponent);

  function PatternInput() {
    _classCallCheck(this, PatternInput);

    return _possibleConstructorReturn(this, _getPrototypeOf(PatternInput).apply(this, arguments));
  }

  _createClass(PatternInput, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var pattern = props.pattern,
          value = props.value;

      var inputProps = _objectSpread2({}, props);

      var errorHint = props.errorHint;
      var placeholder = props.placeholder;
      var patternInfo = props.patternInfo;
      var required = props.required;
      var isIllegal = props.isIllegal;
      info = PATTERN_INFO[pattern] || PATTERN_INFO["default"];

      if (schemaVerify.Type.object.is(patternInfo)) {
        patternInfo = Object.assign({}, info, patternInfo);
      } else {
        patternInfo = info;
      }

      if (!schemaVerify.Type.string.isNotEmpty(placeholder)) {
        var name = schemaVerify.Type.string.is(patternInfo.name) ? patternInfo["name"] : PATTERN_INFO["default"]["name"];
        placeholder = "\u8BF7\u8F93\u5165".concat(name);
      }

      switch (true) {
        case !schemaVerify.Type.string.isNotEmpty(value):
          errorHint = schemaVerify.Type.string.isNotEmpty(errorHint) ? errorHint : PATTERN_INFO["default"]["emptyHint"];
          isIllegal = true;
          break;

        case schemaVerify.Type.string.isNotEmpty(value) && schemaVerify.Type["function"].is(patternInfo.check) && !patternInfo.check(value):
          errorHint = schemaVerify.Type.string.is(patternInfo.patternHint) ? patternInfo["patternHint"] : PATTERN_INFO["default"]["patternHint"];
          isIllegal = true;
          break;
      }

      if (schemaVerify.Type.string.isNotEmpty(value)) {
        required = true;
      }

      inputProps["placeholder"] = placeholder;
      inputProps["errorHint"] = errorHint;
      inputProps["required"] = required;
      inputProps["isIllegal"] = isIllegal;
      delete inputProps["patternInfo"];
      return React.createElement(CInput, inputProps);
    }
  }]);

  return PatternInput;
}(React.PureComponent);

var index = {
  Input: CInput,
  PatternInput: PatternInput
};

module.exports = index;
