import { makeStyles, useTheme } from '@material-ui/core/styles'
import { createNewSortInstance } from 'fast-sort'
import throttle from 'lodash/throttle'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ObservableContainer from './ObservableContainer'
import ObservableDebugging from './ObservableDebugging'
import ObservableEmpty from './ObservableEmpty'
import ObservableHeader from './ObservableHeader'
import ObservableInternalLoadMore from './ObservableInternalLoadMore'
// import ObservableLoadMore from './ObservableLoadMore'
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
  const [totalElements, setTotalElements] = useState(null)
  const [gridTemplateColumns, setGridTemplateColumns] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)

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

  useEffect(() => {
    setInnerHeaders(headers.map(header => ({ ...header, selected: false, visible: header.visible || true })))
  }, [headers])

  useEffect(() => {
    if (!isEmpty) {
      setCachedRows(rows.map((row, index) => ({ ...row, __origIndex: index })))
      setSelectedIndex(null)
    }
  }, [rows, isEmpty])

  useEffect(() => {
    searchColumns.length > 0
      ? setFilteredRows(cachedRows.filter(cr => {
        const searchedColumns =  searchColumns.filter(searchColumn => searchColumn.term.length > 0
            ? cr[searchColumn.key].toLowerCase().includes(searchColumn?.term)
          : true)
        return searchColumns.length === searchedColumns.length;
      }))
      : setFilteredRows(cachedRows)
  }, [cachedRows, searchColumns])

  useEffect(() => {
    function sortSort(order, rows) {
      return order === 'asc'
        ? naturalSort(rows).asc([r => r[orderBy]])
        : naturalSort(rows).desc([r => r[orderBy]])
    }
    if (filteredRows.length > 0) {
      orderBy === ''
        ? setSortedRows(filteredRows.map((r, index) => ({ ...r, __index:  index })))
        : setSortedRows(sortSort(order, filteredRows).map((r, index) => ({ ...r, __index:  index })))
      setStartEnd({ start: -1, end: 1 })
      setThrottling(filteredRows.length -1 >= throttleLimit)
    }
  }, [filteredRows, order, orderBy])

  // useEffect(( ) => {
  //   const interval = setInterval(() => {
  //     const currentElements = Number(calculateTotalElements())
  //     if(currentElements >= 1000) {
  //       setThrottleLimit(throttleLimit - 1/10 * throttleLimit)
  //       setThrottling(true)
  //     }
  //     setTotalElements(currentElements)
  //   }, 1500)

  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    if(!headers) return
    const gridTemplateString = headers.map(header => header.width).join(' ')
    setGridTemplateColumns(gridTemplateString)
    if (gridTemplateString.indexOf('minmax') === -1) {
      console.error('Current grid-template-columns map contains no minmax(). Please use one otherwise the header will not be able to expand.')
    }
  }, [headers])

  useEffect(() => {
    const gridTemplateString = innerHeaders.filter(header => header.visible).map(header => header.width).join(' ')
    setGridTemplateColumns(gridTemplateString)
  }, [innerHeaders])

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

  const idValue = (index) => {
    let result = null
    if(index === 0) {
      result = 'first'
    } else if(index === selectedIndex) {
      result = 'selected'
    }

    return result
  }

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
      // { label: 'totalElements', value: totalElements },
    ]}>
    </ObservableDebugging>}
    {/* {JSON.stringify(searchColumns)} */}
    {headers && <ObservableHeader {...{
      options: headerOptions,
      gridTemplateColumns,
      setHeaders: setInnerHeaders,
      headers: innerHeaders,
      order,
      orderBy,
      onSelect,
      onDeSelect,
      handleRequestSort,
      handleSearchTerm: ({ key, term }) => {
        console.log(key, term)
        if (term === null) {
          setSearchColumns([...searchColumns.filter(sc => sc.key !== key)])
        } else {
          setSearchColumns([...searchColumns.filter(sc => sc.key !== key), {key, term}])
        }
      },
      handleResetSort,
      rowOptions }} />}

    <div
        className={`${classes.observableRow} ${classes.selectedColumn}`}
        style={{
          alignItems: 'unset',
          display: 'grid',
          padding: rowOptions.padding,
          paddingTop: 0,
          paddingBottom: 0,
          gap: '16px',
          zIndex: -1,
          gridTemplateColumns: gridTemplateColumns,
        }}>
      {innerHeaders.map((innerHeader, i) => <div
      key={`${innerHeader.property}-${innerHeader.label}`}
      className={`
      ${classes.observableColumn}
      ${isColumned && classes.observableColumnRight}`}
      style={{
        backgroundColor: i === innerHeaders.findIndex(header => header.selected) ? "#EEEEEE80" : '',
      }}/>)}
    </div>

    {sortedRows.length > 0 ? <>

      {sortedRows && <ObservableContainer {...{ isScrollable, isAlternating, isGrid }}>
        {(throttling && sortedRows.length > pageSize && startEnd.end > 0 && startEnd.start !== -1) &&
          <ObservableInternalLoadMore isPointing onLoadMore={regressStartEnd} />}
        {sortedRows
          .filter(row => throttling
            ? row.__index <= (selectedIndex === null ? (startEnd.end * pageSize) : Math.max(selectedIndex, startEnd.end * pageSize))
            : true
          )
          .map(row => <ObservableRow
            {...{ gridSpacing: gridTemplateColumns, minRows, rowOptions, isScrollable }}
            key={row.__index}
            id={idValue(row.__index)}
            style={{
              padding: rowOptions.padding,
              gridTemplateColumns: gridTemplateColumns,
              backgroundColor: (isSelectable && !isGrid && selectedIndex === row.__origIndex)
                ? '#44444422'
                : '',
            }}
            className={`${isGrid ? classes.observableGrid : classes.observableRow} ${(isSelectable && selectedIndex === row.__origIndex) ? 'Row-isSelected' : ''}`}
            index={row.__index}
            onMouseEnter={() => setCurrentRow(row.__index)}
            forceRender={!throttling}
            isRelevant={throttling
              ? row.__index <= (selectedIndex === null ? (startEnd.end * pageSize) : Math.max(selectedIndex, startEnd.end * pageSize))
              : true
            }
            onClick={() => isSelectable && !isGrid && setSelectedIndex(selectedIndex === row.__origIndex ? null : row.__origIndex)}
          >
            {/* {currentRow} */}
            {innerHeaders.filter(header => header.visible).map(header =>
              <React.Fragment key={`${header.property}_${header.label}_${header.tooltip}_${header.width}`}>
                {(!throttling && canvasDrawing && header.canCanvas)
                  ? <ObservableSnapshot origIndex={row.__origIndex} index={row.__index} id={`${row.__origIndex}_${header.property}_${header.label}`}>
                    {row.__index === currentRow && header.onHover ? header.onHover(row) : header.row(row)}
                  </ObservableSnapshot>
                  : row.__index === currentRow && header.onHover ? header.onHover(row) : header.row(row)}
              </React.Fragment>)}
          </ObservableRow>)}
        {throttling && rows.length > pageSize && pageSize * startEnd.end - 1 < rows.length && <ObservableInternalLoadMore onLoadMore={advanceStartEnd} />}
        {/* {isInfinite && sortedRows.length - currentIndex < 25 && !!onLoadMore && <ObservableLoadMore {...{ onLoadMore }} />} */}

      </ObservableContainer>}
      {(selectedIndex ? true : rows.length > pageSize && startEnd.end > 3) &&
        <ObservableScrollTop {...{ selectedIndex, isAtTop: rows.length > pageSize && startEnd.end > 3 }} />}

    </>
    : <ObservableEmpty>{emptyElement}</ObservableEmpty>}
  </div>
}

const useStyles = makeStyles((theme) => ({
  selectedColumn: {
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    position: 'absolute',
  },
  observableRow: {
    alignSelf: 'stretch',
    breakInside: 'avoid',
    fontSize: '12px',
    alignItems: 'center',
    gridColumnGap: '16px',
    display: 'grid',
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
    // borderRight: `1px solid blue`,
  },
  observableColumnLeft: {
    // borderLeft: `1px solid ${theme.palette.divider}`,
    // borderLeft: `1px solid red`,
  },
  observableColumn: {
    margin: '0px -8px',
    // borderRight: `1px solid ${theme.palette.divider}`,

    '&:last-child': {
      borderRight: '0px none'
    },
  }
}))


export default ObservableGrid