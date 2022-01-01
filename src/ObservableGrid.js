import { makeStyles, useTheme } from '@material-ui/core/styles'
import { createNewSortInstance } from 'fast-sort'
import React, { Suspense, useEffect, useState } from 'react'
import ActionButtons from './ActionButtons'
import ObservableContainer from './ObservableContainer'
// import ObservableDebugging from './ObservableDebugging'
import ObservableEmpty from './ObservableEmpty'
import ObservableHeader from './ObservableHeader'
import ObservableInternalLoadMore from './ObservableInternalLoadMore'
// import ObservableProgress from './ObservableProgress'
import ObservableRowList from './ObservableRowList'

const ProgressBar = React.lazy(() => import('./ProgressBar'));
const Debugging = React.lazy(() => import('./Debugging'));

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
  isColumned= true,
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
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)

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
  const [customFilteredRows, setCustomFilteredRows] = useState([])
  const [sortedRows, setSortedRows] = useState([])
  const [filteredRows, setFilteredRows] = useState([])
  const [startEnd, setStartEnd] = useState({ start: -1, end: 1 })
  const [throttleLimit, setThrottleLimit] = useState(50)

  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
  const naturalSort = createNewSortInstance({ comparer: collator.compare })
  const updateRenderedElements = () => setElementsRendered(() => [document.getElementsByTagName('*').length, Number(calculateGridElements())])
  const advanceStartEnd = () => setStartEnd((startEnd) => ({ start: startEnd.start + 1, end: startEnd.end + 1 }))
  const regressStartEnd = () => setStartEnd(() => ({ start: - 1, end:  1  }))
  const onSelect = (property) => setInnerHeaders(innerHeaders.map(header => ({ ...header, selected: header.property === property ? true : false })))
  const onDeSelect = (property) => setInnerHeaders(innerHeaders.map(header => ({ ...header, selected: header.property === property ? false : false })))

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
      // setCurrentRow(null)
    }
  }

  useEffect(() => {
    setIsDirty(() => true)
    setCustomFilteredRows(() => (headers || []).filter(header => header.customFilter || header.extraFilters).reduce((acc, value) => {
      let result = acc
      if (value.customFilter) { result = value.customFilter(acc) }
      if (value.extraFilters) { value.extraFilters.forEach(filter => { result = filter.func(result) }) }
      return result
    }, rows.map((row, index) => ({ ...row, __origIndex: index }))))
    setSelectedIndex(() => null)
    if (!headers) { setDiscovering(() => true) }
  }, [rows, headers])

  useEffect(() => {
    const sensitiveSearch = (sensitive, cr, key, term) => sensitive ? cr[key].includes(term) : cr[key].toLowerCase().includes(term.toLowerCase())
    const searchByRegex = (regex, property) => regex.test(property)

    setFilteredRows(() => searchColumns.length > 0
      ? customFilteredRows.filter(cr => searchColumns.filter(searchColumn => searchColumn?.term.length > 0
        ? searchColumn.isRegex
          ? searchByRegex(new RegExp(searchColumn.term, `${searchColumn.isSensitive ? '' : 'i'}`), cr[searchColumn.key])
          : sensitiveSearch(searchColumn.isSensitive, cr, searchColumn?.key, searchColumn?.term)
        : true).length === searchColumns.length)
      : customFilteredRows)
  }, [customFilteredRows, searchColumns])

  useEffect(() => {
    const orderedRows = orderBy === ''
      ? filteredRows.map((r, index) => ({ ...r, __index: index }))
      : order === 'asc'
        ? naturalSort(rows).asc([r => r[orderBy]])
        : naturalSort(rows).desc([r => r[orderBy]]).map((r, index) => ({ ...r, __index: index }))

    setSortedRows(() => orderedRows)
    setStartEnd(() => ({ start: -1, end: 1 }))
    setThrottling(() => orderedRows.length - 1 >= throttleLimit)
    setIsDirty(() => false)
  }, [filteredRows, order, orderBy])

  useEffect(() => {
    if (discovering || isDiscovering) {
      const watchedHeaders = headers?.map(header => ([
        header.property,
        ...header.secondaryHeaders?.map(sh => sh.property) || [],
        ...header.preHeaders?.map(sh => sh.property) || [],
        ...header.postHeaders?.map(sh => sh.property) || [],
      ])).flat() || []
      const missingColumns = Object.keys(rows[0]).filter(knownColumn => !watchedHeaders.includes(knownColumn))
      const newHeaders =  [
        ...(headers || []).filter(prev => !missingColumns.includes(prev.property)),
        ...missingColumns.map(missingColumn => {
          let minMax = '1fr'
          let averageLength = 0
          rows.filter((_, i) => i < 10).forEach(r => typeof r[missingColumn] === 'string'
            ? averageLength = (r[missingColumn].length + averageLength) / 2
            : averageLength = (100 + averageLength) / 2
          )
          if (averageLength > 75) { minMax = '3fr' }
          else if (averageLength > 50) { minMax = '2fr' }
          else if (averageLength < 10) { minMax = '0.5fr' }
          return {
            label: missingColumn[0].toUpperCase() + missingColumn.substring(1),
            property: missingColumn,
            noSearch: !rows.filter((d, i) => i < 10).map(row => row[missingColumn]).every(d => typeof d === 'string'),
            suggestions: (data) => data.filter((d, i) => i < 10).map(row => row[missingColumn]).every(d => typeof d === 'string') || false
              ? Array.from(new Set(data.map(row => row[missingColumn]).flat())).sort((a, b) => a.length - b.length).reverse().slice(0, 10)
              : [],
            width: `minmax(${Object.keys(rows[0]).length * 10 - 10}px, ${minMax})`
          }
        }),
      ]
      setInnerHeaders(() => newHeaders.map(header => ({ ...header, selected: false, visible: header.visible || true })).filter(header => !isOmittingColumns.includes(header.property)))
    } else {
      setInnerHeaders(() => (headers || []).map(header => ({ ...header, selected: false, visible: header.visible || true })).filter(header => !isOmittingColumns.includes(header.property)))
    }
  }, [rows, headers, isDiscovering, discovering])

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
      &visibleHeaders=${innerHeaders.filter(header => !!header.visible).map(header => header.property)}`)
  }, [orderBy, order, innerHeaders, searchColumns, selectedIndex, isDebugging])

  useEffect(() => setGridTemplateColumns(innerHeaders.filter(header => header.visible).map(header => header.width).join(' ')), [innerHeaders])

  return <div id="observable-grid" className={`${className} ${classes.root}`} onMouseLeave={clearOnBlur}>
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
      {innerHeaders.filter(ih => ih.visible).map((innerHeader, i) => <div key={`${innerHeader.property}-${innerHeader.label || ''}`}
        className={`${classes.observableColumn} ${isColumned && classes.observableColumnRight}`}
      />)}
    </div>}

    {rows.length > 0
      ? <>
          <ObservableContainer {...{ isScrollable, isDirty, isAlternating, isGrid }}>
          {(throttling && sortedRows.length > pageSize && startEnd.end > 0 && startEnd.start !== -1) &&
            <ObservableInternalLoadMore isPointing onLoadMore={regressStartEnd} />}
          {sortedRows && <ObservableRowList {...{ rows: sortedRows, setCurrentRow, currentRow, throttling, setSelectedIndex, rowOptions, gridTemplateColumns, selectedIndex, startEnd, pageSize, innerHeaders}} />}
          {throttling && rows.length > pageSize && pageSize * startEnd.end - 1 < rows.length && <ObservableInternalLoadMore onLoadMore={advanceStartEnd} />}
          {/* {isInfinite && sortedRows.length - currentIndex < 25 && !!onLoadMore && <ObservableLoadMore {...{ onLoadMore }} />} */}
        </ObservableContainer>
        <ActionButtons {...{ filtered: sortedRows.length, total: rows.length, customActions, selectedIndex, isAtTop: rows.length > pageSize && startEnd.end >= 2 }} />
      </>
      : <ObservableEmpty>{emptyElement}</ObservableEmpty>}

      <Suspense fallback={<></>}>
        {isDebugging && <Debugging items={debugItems} />}
        {hasProgressBar && <ProgressBar {...{ currentRow, rowsLength: sortedRows.length, selectedIndex }} />}
      </Suspense>
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