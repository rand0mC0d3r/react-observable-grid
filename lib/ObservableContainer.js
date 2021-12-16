"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    wrapper: {
      flex: '1 0 auto',
      position: 'relative',
      alignSelf: 'stretch',
      '@media print': {
        height: 'auto',
        overflow: 'auto'
      }
    },
    list: {
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      '@media print': {
        height: 'auto',
        overflow: 'auto',
        position: 'initial'
      }
    },
    alternatingItem: {
      '& > *:nth-child(even)': {
        backgroundColor: theme.palette.augmentColor({
          main: theme.palette.background.default
        }).main
      }
    }
  };
});
/**
 *
 * Adds a wrapper that allows in a container a list of items to be scrolled alternatively
 *
 * @param { children } The React Node to be rendered
 * @param { isAlternating } Boolean to determine if the list should be alternating
 * @param { isScrollable } Boolean to determine if the list should be scrollable
 */

var ObservableContainer = function ObservableContainer(_ref) {
  var children = _ref.children,
      isAlternating = _ref.isAlternating,
      isScrollable = _ref.isScrollable;
  var theme = (0, _styles.useTheme)();
  var classes = useStyles(theme);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.wrapper
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(classes.list, " ").concat(isAlternating && classes.alternatingItem),
    style: isScrollable ? {
      overflow: 'visible scroll',
      position: 'absolute',
      width: '100%',
      height: '100%'
    } : {}
  }, children));
};

ObservableContainer.defaultProps = {
  isScrollable: true,
  isAlternating: true
};
ObservableContainer.propTypes = {
  children: _propTypes.default.node.isRequired,
  isScrollable: _propTypes.default.bool,
  isAlternating: _propTypes.default.bool
};
var _default = ObservableContainer;
exports.default = _default;