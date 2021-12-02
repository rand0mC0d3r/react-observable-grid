import { useCallback, useEffect, useState } from 'react'
import ObservableContainer from './ObservableContainer'
import ObservableEmpty from './ObservableEmpty'
import ObservableHeader from './ObservableHeader'
import ObservableLoadMore from './ObservableLoadMore'
import ObservableRow from './ObservableRow'

const ObservableGrid =  ({
  headers,
  rows = [],
  keyPattern = () => { },
  gridSpacing,
  onLoadMore,

  rowRenderer = () => { },
  rowOptions = {
    padding: '20px'
  },

  emptyElement,

  isEmpty = true,
  isInfinite = false,
  isSelectable = true,
  isScrollable = true,
  isAlternating = true,
}) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const [throttling, setThrottling] = useState(false)

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [sortedRows, setSortedRows] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const updateGranularity = 10
  const minRows = 10
  const throttleLimit = 1000

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleResetSort = () => {
    setOrderBy('')
    setOrder('asc')
  }

  function descendingComparator(a, b, valueOrderBy) {
    const aVal = typeof (a[valueOrderBy]) === 'string'
      ? a[valueOrderBy].toLowerCase()
      : a[valueOrderBy]

    const bVal = typeof (b[valueOrderBy]) === 'string'
      ? b[valueOrderBy].toLowerCase()
      : b[valueOrderBy]
    if (bVal < aVal) { return -1 }
    if (bVal > aVal) { return 1 }

    return 0
  }

  function getComparator() {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const resultOrder = comparator(a[0], b[0])
      if (resultOrder !== 0) return resultOrder

      return a[1] - b[1]
    })

    return stabilizedThis.map((el) => el[0])
  }

  const callbackGetComparator = useCallback(getComparator, [order, orderBy])
  const callbackKeyPattern = useCallback(keyPattern, [keyPattern])

  useEffect(() => {
    if (rows.length > 0) {
      setThrottling(rows.length > throttleLimit)
      setSortedRows(stableSort(rows, callbackGetComparator()))
    }
  }, [rows, callbackGetComparator])

  useEffect(() => {
    if (String(gridSpacing).indexOf('minmax') === -1) {
      console.error(`Current ${gridSpacing} contains no minmax. Please use one`)
    }
  }, [gridSpacing])

  return isEmpty
    ? <ObservableEmpty>{emptyElement ? emptyElement : 'No data'}</ObservableEmpty>
    : <>
      {/* {throttling ? 'throttling' : 'not throttling'}
      selectedIndex: {selectedIndex} {JSON.stringify(rowOptions)} */}
      <ObservableHeader {...{ headers, gridSpacing, order, orderBy, handleRequestSort, handleResetSort, rowOptions }} />
      <ObservableContainer {...{ isScrollable, isAlternating }}>
        {sortedRows.map((row, index) => <ObservableRow
          {...{ gridSpacing, updateGranularity, index, rowOptions, currentIndex, isScrollable }}
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