"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RotateLeft = _interopRequireDefault(require("@material-ui/icons/RotateLeft"));

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _react = require("react");

var _reactIntersectionObserver = require("react-intersection-observer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useLoadMore(callback, delay) {
  var throttleFn = (0, _react.useCallback)((0, _throttle.default)(function () {
    return callback.apply(void 0, arguments);
  }, delay), [delay]);
  return throttleFn;
}

var ObservableLoadMore = function ObservableLoadMore(_ref) {
  var _ref$onLoadMore = _ref.onLoadMore,
      onLoadMore = _ref$onLoadMore === void 0 ? function () {} : _ref$onLoadMore;

  var _useInView = (0, _reactIntersectionObserver.useInView)({
    threshold: 1
  }),
      ref = _useInView.ref,
      inView = _useInView.inView;

  var throttledLoadMore = useLoadMore(function () {
    return onLoadMore();
  }, 1000);
  (0, _react.useEffect)(function () {
    if (inView) {
      throttledLoadMore();
    } // TODO: cancel throttle on unmount


    return function () {
      throttledLoadMore.cancel();
    };
  }, [inView, throttledLoadMore]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, ref && /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(_RotateLeft.default, null))));
};

var _default = ObservableLoadMore;
exports.default = _default;