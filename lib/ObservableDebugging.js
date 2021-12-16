"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adds a wrapper that allows to show debug information in the UI.
 * @param { children } The React Node to be rendered
 */
var ObservableDebugging = function ObservableDebugging(_ref) {
  var items = _ref.items;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 0 auto',
      display: 'flex',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
      alignItems: 'center',
      position: 'absolute',
      bottom: '20px',
      gap: '4px',
      right: '20px',
      zIndex: '1',
      width: '500px'
    }
  }, items.map(function (_ref2) {
    var label = _ref2.label,
        value = _ref2.value;
    return /*#__PURE__*/React.createElement(_core.Chip, {
      color: "primary",
      size: "small",
      label: "".concat(label.toUpperCase(), ": ").concat(value),
      key: "".concat(label, ": ").concat(value)
    });
  }));
};

ObservableDebugging.defaultProps = {
  items: []
};
ObservableDebugging.propTypes = {
  items: _propTypes.default.array.isRequired
};
var _default = ObservableDebugging;
exports.default = _default;