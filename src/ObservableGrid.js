import { makeStyles } from '@material-ui/core/styles'
import { createNewSortInstance } from 'fast-sort'
import React, { Suspense, useEffect, useState } from 'react'
import Container from './Container'
import ObservableEmpty from './ObservableEmpty'
import ObservableHeader from './ObservableHeader'
import ObservableInternalLoadMore from './ObservableInternalLoadMore'
import ObservableRowList from './ObservableRowList'
import Processing from './Processing'

const ProgressBar = React.lazy(() => import('./ProgressBar'));
const Debugging = React.lazy(() => import('./Debugging'));
const Columns = React.lazy(() => import('./Columns'));
const ActionButtons = React.lazy(() => import('./ActionButtons'));

const ObservableGrid =  ({
  headers,
  rows,
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

  isOmittingColumns = [],
  isColumned= false,
  isClearingOnBlur = true,
  // isInfinite = false,
  isUpdatingUrl = false,
  isGrid = false,
  isDebugging = false,
  isSelectable = true,
  isScrollable = true,
  isHeaderHidden = false,
  isAlternating = true,
  isDiscovering = false,

  hasProgressBar = false,
  hasFloatingActions = false,
}) => {
  const classes = useStyles()

  const [searchColumns, setSearchColumns] = useState([])
  const [order, setOrder] = useState('asc')
  const [innerHeaders, setInnerHeaders] = useState([])
  const [discovering, setDiscovering] = useState(false)
  const [orderBy, setOrderBy] = useState('')
  const [url, setUrl] = useState('')
  const [currentRow, setCurrentRow] = useState(-1)
  const [isDirty, setIsDirty] = useState(false)
  const [throttling, setThrottling] = useState(false)
  const [gridTemplateColumns, setGridTemplateColumns] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [elementsRendered, setElementsRendered] = useState([0, 0])
  const [sortedRows, setSortedRows] = useState([])
  const [startEnd, setStartEnd] = useState({ start: -1, end: 1 })
  const [throttleLimit, setThrottleLimit] = useState(50)

  // useEffect(() => {
  //   console.log('useEffect', isDebugging)
  // }, [isDebugging])


  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
  const naturalSort = createNewSortInstance({ comparer: collator.compare })
  const updateRenderedElements = () => setElementsRendered(() => [document.getElementsByTagName('*').length, Number(calculateGridElements())])
  const advanceStartEnd = () => setStartEnd((startEnd) => ({ start: startEnd.start + 1, end: startEnd.end + 1 }))
  const regressStartEnd = () => setStartEnd(() => ({ start: - 1, end:  1  }))
  const onSelect = (property) => setInnerHeaders(innerHeaders.map(header => ({ ...header, selected: header.property === property ? true : false })))
  const onDeSelect = (property) => setInnerHeaders(innerHeaders.map(header => ({ ...header, selected: header.property === property ? false : false })))

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

  const clearOnBlur = () => {
    if (isClearingOnBlur) {
      // setInnerHeaders(() => innerHeaders.map(header => ({ ...header, selected: false })))
      setCurrentRow(null)
    }
  }

  useEffect(() => {
    if (isDebugging) { updateRenderedElements() }
    setUrl(`
      ?orderBy=${orderBy}
      &order=${order}
      &selectedIndex=${selectedIndex}
      &searchColumns=${JSON.stringify(searchColumns)}
      &extraFilters=${JSON.stringify(innerHeaders.filter(ih => ih.extraFilters).map(ih => ({ label: ih.label, variable: JSON.stringify(ih.variable) })))}
      &visibleHeaders=${innerHeaders.filter(header => !!header.visible).map(header => header.property)}`)
  }, [orderBy, order, innerHeaders, searchColumns, selectedIndex, isDebugging])

  useEffect(() => setGridTemplateColumns(innerHeaders.filter(header => header.visible).map(header => header.width).join(' ')), [innerHeaders])

  return <>
    <Processing {...{
      rows, headers, orderBy, order, searchColumns, throttleLimit, isDiscovering, isOmittingColumns,
      setProcessedRows: setSortedRows, setProcessedHeaders: setInnerHeaders, setSelectedIndex, setThrottling, setDiscovering, setStartEnd,
    }} />
    <div id="observable-grid" className={`${className} ${classes.root}`} onMouseLeave={clearOnBlur}>
      {!isHeaderHidden && innerHeaders.length > 0 && <ObservableHeader {...{
        options: headerOptions,
        rows: sortedRows,
        originalRows: rows,
        setInnerHeaders,
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
        rowOptions }}
      />}

      {rows.length > 0
        ? <Container {...{ isScrollable, isDirty, isAlternating, isGrid }}>
            {(throttling && sortedRows.length > pageSize && startEnd.end > 0 && startEnd.start !== -1) &&
              <ObservableInternalLoadMore isPointing onLoadMore={regressStartEnd} />}
            {sortedRows && <ObservableRowList {...{ rows: sortedRows, setCurrentRow, currentRow, throttling, setSelectedIndex, rowOptions, gridTemplateColumns, selectedIndex, startEnd, pageSize, innerHeaders}} />}
            {throttling && rows.length > pageSize && pageSize * startEnd.end - 1 < rows.length && <ObservableInternalLoadMore onLoadMore={advanceStartEnd} />}
            {/* {isInfinite && sortedRows.length - currentIndex < 25 && !!onLoadMore && <ObservableLoadMore {...{ onLoadMore }} />} */}
          </Container>
        : <ObservableEmpty>{emptyElement}</ObservableEmpty>}

      <Suspense fallback={<></>}>
        {isDebugging && <Debugging {...{
          items: [
            { label: 'throttling', value: throttling ? 'yes' : 'no' },
            { label: 'throttleLimit', value: throttleLimit },
            { label: 'order', value: order },
            { label: 'orderBy', value: orderBy },
            { label: 'selectedIndex', value: selectedIndex },
            { label: 'sortedRows', value: sortedRows.length },
            { label: 'canvasDrawing', value: !throttling && canvasDrawing ? 'yes' : 'no' },
            { label: 'rows', value: rows.length },
            { label: 'startEnd', value: JSON.stringify(startEnd) },
            { label: 'pageSize', value: pageSize },
            { label: 'totalElements', value: `${elementsRendered[0]} (${elementsRendered[1]})` },
            { label: 'url', value: url },
          ]
        }} />}
        {!isGrid && isColumned && <Columns {...{
              rowOptions,
              gridTemplateColumns,
              innerHeaders
            }} />}
        {hasProgressBar && <ProgressBar {...{
          currentRow,
          count: sortedRows.length,
          selectedIndex
        }} />}
        {hasFloatingActions && rows.length > 0 && <ActionButtons {...{
          filtered: sortedRows.length,
          total: rows.length,
          customActions,
          selectedIndex,
          isAtTop: rows.length > pageSize && startEnd.end >= 2
        }} />}
      </Suspense>
    </div>
  </>
}

const useStyles = makeStyles(() => ({
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