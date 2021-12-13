import { makeStyles, useTheme } from '@material-ui/core/styles'
import { createNewSortInstance } from 'fast-sort'
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { ObservableInternalLoadMore } from '.'
import ObservableContainer from './ObservableContainer'
import ObservableDebugging from './ObservableDebugging'
import ObservableEmpty from './ObservableEmpty'
import ObservableHeader from './ObservableHeader'
import ObservableLoadMore from './ObservableLoadMore'
import ObservableRow from './ObservableRow'


const ObservableGrid =  ({
  headers,
  rows = [],
  keyPattern = () => { },
  onLoadMore,

  rowRenderer = () => { },
  rowOptions = {
    padding: '20px',
    template: 'repeat(1fr)'
  },

  emptyElement,

  isEmpty = true,
  isInfinite = false,
  isDebugging = true,
  isSelectable = true,
  isScrollable = true,
  isAlternating = true,
}) => {
  const theme = useTheme()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const [throttling, setThrottling] = useState(false)
  const [gridTemplateColumns, setGridTemplateColumns] = useState('')

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [sortedRows, setSortedRows] = useState([])

  const [pageSize, setPageSize] = useState(35)

  const [viewedRows, setViewedRows] = useState([])
  const [startEnd, setStartEnd] = useState({ start: -1, end: 1 })
  const [granularity, setGranularity] = useState(0)

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

  const callbackKeyPattern = useCallback(keyPattern, [keyPattern])

  useLayoutEffect(() => {

    function sortSort(order, rows) {
      return order === 'asc' ? naturalSort(rows).asc([r => r[orderBy]]) : naturalSort(rows).desc([r => r[orderBy]])
    }

    if (rows.length > 0) {
      setSortedRows(sortSort(order, rows.map((r, index) => { r.__origIndex = index; return r })).map((r, index) => { r.__index = index; return r }))
      setThrottling(rows.length >= throttleLimit)
      console.log('useEffect: sortingRows')
    }
  }, [rows, order, orderBy])

  useLayoutEffect(() => {
    const gridTemplateString = headers.map(header => header.width).join(' ')
    setGridTemplateColumns(gridTemplateString)
    if (gridTemplateString.indexOf('minmax') === -1) {
      console.error('Current grid-template-columns map contains no minmax(). Please use one otherwise the header will not be able to expand.')
    }
  }, [headers])

  const advanceStartEnd = () => {
    setStartEnd((startEnd) => ({ start: startEnd.start + 1, end: startEnd.end + 1 }))
  }
  const regressStartEnd = () => {
    console.log("dddss")
    setStartEnd((startEnd) => ({ start: startEnd.start - 1, end: startEnd.end - 1  }))
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
        { label: 'granularity', value: granularity },
        { label: 'startEnd', value: JSON.stringify(startEnd) },
        { label: 'pageSize', value: pageSize },
        // { label: 'MAX SIZE', value: rows.length / pageSize },
        // { label: 'direction', value: upperLimit > lowerLimit ? 'down' : 'up' },
      ]}>
        <div>{throttling ? 'throttling' : 'not throttling'}</div>
        <div>selectedIndex: {selectedIndex} {JSON.stringify(rowOptions)}</div>
      </ObservableDebugging>}

      <ObservableHeader {...{ gridTemplateColumns, headers, order, orderBy, handleRequestSort, handleResetSort, rowOptions }} />

      <ObservableContainer {...{ isScrollable, isAlternating }}>
        {rows.length > pageSize && startEnd.start > 0 && <ObservableInternalLoadMore isPointing onLoadMore={regressStartEnd} />}
        <style>{`
          .observableGrid-base {
            min-height: 44px;
          }
          .observableGrid {
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
          }
        `}</style>
        {sortedRows
          // .filter(row => row.__index <= startEnd.end * pageSize && row.__index >= startEnd.start  * pageSize)
          // .filter(row => row.__index <= startEnd.end * pageSize)
          .map(row => <ObservableRow
            {...{ gridSpacing: gridTemplateColumns, minRows, updateGranularity: viewedRows.length, rowOptions, isScrollable }}
            key={callbackKeyPattern(row)}
            innerIndex={row.__index}
            innerOriginalIndex={row.__origIndex}
            isRelevant={row.__index <= startEnd.end * pageSize && row.__index >= startEnd.start  * pageSize}
            // isRelevant={row.__index >= startEnd.start  * pageSize}
            isSelected={isSelectable && selectedIndex === row.__origIndex}
            onClick={() => isSelectable && setSelectedIndex(selectedIndex === row.__origIndex ? null : row.__origIndex)}
        >
          {rowRenderer(row, row.__index)}
          </ObservableRow>)}

        {rows.length > pageSize && pageSize * startEnd.end -1 <  rows.length && <ObservableInternalLoadMore onLoadMore={advanceStartEnd} />}
        {/* {isInfinite && sortedRows.length - currentIndex < 25 && !!onLoadMore && <ObservableLoadMore {...{ onLoadMore }} />} */}
      </ObservableContainer>
    </>
}

export default ObservableGrid