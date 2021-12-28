import { makeStyles, useTheme } from '@material-ui/core/styles'
// import ObservableLoadMore from './ObservableLoadMore'
import RoomIcon from '@material-ui/icons/Room'
import { createNewSortInstance } from 'fast-sort'
import throttle from 'lodash/throttle'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ObservableRowList } from '.'
import ObservableContainer from './ObservableContainer'
import ObservableDebugging from './ObservableDebugging'
import ObservableEmpty from './ObservableEmpty'
import ObservableHeader from './ObservableHeader'
import ObservableInternalLoadMore from './ObservableInternalLoadMore'
import ObservableProgress from './ObservableProgress'
import ObservableRow from './ObservableRow'
import ObservableScrollTop from './ObservableScrollTop'
import ObservableSnapshot from './ObservableSnapshot'

const ObservableGrid =  ({
  headers,
  rows = [],
  uniqueId = Math.random().toString(36).substr(0, 8),
  // keyPattern = () => { },
  // onLoadMore,
  // rowRenderer = () => { },
  triggerSearch,
  className,
  rowOptions = {
    padding: '20px',
    template: 'repeat(1fr)'
  },
  headerOptions = { },
  emptyElement,
  pageSize = 25,
  customActions,
  minRows = 25,
  canvasDrawing = false,

  isColumned= false,
  isEmpty = false,
  isClearingOnBlur = true,
  // isInfinite = false,
  isUpdatingUrl = false,
  isGrid = false,
  isDebugging = false,
  isSelectable = true,
  isScrollable = true,
  isHeaderHidden = false,
  isAlternating = true,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const [searchColumns, setSearchColumns] = useState([])
  const [order, setOrder] = useState('asc')

  const [innerHeaders, setInnerHeaders] = useState([])
  const [orderBy, setOrderBy] = useState('')
  const [url, setUrl] = useState('')
  const [currentRow, setCurrentRow] = useState(null)
  const [throttling, setThrottling] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [totalElements, setTotalElements] = useState(null)
  const [gridTemplateColumns, setGridTemplateColumns] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)

  const [elementsRendered, setElementsRendered] = useState([0, 0])

  const [indexedRows, setIndexedRows] = useState([])
  const [customFilteredRows, setCustomFilteredRows] = useState([])
  const [sortedRows, setSortedRows] = useState([])
  const [filteredRows, setFilteredRows] = useState([])

  const [startEnd, setStartEnd] = useState({ start: -1, end: 1 })
  const [throttleLimit, setThrottleLimit] = useState(50)
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

  const debugItems = [
    { label: 'throttling', value: throttling },
    { label: 'throttleLimit', value: throttleLimit },
    { label: 'order', value: order },
    { label: 'orderBy', value: orderBy },
    { label: 'selectedIndex', value: selectedIndex },
    { label: 'sortedRows', value: sortedRows.length },
    { label: 'canvasDrawing', value: !throttling && canvasDrawing },
    { label: 'rows', value: rows.length },
    { label: 'startEnd', value: JSON.stringify(startEnd) },
    { label: 'pageSize', value: pageSize },
    { label: 'totalElements', value: `${elementsRendered[0]} (${elementsRendered[1]})` },
    { label: 'url', value: url },
  ]

  const naturalSort = createNewSortInstance({
    comparer: collator.compare,
  })

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleResetSort = () => {
    setOrderBy('')
    setOrder('asc')
  }

  const calculateGridElements = () => {
    const gridElement = document.getElementById("observable-grid")
    return gridElement ? gridElement.getElementsByTagName('*').length : 0
  }

  const updateRenderedElements = () => {
    setElementsRendered(() => [document.getElementsByTagName('*').length, Number(calculateGridElements())])
  }

  const advanceStartEnd = () => {
    setStartEnd((startEnd) => ({ start: startEnd.start + 1, end: startEnd.end + 1 }))
  }

  const regressStartEnd = () => {
    setStartEnd(() => ({ start: - 1, end:  1  }))
  }

  const onSelect = (property) => {
    setInnerHeaders(innerHeaders.map(header => ({ ...header, selected: header.property === property ? true : false })))
  }

  const onDeSelect = (property) => {
    setInnerHeaders(innerHeaders.map(header => ({ ...header, selected: header.property === property ? false : false })))
  }

  const clearOnBlur = () => {
    if (isClearingOnBlur) {
      setInnerHeaders(innerHeaders.map(header => ({ ...header, selected: false })))
      setCurrentRow(null)
    }
  }

  useEffect(() => {
    setInnerHeaders(headers.map(header => ({ ...header, selected: false, visible: header.visible || true })))
  }, [headers])

  useEffect(() => {
    console.log('1. setIndexedRows', rows.length)
    setIndexedRows(isEmpty ? [] : () => rows.map((row, index) => ({ ...row, __origIndex: index })))
    setSelectedIndex(null)
  }, [rows, isEmpty])

  useEffect(() => {
    const t0 = performance.now()
    const result = headers.filter(header => header.customFilter || header.extraFilters).reduce((acc, value) => {
      let result = acc
      if (value.customFilter) { result = value.customFilter(acc) }
      if (value.extraFilters) { value.extraFilters.forEach(filter => { result = filter.func(result) })}
      return result
    }, indexedRows)
    const t1 = performance.now()
    setCustomFilteredRows(result)
    console.log('1. custom filtering indexed rows', indexedRows.length, result.length, t1 - t0)
  }, [indexedRows, triggerSearch, headers])

  const filterRows = (customFilteredRows, searchColumns) => {
    const t0 = performance.now()
    const sensitiveSearch = (sensitive, cr, key, term) => sensitive ? cr[key].includes(term) : cr[key].toLowerCase().includes(term.toLowerCase())
    const searchByRegex = (regex, property) => regex.test(property)

    const result = searchColumns.length > 0
      ? customFilteredRows.filter(cr => searchColumns
        .filter(searchColumn => searchColumn?.term.length > 0
          ? searchColumn.isRegex
            ? searchByRegex(new RegExp(searchColumn.term, `${searchColumn.isSensitive ? '' : 'i'}`), cr[searchColumn.key])
            : sensitiveSearch(searchColumn.isSensitive, cr, searchColumn?.key, searchColumn?.term)
          : true).length === searchColumns.length)
      : customFilteredRows
    const t1 = performance.now()
    setFilteredRows(result)
    setSelectedIndex(null)
    console.log('2. filtering custom filtered rows', customFilteredRows.length, searchColumns, result.length, t1 - t0)
  }

  const sortRows = (orderBy, filteredRows, order) => {
    const t0 = performance.now()
    const sortSort = (order, rows) => order === 'asc' ? naturalSort(rows).asc([r => r[orderBy]]) : naturalSort(rows).desc([r => r[orderBy]])
    const orderedRows = orderBy === '' ? filteredRows.map((r, index) => ({ ...r, __index: index })) : sortSort(order, filteredRows).map((r, index) => ({ ...r, __index: index }))
    const t1 = performance.now()
    setSortedRows(orderedRows)
    setStartEnd({ start: -1, end: 1 })
    setThrottling(orderedRows.length - 1 >= throttleLimit)
    console.log('3. sorting rows', filteredRows.length, orderBy, order, t1 - t0)
  }

  useEffect(() => filterRows(customFilteredRows, searchColumns), [customFilteredRows, searchColumns])
  useEffect(() => sortRows(orderBy, filteredRows, order), [filteredRows, order, orderBy])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const currentElements = Number(calculateTotalElements())
  //     if(currentElements >= 1000) {
  //       setThrottleLimit(throttleLimit - 1/10 * throttleLimit)
  //       setThrottling(true)
  //     }
  //     updateRenderedElements()
  //   }, 1500)

  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    if (!headers) return
    const gridTemplateString = headers.map(header => header.width).join(' ')
    setGridTemplateColumns(gridTemplateString)
    if (gridTemplateString.indexOf('minmax') === -1) {
      console.error('Current grid-template-columns map contains no minmax(). Please use one otherwise the header will not be able to expand.')
    }
  }, [headers])

  useEffect(() => {
    if (isDebugging) {
      updateRenderedElements()
    }
    setUrl(`
      ?orderBy=${orderBy}
      &order=${order}
      &selectedIndex=${selectedIndex}
      &searchColumns=${JSON.stringify(searchColumns)}
      &extraFilters=${JSON.stringify(innerHeaders.filter(ih => ih.extraFilters).map(ih => ({ label: ih.label, variable: JSON.stringify(ih.variable) })))}
      &visibleHeaders=${innerHeaders.filter(header => header.visible).map(header => header.property)}`)
  }, [orderBy, order, innerHeaders, searchColumns, selectedIndex, isDebugging])

  useEffect(() => {
    const gridTemplateString = innerHeaders.filter(header => header.visible).map(header => header.width).join(' ')
    setGridTemplateColumns(gridTemplateString)
  }, [innerHeaders])

  return <div id="observable-grid" className={`${className} ${classes.root}`} onMouseLeave={clearOnBlur}>
    {isDebugging && <ObservableDebugging items={debugItems} />}

    {!isHeaderHidden && headers.length > 0 && innerHeaders.length > 0 && <ObservableHeader {...{
        options: headerOptions,
        rows: sortedRows,
        setHeaders: setInnerHeaders,
        headers: innerHeaders,
        progress: Math.round(currentRow * 100 / sortedRows.length),
        gridTemplateColumns,
        order,
        orderBy,
        onSelect,
        onDeSelect,
        handleRequestSort,
        handleSearchTerm: ({ key, term, isRegex, isCaseSensitive }) => {
          term === null
            ? setSearchColumns([...searchColumns.filter(sc => sc.key !== key)])
            : setSearchColumns([...searchColumns.filter(sc => sc.key !== key), { key, term, isRegex, isCaseSensitive }])
        },
        handleResetSort,
        rowOptions
      }}
    />}

    {!isGrid && <div
      className={classes.observableRow}
      style={{
        padding: rowOptions.padding,
        paddingTop: 0,
        paddingBottom: 0,
        gridTemplateColumns: gridTemplateColumns
      }}
    >
      {innerHeaders.map((innerHeader, i) => <div key={`${innerHeader.property}-${innerHeader.label}`}
        className={`${classes.observableColumn} ${isColumned && classes.observableColumnRight}`}
        style={{ backgroundColor: i === innerHeaders.findIndex(header => header.selected) ? "#EEEEEE80" : ''}}
      />)}
    </div>}

    {sortedRows.length > 0 ? <>
      {sortedRows && <ObservableContainer {...{ isScrollable, isAlternating, isGrid }}>
        {(throttling && sortedRows.length > pageSize && startEnd.end > 0 && startEnd.start !== -1) &&
          <ObservableInternalLoadMore isPointing onLoadMore={regressStartEnd} />}
        <ObservableRowList {...{ rows: sortedRows, setCurrentRow, currentRow, throttling, setSelectedIndex, rowOptions, gridTemplateColumns, selectedIndex, startEnd, pageSize, innerHeaders}} />
        {throttling && rows.length > pageSize && pageSize * startEnd.end - 1 < rows.length && <ObservableInternalLoadMore onLoadMore={advanceStartEnd} />}
        {/* {isInfinite && sortedRows.length - currentIndex < 25 && !!onLoadMore && <ObservableLoadMore {...{ onLoadMore }} />} */}
      </ObservableContainer>}
      {/* {customActions !== undefined || (selectedIndex ? true : rows.length > pageSize && startEnd.end >= 2) && */}
      <ObservableScrollTop {...{ filtered: sortedRows.length, total: rows.length, customActions, selectedIndex, isAtTop: rows.length > pageSize && startEnd.end >= 2 }} />
        {/* } */}
    </>
      : <ObservableEmpty>{emptyElement}</ObservableEmpty>}

    <ObservableProgress {...{currentRow, rowsLength: sortedRows.length, selectedIndex }} />
  </div>
}

const useStyles = makeStyles((theme) => ({
  observableRow: {
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    position: 'absolute',
    alignSelf: 'stretch',
    breakInside: 'avoid',
    fontSize: '12px',
    display: 'grid',
    alignItems: 'unset',
    gap: '16px',
    zIndex: -1,
  },
  observableGrid: {
    breakInside: 'avoid',
    fontSize: '12px',
    gridColumnGap: '16px',
    display: 'grid',
  },
  observableRowSelected: {
    backgroundColor: "#4442"
  },
  observableColumnRight: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  observableColumnLeft: {
  },
  observableColumn: {
    margin: '0px -8px',

    '&:last-child': {
      borderRight: '0px none'
    },
  },
  root: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
  }
}))


export default ObservableGrid