import { makeStyles, useTheme } from '@material-ui/core/styles'
import { createNewSortInstance } from 'fast-sort'
import React, { useEffect, useState } from 'react'
import ObservableInternalLoadMore from './ObservableInternalLoadMore'
import ObservableContainer from './ObservableContainer'
import ObservableDebugging from './ObservableDebugging'
import ObservableEmpty from './ObservableEmpty'
import ObservableHeader from './ObservableHeader'
// import ObservableLoadMore from './ObservableLoadMore'
import ObservableRow from './ObservableRow'
import ObservableScrollTop from './ObservableScrollTop'



const ObservableGrid =  ({
  headers,
  rows = [],
  // uniqueId = 'test',
  // keyPattern = () => { },
  // onLoadMore,
  // rowRenderer = () => { },
  rowOptions = {
    padding: '20px',
    template: 'repeat(1fr)'
  },
  headerOptions = { },
  emptyElement,


  // isInfinite = false,
  isUpdatingUrl = false,
  isDebugging = false,
  isSelectable = true,
  isScrollable = true,
  isAlternating = true,
}) => {
  const theme = useTheme()
  const classes = useStyles()

  const [order, setOrder] = useState('asc')
  const [cachedRows, setCachedRows] = useState([])
  const [innerHeaders, setInnerHeaders] = useState([])
  const [orderBy, setOrderBy] = useState('')
  const [throttling, setThrottling] = useState(false)
  const [gridTemplateColumns, setGridTemplateColumns] = useState('')

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [sortedRows, setSortedRows] = useState([])
  const [startEnd, setStartEnd] = useState({ start: -1, end: 1 })

  const pageSize = 25
  const minRows = 25
  const throttleLimit = 30
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

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

  useEffect(() => {
    setInnerHeaders(headers.map(header => ({ ...header, selected: false, visible: header.visible || true })))
  }, [headers])

  useEffect(() => {
    if (rows.length > 0 || cachedRows.length > 0 && rows.length === 0) {
      setCachedRows(rows.map((r, index) => { r.__origIndex = index

        return r }))
    }
  }, [rows])

  useEffect(() => {
    function sortSort(order, rows) {
      return order === 'asc' ? naturalSort(rows).asc([r => r[orderBy]]) : naturalSort(rows).desc([r => r[orderBy]])
    }

    if (cachedRows.length > 0) {
      if (orderBy === '') {
        setSortedRows(cachedRows.map((r, index) => { r.__index = index

          return r }))
      } else {
        setSortedRows(sortSort(order, cachedRows).map((r, index) => { r.__index = index

          return r }))
      }
      setStartEnd({ start: -1, end: 1 })
      setThrottling(cachedRows.length >= throttleLimit)

    }
  }, [cachedRows, order, orderBy])

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

  const onSelect = (label) => {
    setInnerHeaders(innerHeaders.map(header => ({ ...header, selected: header.label === label ? !header.selected : false })))
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

  return rows.length === 0
    ? <ObservableEmpty>{emptyElement ? emptyElement : 'No data'}</ObservableEmpty>
    : <div
      onMouseLeave={() => setInnerHeaders(innerHeaders.map(header => ({ ...header, selected: false })))}
      style={{
        display: 'flex',
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}>
      {isDebugging && <ObservableDebugging items={[
        { label: 'throttling', value: throttling },
        { label: 'order', value: order },
        { label: 'orderBy', value: orderBy },
        { label: 'selectedIndex', value: selectedIndex },
        { label: 'sortedRows', value: sortedRows.length },
        { label: 'rows', value: rows.length },
        { label: 'startEnd', value: JSON.stringify(startEnd) },
        { label: 'pageSize', value: pageSize },
      ]}>
      </ObservableDebugging>}

      {headers && <ObservableHeader {...{
        options: headerOptions,
        gridTemplateColumns,
        setHeaders: setInnerHeaders,
        headers: innerHeaders,
        order,
        orderBy,
        onSelect,
        handleRequestSort,
        handleResetSort,
        rowOptions }} />}

      {rows.length > 0 && <ObservableContainer {...{ isScrollable, isAlternating }}>
        {rows.length > pageSize && startEnd.end > 0 && startEnd.start !== -1 && <ObservableInternalLoadMore isPointing onLoadMore={regressStartEnd} />}
        {sortedRows
          .filter(row => row.__index <= (selectedIndex === null ? (startEnd.end * pageSize) : Math.max(selectedIndex, startEnd.end * pageSize)))
          .map(row => <ObservableRow
            {...{ gridSpacing: gridTemplateColumns, minRows, rowOptions, isScrollable }}
            key={row.__index}
            id={idValue(row.__index)}
            style={{
              padding: rowOptions.padding,
              gridTemplateColumns: gridTemplateColumns,
              backgroundColor: (isSelectable && selectedIndex === row.__origIndex)
                ? theme.palette.augmentColor({ main: theme.palette.divider }).dark
                : '',
            }}
            className={classes.observableRow}
            index={row.__index}
            isRelevant={row.__index <= (selectedIndex === null ? (startEnd.end * pageSize) : Math.max(selectedIndex, startEnd.end * pageSize))}
            onClick={() => isSelectable && setSelectedIndex(selectedIndex === row.__origIndex ? null : row.__origIndex)}
          >
            {innerHeaders.filter(header => header.visible).map(header =>
              <React.Fragment key={`${header.property}_${header.label}_${header.tooltip}_${header.width}`}>
                {header.row(row)}
              </React.Fragment>)}
          </ObservableRow>)}
        {rows.length > pageSize && pageSize * startEnd.end -1 <  rows.length && <ObservableInternalLoadMore onLoadMore={advanceStartEnd} />}
        {/* {isInfinite && sortedRows.length - currentIndex < 25 && !!onLoadMore && <ObservableLoadMore {...{ onLoadMore }} />} */}

      </ObservableContainer>}

      {rows.length > pageSize && startEnd.end > 3 && <ObservableScrollTop {...{ selectedIndex }} />}

      {(innerHeaders.findIndex(header => header.selected) !== -1) && <div
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
        <div style={{
          gridColumnStart: innerHeaders.findIndex(header => header.selected) + 1,
          backgroundColor: '#EEE',
          margin: '0px -4px',
        }}/>
      </div>}
    </div>
}

const useStyles = makeStyles(() => ({
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
}))


export default ObservableGrid