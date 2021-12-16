"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adds a wrapper that allows to center the content of the component.
 * @param { children } The React Node to be rendered
 */
var ObservableEmpty = function ObservableEmpty(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, children);
};

ObservableEmpty.propTypes = {
  children: _propTypes.default.node.isRequired
};
var _default = ObservableEmpty;
exports.default = _default;