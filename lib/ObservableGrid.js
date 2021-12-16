"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _fastSort = require("fast-sort");

var _react = require("react");

var _ = require(".");

var _ObservableContainer = _interopRequireDefault(require("./ObservableContainer"));

var _ObservableDebugging = _interopRequireDefault(require("./ObservableDebugging"));

var _ObservableEmpty = _interopRequireDefault(require("./ObservableEmpty"));

var _ObservableHeader = _interopRequireDefault(require("./ObservableHeader"));

var _ObservableLoadMore = _interopRequireDefault(require("./ObservableLoadMore"));

var _ObservableRow = _interopRequireDefault(require("./ObservableRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ObservableGrid = function ObservableGrid(_ref) {
  var headers = _ref.headers,
      _ref$rows = _ref.rows,
      rows = _ref$rows === void 0 ? [] : _ref$rows,
      _ref$keyPattern = _ref.keyPattern,
      keyPattern = _ref$keyPattern === void 0 ? function () {} : _ref$keyPattern,
      onLoadMore = _ref.onLoadMore,
      _ref$rowRenderer = _ref.rowRenderer,
      rowRenderer = _ref$rowRenderer === void 0 ? function () {} : _ref$rowRenderer,
      _ref$rowOptions = _ref.rowOptions,
      rowOptions = _ref$rowOptions === void 0 ? {
    padding: '20px',
    template: 'repeat(1fr)'
  } : _ref$rowOptions,
      emptyElement = _ref.emptyElement,
      _ref$isEmpty = _ref.isEmpty,
      isEmpty = _ref$isEmpty === void 0 ? true : _ref$isEmpty,
      _ref$isInfinite = _ref.isInfinite,
      isInfinite = _ref$isInfinite === void 0 ? false : _ref$isInfinite,
      _ref$isDebugging = _ref.isDebugging,
      isDebugging = _ref$isDebugging === void 0 ? true : _ref$isDebugging,
      _ref$isSelectable = _ref.isSelectable,
      isSelectable = _ref$isSelectable === void 0 ? true : _ref$isSelectable,
      _ref$isScrollable = _ref.isScrollable,
      isScrollable = _ref$isScrollable === void 0 ? true : _ref$isScrollable,
      _ref$isAlternating = _ref.isAlternating,
      isAlternating = _ref$isAlternating === void 0 ? true : _ref$isAlternating;
  var theme = (0, _styles.useTheme)();

  var _useState = (0, _react.useState)('asc'),
      _useState2 = _slicedToArray(_useState, 2),
      order = _useState2[0],
      setOrder = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      cachedRows = _useState4[0],
      setCachedRows = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      orderBy = _useState6[0],
      setOrderBy = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      throttling = _useState8[0],
      setThrottling = _useState8[1];

  var _useState9 = (0, _react.useState)(''),
      _useState10 = _slicedToArray(_useState9, 2),
      gridTemplateColumns = _useState10[0],
      setGridTemplateColumns = _useState10[1];

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      selectedIndex = _useState12[0],
      setSelectedIndex = _useState12[1];

  var _useState13 = (0, _react.useState)([]),
      _useState14 = _slicedToArray(_useState13, 2),
      sortedRows = _useState14[0],
      setSortedRows = _useState14[1];

  var _useState15 = (0, _react.useState)(35),
      _useState16 = _slicedToArray(_useState15, 2),
      pageSize = _useState16[0],
      setPageSize = _useState16[1];

  var _useState17 = (0, _react.useState)([]),
      _useState18 = _slicedToArray(_useState17, 2),
      viewedRows = _useState18[0],
      setViewedRows = _useState18[1];

  var _useState19 = (0, _react.useState)({
    start: -1,
    end: 1
  }),
      _useState20 = _slicedToArray(_useState19, 2),
      startEnd = _useState20[0],
      setStartEnd = _useState20[1];

  var _useState21 = (0, _react.useState)(0),
      _useState22 = _slicedToArray(_useState21, 2),
      granularity = _useState22[0],
      setGranularity = _useState22[1];

  var minRows = 25;
  var throttleLimit = 30;
  var collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base'
  });
  var naturalSort = (0, _fastSort.createNewSortInstance)({
    comparer: collator.compare
  });

  var handleRequestSort = function handleRequestSort(property) {
    var isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  var handleResetSort = function handleResetSort() {
    setOrderBy('');
    setOrder('asc');
  };

  var callbackKeyPattern = (0, _react.useCallback)(keyPattern, [keyPattern]);
  (0, _react.useEffect)(function () {
    if (rows.length > 0 || cachedRows.length > 0 && rows.length === 0) {
      setCachedRows(rows.map(function (r, index) {
        r.__origIndex = index;
        return r;
      }));
    }
  }, [rows]);
  (0, _react.useEffect)(function () {
    function sortSort(order, rows) {
      return order === 'asc' ? naturalSort(rows).asc([function (r) {
        return r[orderBy];
      }]) : naturalSort(rows).desc([function (r) {
        return r[orderBy];
      }]);
    }

    if (cachedRows.length > 0) {
      if (orderBy === '') {
        setSortedRows(cachedRows.map(function (r, index) {
          r.__index = index;
          return r;
        }));
      } else {
        setSortedRows(sortSort(order, cachedRows).map(function (r, index) {
          r.__index = index;
          return r;
        }));
      }

      setStartEnd({
        start: -1,
        end: 1
      });
      setThrottling(cachedRows.length >= throttleLimit);
    }
  }, [cachedRows, order, orderBy]);
  (0, _react.useEffect)(function () {
    var gridTemplateString = headers.map(function (header) {
      return header.width;
    }).join(' ');
    setGridTemplateColumns(gridTemplateString);

    if (gridTemplateString.indexOf('minmax') === -1) {
      console.error('Current grid-template-columns map contains no minmax(). Please use one otherwise the header will not be able to expand.');
    }
  }, [headers]);

  var advanceStartEnd = function advanceStartEnd() {
    setStartEnd(function (startEnd) {
      return {
        start: startEnd.start + 1,
        end: startEnd.end + 1
      };
    });
  };

  var regressStartEnd = function regressStartEnd() {
    setStartEnd(function () {
      return {
        start: -1,
        end: 1
      };
    });
  };

  return isEmpty ? /*#__PURE__*/React.createElement(_ObservableEmpty.default, null, emptyElement ? emptyElement : 'No data') : /*#__PURE__*/React.createElement(React.Fragment, null, isDebugging && /*#__PURE__*/React.createElement(_ObservableDebugging.default, {
    items: [{
      label: 'throttling',
      value: throttling
    }, {
      label: 'order',
      value: order
    }, {
      label: 'orderBy',
      value: orderBy
    }, {
      label: 'selectedIndex',
      value: selectedIndex
    }, {
      label: 'sortedRows',
      value: sortedRows.length
    }, {
      label: 'rows',
      value: rows.length
    }, {
      label: 'granularity',
      value: granularity
    }, {
      label: 'startEnd',
      value: JSON.stringify(startEnd)
    }, {
      label: 'pageSize',
      value: pageSize
    } // { label: 'MAX SIZE', value: rows.length / pageSize },
    // { label: 'direction', value: upperLimit > lowerLimit ? 'down' : 'up' },
    ]
  }, /*#__PURE__*/React.createElement("div", null, throttling ? 'throttling' : 'not throttling'), /*#__PURE__*/React.createElement("div", null, "selectedIndex: ", selectedIndex, " ", JSON.stringify(rowOptions))), /*#__PURE__*/React.createElement(_ObservableHeader.default, {
    gridTemplateColumns: gridTemplateColumns,
    headers: headers,
    order: order,
    orderBy: orderBy,
    handleRequestSort: handleRequestSort,
    handleResetSort: handleResetSort,
    rowOptions: rowOptions
  }), /*#__PURE__*/React.createElement(_ObservableContainer.default, {
    isScrollable: isScrollable,
    isAlternating: isAlternating
  }, rows.length > pageSize && startEnd.end > 0 && /*#__PURE__*/React.createElement(_.ObservableInternalLoadMore, {
    isPointing: true,
    onLoadMore: regressStartEnd
  }), /*#__PURE__*/React.createElement("style", null, "\n          .observableGrid {\n            min-height: 44px;\n            align-self: stretch;\n            break-inside: avoid;\n            font-size: 12px;\n            align-items: center;\n            grid-column-gap: 16px;\n            grid-row-gap: 16px;\n            display: grid;\n            padding: ".concat(rowOptions.padding, ";\n            grid-template-columns: ").concat(gridTemplateColumns, ";\n          }\n          .observableGrid:hover {\n            background-color: ").concat(theme.palette.augmentColor({
    main: theme.palette.divider
  }).light, ";\n          }\n          .observableGrid-selected {\n            background-color: ").concat(theme.palette.augmentColor({
    main: theme.palette.divider
  }).main, " !important;\n          }\n        ")), sortedRows // .filter(row => row.__index <= startEnd.end * pageSize && row.__index >= startEnd.start  * pageSize)
  .filter(function (row) {
    return row.__index <= startEnd.end * pageSize;
  }).map(function (row) {
    return /*#__PURE__*/React.createElement(_ObservableRow.default, {
      gridSpacing: gridTemplateColumns,
      minRows: minRows,
      updateGranularity: viewedRows.length,
      rowOptions: rowOptions,
      isScrollable: isScrollable,
      key: row.__index,
      innerIndex: row.__index // innerOriginalIndex={row.__origIndex}
      ,
      isRelevant: row.__index <= startEnd.end * pageSize // isRelevant={row.__index >= startEnd.start  * pageSize}
      ,
      isSelected: isSelectable && selectedIndex === row.__origIndex,
      onClick: function onClick() {
        return isSelectable && setSelectedIndex(selectedIndex === row.__origIndex ? null : row.__origIndex);
      }
    }, rowRenderer(row, row.__index));
  }), rows.length > pageSize && pageSize * startEnd.end - 1 < rows.length && /*#__PURE__*/React.createElement(_.ObservableInternalLoadMore, {
    onLoadMore: advanceStartEnd
  })));
};

var _default = ObservableGrid;
exports.default = _default;