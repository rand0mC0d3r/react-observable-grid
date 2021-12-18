import { useTheme } from '@material-ui/core/styles'
import { createNewSortInstance } from 'fast-sort'
import React, { useEffect, useState } from 'react'
import ObservableInternalLoadMore from './ObservableInternalLoadMore'
import ObservableContainer from './ObservableContainer'
import ObservableDebugging from './ObservableDebugging'
import ObservableEmpty from './ObservableEmpty'
import ObservableHeader from './ObservableHeader'
// import ObservableLoadMore from './ObservableLoadMore'
import ObservableRow from './ObservableRow'



const ObservableGrid =  ({
  headers,
  rows = [],
  uniqueId = 'test',
  // keyPattern = () => { },
  // onLoadMore,
  rowRenderer = () => { },
  rowOptions = {
    padding: '20px',
    template: 'repeat(1fr)'
  },
  headerOptions = {
    ascArrow: null,
    descArrow: null,
    padding: null,
  },
  emptyElement,


  isEmpty = true,
  // isInfinite = false,
  isDebugging = false,
  isSelectable = true,
  isScrollable = true,
  isAlternating = true,
}) => {
  const theme = useTheme()

  const [order, setOrder] = useState('asc')
  const [cachedRows, setCachedRows] = useState([])
  const [innerHeaders, setInnerHeaders] = useState([])
  const [orderBy, setOrderBy] = useState('')
  const [throttling, setThrottling] = useState(false)
  const [gridTemplateColumns, setGridTemplateColumns] = useState('')

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [sortedRows, setSortedRows] = useState([])
  const [startEnd, setStartEnd] = useState({ start: -1, end: 1 })

  const pageSize = 35
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
    setInnerHeaders(headers.map(header => ({ ...header, visible: header.visible || true })))
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

  return isEmpty
    ? <ObservableEmpty>{emptyElement ? emptyElement : 'No data'}</ObservableEmpty>
    : <>
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
        handleRequestSort,
        handleResetSort,
        rowOptions }} />}

      {rows.length > 0 && <ObservableContainer {...{ isScrollable, isAlternating }}>
        {rows.length > pageSize && startEnd.end > 0 && <ObservableInternalLoadMore isPointing onLoadMore={regressStartEnd} />}
        <style>{`
          .observableGrid {
            min-height: 44px;
            align-self: stretch;
            break-inside: avoid;
            font-size: 12px;
            align-items: center;
            grid-column-gap: 16px;
            grid-row-gap: 16px;
            display: grid;
            padding: ${rowOptions.padding};
            grid-template-columns: ${gridTemplateColumns};
          }
          .observableGrid:hover {
            background-color: ${theme.palette.augmentColor({ main: theme.palette.divider }).light};
          }
          .observableGrid-selected {
            background-color: ${theme.palette.augmentColor({ main: theme.palette.divider }).main} !important;
          }import ObservableDebugging from '../sample/src/components/components/ObservableDebugging';

        `}</style>
        {sortedRows
          .filter(row => row.__index <= startEnd.end * pageSize)
          .map(row => <ObservableRow
            {...{ gridSpacing: gridTemplateColumns, minRows, rowOptions, isScrollable }}
            key={row.__index}
            index={row.__index}
            isRelevant={row.__index <= startEnd.end * pageSize}
            isSelected={isSelectable && selectedIndex === row.__origIndex}
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
    </>
}

export default ObservableGrid