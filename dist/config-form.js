'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var react = require('react');
var antd = _interopDefault(require('antd'));

var AntdInput = antd.Input;

var Input =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Input, _PureComponent);

  function Input(props) {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, _getPrototypeOf(Input).call(this, props));
  }

  _createClass(Input, [{
    key: "onChange",
    value: function onChange() {}
  }, {
    key: "render",
    value: function render() {
      React.createElement(AntdInput, {
        placeholder: "placeholder"
      });
    }
  }]);

  return Input;
}(react.PureComponent);

var index = {
  Input: Input
};

module.exports = index;
