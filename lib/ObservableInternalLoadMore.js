"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _react = require("react");

var _reactIntersectionObserver = require("react-intersection-observer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useLoadMore = function useLoadMore(callback, delay) {
  return (0, _react.useCallback)((0, _throttle.default)(function () {
    return callback.apply(void 0, arguments);
  }, delay), [delay]);
};

var ObservableInternalLoadMore = function ObservableInternalLoadMore(_ref) {
  var _ref$onLoadMore = _ref.onLoadMore,
      onLoadMore = _ref$onLoadMore === void 0 ? function () {} : _ref$onLoadMore,
      _ref$isPointing = _ref.isPointing,
      isPointing = _ref$isPointing === void 0 ? false : _ref$isPointing;
  var throttledLoadMore = useLoadMore(function () {
    return onLoadMore();
  }, 750);
  return /*#__PURE__*/React.createElement(_reactIntersectionObserver.InView, {
    as: "div",
    style: {
      position: 'relative',
      top: isPointing ? '50%' : '-25%',
      opacity: '0'
    },
    onChange: function onChange(inView) {
      return inView && throttledLoadMore();
    }
  }, ".");
};

var _default = ObservableInternalLoadMore;
exports.default = _default;