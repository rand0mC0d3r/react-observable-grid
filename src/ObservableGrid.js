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
  className,
  rowOptions = {
    padding: '20px',
    template: 'repeat(1fr)'
  },
  headerOptions = { },
  emptyElement,
  pageSize = 25,
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
  const [currentRow, setCurrentRow] = useState(null)
  const [throttling, setThrottling] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [totalElements, setTotalElements] = useState(null)
  const [gridTemplateColumns, setGridTemplateColumns] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)

  const [elementsRendered, setElementsRendered] = useState([0,0])
  const [cachedRows, setCachedRows] = useState([])
  const [filteredRows, setFilteredRows] = useState([])
  const [sortedRows, setSortedRows] = useState([])

  const [startEnd, setStartEnd] = useState({ start: -1, end: 1 })
  const [throttleLimit, setThrottleLimit] = useState(50)
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

  const naturalSort = createNewSortInstance({
    comparer: collator.compare,
  })

  const calculateTotalElements = () => {
    return document.getElementsByTagName('*').length
  }

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
    // console.log(property)
    setInnerHeaders(innerHeaders.map(header => ({ ...header, selected: header.property === property ? true : false })))
  }

  const onDeSelect = (property) => {
    setInnerHeaders(innerHeaders.map(header => ({ ...header, selected: header.property === property ? false : false })))
  }

  useEffect(() => {
    setInnerHeaders(headers.map(header => ({ ...header, selected: false, visible: header.visible || true })))
  }, [headers])

  useEffect(() => {
    isEmpty
      ? setCachedRows([])
      : setCachedRows(() => rows.map((row, index) => ({ ...row, __origIndex: index })))
    setSelectedIndex(null)
  }, [rows, isEmpty])

  useEffect(() => {
    searchColumns.length > 0
      ? setFilteredRows(() => cachedRows.filter(cr => searchColumns
        .filter(searchColumn => searchColumn?.term.length > 0
          ? cr[searchColumn.key].toLowerCase().includes(searchColumn?.term)
          : true
        ).length === searchColumns.length
      ))
      : setFilteredRows(() => cachedRows)
  }, [cachedRows, searchColumns])

  useEffect(() => {
    function sortSort(order, rows) {
      return order === 'asc'
        ? naturalSort(rows).asc([r => r[orderBy]])
        : naturalSort(rows).desc([r => r[orderBy]])
    }
    orderBy === ''
      ? setSortedRows(() => filteredRows.map((r, index) => ({ ...r, __index:  index })))
      : setSortedRows(() => sortSort(order, filteredRows).map((r, index) => ({ ...r, __index: index })))
    setStartEnd({ start: -1, end: 1 })
    setThrottling(filteredRows.length - 1 >= throttleLimit)
    updateRenderedElements()
  }, [filteredRows, order, orderBy])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentElements = Number(calculateTotalElements())
      if(currentElements >= 1000) {
        setThrottleLimit(throttleLimit - 1/10 * throttleLimit)
        setThrottling(true)
      }
      updateRenderedElements()
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!headers) return
    const gridTemplateString = headers.map(header => header.width).join(' ')
    setGridTemplateColumns(gridTemplateString)
    if (gridTemplateString.indexOf('minmax') === -1) {
      console.error('Current grid-template-columns map contains no minmax(). Please use one otherwise the header will not be able to expand.')
    }
  }, [headers])

  useEffect(() => {
    console.log(`?orderBy=${orderBy}&order=${order}`)
  }, [orderBy, order])

  useEffect(() => {
    const gridTemplateString = innerHeaders.filter(header => header.visible).map(header => header.width).join(' ')
    setGridTemplateColumns(gridTemplateString)
  }, [innerHeaders])

  return <div
    id={"observable-grid"}
    className={className}
    onMouseLeave={() => {
      if (isClearingOnBlur) {
        setInnerHeaders(innerHeaders.map(header => ({ ...header, selected: false })))
        setCurrentRow(null)
      }
    }}
    style={{
      display: 'flex',
      position: 'absolute',
      width: '100%',
      height: '100%',
      flexDirection: 'column',
    }}>
    {isDebugging && <ObservableDebugging items={[
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
    ]}>
    </ObservableDebugging>}

    {!isHeaderHidden && headers.length > 0 && innerHeaders.length > 0 && <ObservableHeader {...{
        options: headerOptions,
        gridTemplateColumns,
        setHeaders: setInnerHeaders,
        headers: innerHeaders,
        progress: Math.round(currentRow * 100 / sortedRows.length),
        order,
        orderBy,
        onSelect,
        onDeSelect,
        handleRequestSort,
        handleSearchTerm: ({ key, term }) => {
          term === null
            ? setSearchColumns([...searchColumns.filter(sc => sc.key !== key)])
            : setSearchColumns([...searchColumns.filter(sc => sc.key !== key), { key, term }])
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
      }}>
      {innerHeaders.map((innerHeader, i) => <div key={`${innerHeader.property}-${innerHeader.label}`}
        onClick={() => { console.log(innerHeader) }}
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
      {(selectedIndex ? true : rows.length > pageSize && startEnd.end > 3) &&
        <ObservableScrollTop {...{ selectedIndex, isAtTop: rows.length > pageSize && startEnd.end > 3 }} />}
    </>
      : <ObservableEmpty>{emptyElement}</ObservableEmpty>}

    <div className={classes.progress}>
      <div style={{ position: 'relative' }}>
        {/* {selectedIndex} */}
        <div style={{ width: '100%', backgroundColor: '#BBBBBB42', height: '4px' }}></div>
        <div style={{ position: 'absolute', borderRadius: '0px 8px 8px 0px', top: '0px', left: '0px', width: `${Math.round(currentRow * 100 / sortedRows.length) + 3}%`, backgroundColor: '#3f51b569', height: '4px' }}></div>
        {selectedIndex && <div style={{
          position: 'absolute',
          borderRadius: '0px 8px 8px 0px',
          top: '0px',
          width: '10px',
          left: `${Math.round(selectedIndex * 100 / sortedRows.length) + 3}%`,
          height: '4px',
          backgroundColor: '#7885cb',
          border: '1px solid #FFF',
          borderTop: '0px none',
          borderBottom: '0px none',
        }}></div>}
        {/* <RoomIcon style={{ fontSize: '11px' }} color={[0, 25, 50, 70, 100].some(v => v === Math.round(currentRow * 100 / sortedRows.length)) ? 'primary' : 'disabled'} /> */}
      </div>
    </div>
  </div>
}

const useStyles = makeStyles((theme) => ({
  progress: {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
  },
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
  }
}))


export default ObservableGrid