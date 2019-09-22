'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var antd = require('antd');
var schemaVerify = require('schema-verify');

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
        throw new Error("Method ".concat(func, " is not defined"));
      }
    });
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
      isShowCtrlInput: true,
      defaultValue: null,
      unctrlValue: null
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
      var value = this.props.value;
      var focusControl = this.props.focusControl;
      var isShowCtrlInput = this.state.isShowCtrlInput;
      var unctrlValue = this.state.unctrlValue;

      if (!focusControl) {
        value = schemaVerify.Type.string.isNot(value) && schemaVerify.Type.string.isNotEmpty(unctrlValue) ? unctrlValue : value;
        setTimeout(function () {
          _this3.setState({
            isShowCtrlInput: false,
            defaultValue: value
          });
        }, 0);

        if (isShowCtrlInput) {
          return;
        }
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

      var value = e.target.value;
      setTimeout(function () {
        _this4.setState({
          isShowCtrlInput: true,
          defaultValue: null,
          unctrlValue: value
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
      var isShowCtrlInput = state.isShowCtrlInput,
          defaultValue = state.defaultValue,
          unctrlValue = state.unctrlValue;
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

      if (isShowCtrlInput || focusControl) {
        value = schemaVerify.Type.string.isNot(value) && schemaVerify.Type.string.isNotEmpty(unctrlValue) ? unctrlValue : value;
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

var CInput =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CInput, _React$PureComponent);

  function CInput(props) {
    _classCallCheck(this, CInput);

    return _possibleConstructorReturn(this, _getPrototypeOf(CInput).call(this, props));
  }

  _createClass(CInput, [{
    key: "onChange",
    value: function onChange() {}
  }, {
    key: "render",
    value: function render() {
      return React.createElement(UnctrlInput, null);
    }
  }]);

  return CInput;
}(React.PureComponent);

var index = {
  Input: CInput
};

module.exports = index;
