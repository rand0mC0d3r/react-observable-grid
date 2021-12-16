"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _reactIntersectionObserver = require("react-intersection-observer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ObservableRow = function ObservableRow(_ref) {
  var innerIndex = _ref.innerIndex,
      onClick = _ref.onClick,
      children = _ref.children,
      isRelevant = _ref.isRelevant,
      isScrollable = _ref.isScrollable,
      isSelected = _ref.isSelected;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      inView = _useState2[0],
      setInView = _useState2[1];

  return isRelevant && children ? /*#__PURE__*/React.createElement(_reactIntersectionObserver.InView, {
    as: 'div',
    onClick: onClick,
    onChange: setInView,
    key: innerIndex,
    // 'data-i': innerIndex,
    // 'data-o': innerOriginalIndex,
    className: ['observableGrid', inView && isSelected ? 'observableGrid-selected' : false].filter(function (c) {
      return c !== false;
    }).join(' ')
  }, inView && isScrollable && children) : null;
};

ObservableRow.defaultProps = {
  isScrollable: true,
  isSelected: false,
  isRelevant: true
};
ObservableRow.propTypes = {
  isScrollable: _propTypes.default.bool
};
var _default = ObservableRow;
exports.default = _default;