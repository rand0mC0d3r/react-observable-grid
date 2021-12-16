"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _ArrowDropDown = _interopRequireDefault(require("@material-ui/icons/ArrowDropDown"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    wrapper: {
      width: '100%'
    },
    header: {
      display: 'grid',
      fontSize: '12px',
      minHeight: '50px',
      alignItems: 'center',
      gridColumnGap: '16px',
      gridRowGap: '16px',
      boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.2)',
      borderBottom: "2px solid ".concat(theme.palette.divider)
    },
    flexbox: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      gap: '4px'
    },
    miniFlexbox: {
      gap: '2px'
    },
    maxiFlexbox: {
      gap: '8px'
    },
    secondaryHeaders: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      gap: '8px'
    },
    headers: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      flexDirection: 'column',
      gap: '4px'
    },
    flipped: {
      transform: 'rotate(180deg)'
    }
  };
});

var ObservableHeader = function ObservableHeader(_ref) {
  var gridTemplateColumns = _ref.gridTemplateColumns,
      headers = _ref.headers,
      order = _ref.order,
      orderBy = _ref.orderBy,
      handleRequestSort = _ref.handleRequestSort,
      handleResetSort = _ref.handleResetSort,
      rowOptions = _ref.rowOptions;
  var theme = (0, _styles.useTheme)();
  var classes = useStyles(theme);

  var evaluateOrderBy = function evaluateOrderBy(_ref2) {
    var property = _ref2.property,
        label = _ref2.label;
    return orderBy === (property || (label === null || label === void 0 ? void 0 : label.toLowerCase()));
  };

  var renderMainHeader = function renderMainHeader(_ref3) {
    var tooltip = _ref3.tooltip,
        noSort = _ref3.noSort,
        property = _ref3.property,
        label = _ref3.label,
        icon = _ref3.icon,
        align = _ref3.align;
    return /*#__PURE__*/React.createElement(_core.Tooltip, {
      key: "".concat(property, "_").concat(label, "_").concat(align, "_").concat(tooltip),
      arrow: true,
      placement: "left",
      title: tooltip || (!noSort ? 'Click to toggle sorting direction for column' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: classes.flexbox,
      onClick: function onClick() {
        return !noSort && handleRequestSort(property || label.toLowerCase());
      },
      onDoubleClick: function onDoubleClick() {
        return !noSort && handleResetSort();
      },
      style: {
        cursor: noSort ? 'default' : 'pointer',
        justifyContent: align ? 'flex-end' : 'flex-start',
        flexDirection: align === 'right' ? 'row-reverse' : 'row'
      }
    }, icon && /*#__PURE__*/(0, _react.cloneElement)(icon, {
      style: {
        fontSize: 16
      }
    }), /*#__PURE__*/React.createElement(_core.Typography, {
      variant: "subtitle2",
      style: {
        lineHeight: '16px',
        flexOrder: 0,
        userSelect: 'none',
        fontWeight: evaluateOrderBy({
          property: property,
          label: label
        }) ? 'bold' : 'normal'
      }
    }, label), evaluateOrderBy({
      property: property,
      label: label
    }) && /*#__PURE__*/React.createElement(_ArrowDropDown.default, {
      className: order === 'asc' ? classes.flipped : null,
      style: {
        fontSize: 16,
        order: align ? -1 : 1
      }
    })));
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classes.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.header,
    style: {
      padding: rowOptions.padding,
      gridTemplateColumns: gridTemplateColumns
    }
  }, headers === null || headers === void 0 ? void 0 : headers.map(function (_ref4) {
    var align = _ref4.align,
        label = _ref4.label,
        icon = _ref4.icon,
        tooltip = _ref4.tooltip,
        property = _ref4.property,
        secondaryHeaders = _ref4.secondaryHeaders,
        additionalHeaders = _ref4.additionalHeaders,
        noSort = _ref4.noSort;
    return /*#__PURE__*/React.createElement("div", {
      key: "".concat(label),
      className: classes.headers,
      style: {
        alignItems: align ? 'flex-end' : 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(classes.flexbox, " ").concat(classes.maxiFlexbox)
    }, renderMainHeader({
      tooltip: tooltip,
      noSort: noSort,
      property: property,
      label: label,
      icon: icon,
      align: align
    }), additionalHeaders && /*#__PURE__*/React.createElement("div", {
      className: classes.secondaryHeaders
    }, additionalHeaders.map(function (_ref5) {
      var label = _ref5.label,
          property = _ref5.property,
          noSort = _ref5.noSort,
          icon = _ref5.icon;
      return renderMainHeader({
        tooltip: tooltip,
        noSort: noSort,
        property: property,
        label: label,
        icon: icon,
        align: align
      });
    }))), secondaryHeaders && /*#__PURE__*/React.createElement("div", {
      className: classes.secondaryHeaders
    }, secondaryHeaders.map(function (_ref6) {
      var label = _ref6.label,
          property = _ref6.property,
          noSort = _ref6.noSort;
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(classes.flexbox, " ").concat(classes.miniFlexbox),
        style: {
          cursor: noSort ? 'default' : 'pointer'
        },
        key: "".concat(label, "_subHeader")
      }, /*#__PURE__*/React.createElement(_core.Typography, {
        variant: "caption",
        style: {
          flexOrder: 0,
          lineHeight: '1.5',
          userSelect: 'none',
          fontWeight: evaluateOrderBy({
            property: property,
            label: label
          }) ? 'bold' : 'normal'
        },
        onClick: function onClick() {
          return !noSort && handleRequestSort(property || label.toLowerCase());
        },
        onDoubleClick: function onDoubleClick() {
          return !noSort && handleResetSort();
        },
        color: "textSecondary"
      }, label), evaluateOrderBy({
        label: label,
        property: property
      }) && /*#__PURE__*/React.createElement(_ArrowDropDown.default, {
        color: "action",
        className: order === 'asc' ? classes.flipped : null,
        style: {
          fontSize: 12,
          order: align ? -1 : 1
        }
      }));
    })));
  })));
};

ObservableHeader.propTypes = {
  gridTemplateColumns: _propTypes.default.string.isRequired,
  headers: _propTypes.default.array.isRequired,
  order: _propTypes.default.string.isRequired,
  orderBy: _propTypes.default.string.isRequired,
  handleRequestSort: _propTypes.default.func.isRequired,
  handleResetSort: _propTypes.default.func.isRequired,
  rowOptions: _propTypes.default.object
};
var _default = ObservableHeader;
exports.default = _default;