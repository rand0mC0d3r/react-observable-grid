import { createNewSortInstance } from 'fast-sort'
import { useCallback, useEffect, useState } from 'react'
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
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const [throttling, setThrottling] = useState(false)
  const [gridTemplateColumns, setGridTemplateColumns] = useState('')

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [sortedRows, setSortedRows] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0) // TODO: fix index to be bound to rows

  const updateGranularity = 10
  const minRows = 10
  const throttleLimit = 500
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

  useEffect(() => {
    if (rows.length > 0) {
      setSortedRows(order === 'asc'
        ? naturalSort(rows).asc([r => r[orderBy]])
        : naturalSort(rows).desc([r => r[orderBy]]))
    }
  }, [rows, order, orderBy])

  useEffect(() => {
    const gridTemplateString = headers.map(header => header.width).join(' ')
    setGridTemplateColumns(gridTemplateString)
    if (gridTemplateString.indexOf('minmax') === -1) {
      console.error('Current grid-template-columns map contains no minmax(). Please use one otherwise the header will not be able to expand.')
    }
  }, [headers])

  return isEmpty
    ? <ObservableEmpty>{emptyElement ? emptyElement : 'No data'}</ObservableEmpty>
    : <>
      {isDebugging && <ObservableDebugging items={[
        { label: 'throttling', value: throttling },
        { label: 'order', value: order },
        { label: 'orderBy', value: orderBy },
        { label: 'selectedIndex', value: selectedIndex },
        { label: 'sortedRows', value: sortedRows.length },
      ]}>
        <div>{throttling ? 'throttling' : 'not throttling'}</div>
        <div>selectedIndex: {selectedIndex} {JSON.stringify(rowOptions)}</div>
      </ObservableDebugging>}

      <ObservableHeader {...{ gridTemplateColumns, headers, order, orderBy, handleRequestSort, handleResetSort, rowOptions }} />
      <ObservableContainer {...{ isScrollable, isAlternating }}>
        {sortedRows.map((row, index) => <ObservableRow
          {...{ gridSpacing: gridTemplateColumns, updateGranularity, index, rowOptions, currentIndex, isScrollable }}
          key={callbackKeyPattern(row)}
          isSelected={isSelectable && selectedIndex === index}
          onClick={() => isSelectable && setSelectedIndex(selectedIndex === index ? null : index)}
          isViewed={(vIndex) => Math.max(minRows, setCurrentIndex(vIndex))}
        >
          {rowRenderer(row, index)}
        </ObservableRow>)}
        {isInfinite && sortedRows.length - currentIndex < 25 && !!onLoadMore && <ObservableLoadMore {...{ onLoadMore }} />}
      </ObservableContainer>
    </>
}

export default ObservableGrid