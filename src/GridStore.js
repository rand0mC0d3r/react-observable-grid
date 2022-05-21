import { createNewSortInstance } from 'fast-sort'
import React, { createContext, useEffect, useRef, useState } from 'react'

const Context = createContext()

const wrapperStyle = {
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  inset: '0px',
  flexDirection: 'column',
  overflow: 'hidden'
}

const fallbackStyle = {
  alignSelf: 'stretch',
  flex: '1 1 auto',
  display: 'flex',
  color: '#888',
  justifyContent: 'center',
  alignItems: 'center',
}

const Grid = ({ data, grid, emptyComponent, global, children, ...props }) => {
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
  const naturalSort = createNewSortInstance({ comparer: collator.compare })
  let defaultHeight = 0

  const [_data, set_Data] = useState([])
  const [uniqueId, setUniqueId] = useState(`rog-${(Math.random() + 1).toString(36).substring(7)}`)
  const [_noGrid, set_noGrid] = useState(false)
  const [_headerTemplateColumns, set_HeaderTemplateColumns] = useState('')
  const [headerTemplate, setHeaderTemplate] = useState({ columns: [], css: null})
  const [_gridTemplateColumns, set_GridTemplateColumns] = useState('')
  const [_rowHeight, set_RowHeight] = useState(0)
  const [_earliestIndex, set_EarliestIndex] = useState(0)
  const [_latestIndex, set_LatestIndex] = useState(0)
  const visibleIndexes = useRef([])
  const averageHeight = useRef()

  const _defaultWidth = '1fr'
  const initialHeight = 100

  const jsonPathToValue = (jsonData, path) => {
    if (!(jsonData instanceof Object) || typeof (path) === "undefined" || path === null) {
      throw "Not valid argument:jsonData:" + jsonData + ", path:" + path;
    }
      path = path.replace(/\[(\w+)\]/g, '.$1');
      path = path.replace(/^\./, '');
      var pathArray = path.split('.');
      for (var i = 0, n = pathArray.length; i < n; ++i) {
        var key = pathArray[i];
        if (key in jsonData) {
          if (jsonData[key] !== null) {
            jsonData = jsonData[key];
          } else {
            return null;
          }
        } else {
          return key;
        }
      }
      return jsonData;
  }

  const [stats, setStats] = useState(props['facts'] || {
    total: '1',
    filtered: '2',
    order: 'asc',
    defaultHeight: 100,
    determinedHeight: 100,
    orderBy: '',
    sort: {
      direction: 'asc',
      column: ''
    }
  })

  const sortData = (data, column, direction) => {
    const extractPath = (item, column) => {
      const result = jsonPathToValue(item, column)
      return typeof result === 'object' ? JSON.stringify(result) : result
    }
    const naturallySorted = column !== '' && naturalSort(data)
    return column === ''
      ? data
      : direction === 'asc'
        ? naturallySorted.asc([item => extractPath(item, column)])
        : naturallySorted.desc([item => extractPath(item, column)])
  }

  const updateDeterminedHeight = (height) => {
    if (!!height && Math.abs(_rowHeight - height) < 25 && height > 0) {
      set_RowHeight(height)
    }
  }

  // useEffect(() => {
  //   averageHeight.current = '101px'
  // }, [])

  useEffect(() => {
    setStats(prevStats => ({
      ...prevStats, sort: {
        ...prevStats.sort,
        total: data?.length || 0,
        direction: global?.sort?.initialDirection || 'asc',
        column: global?.sort?.initialColumn || '',
      }
      }))
    set_Data(() => sortData(data, stats.sort.column, stats.sort.direction)
      .map(dataItem => ({
      ...dataItem,
      __signature: Object.values(dataItem).filter(d => typeof d === 'string').join("").replace(/[^a-z0-9]/gi, '')
    })))
  }, [data, global])

  useEffect(() => {
    if (grid === undefined && !!data?.length > 0) {
      const gridColumns = Object.keys(Object
          .values(data)
          .sort((a, b) => Object.keys(b).length - Object.keys(a).length)[0])
          .filter(key => key !== '__signature')

      setHeaderTemplate(() => ({
        columns: gridColumns,
        css: gridColumns.map(() => _defaultWidth).join(' ')
      }))
      set_HeaderTemplateColumns(gridColumns.map(() => _defaultWidth).join(' '))
      set_GridTemplateColumns(gridColumns.map(() => _defaultWidth).join(' '))
    }
  }, [data, grid])

  useEffect(() => {
    if (grid) {
      const gridColumns = grid
        .filter(gridItem => gridItem?.header?.visible === undefined  ? true : gridItem?.header?.visible)
        .filter(gridItem => !gridItem?.header?.noColumn)
        .map(gridItem => gridItem?.header?.width || _defaultWidth)
        .join(' ')
      set_HeaderTemplateColumns(gridColumns)
      set_GridTemplateColumns(gridColumns)
    }
  }, [grid])

  const onSort = (key) => {
    setStats(stats => ({
      ...stats, sort: {
        ...stats.sort,
        direction: stats.sort.direction === 'asc' ? 'desc' : 'asc',
        column: key,
      }
    }))
    set_Data(sortData(data, key, stats.sort.direction))
  }

  const gatherIndexes = (index, add = true) => {
    // if (index > 0) {
      console.log(index)
      // set_VisibleIndexes([..._visibleIndexes, index])
      // console.log(_visibleIndexes)
    // }

    // set_VisibleIndexes([...new Set([..._visibleIndexes, index])].sort())
    // set_VisibleIndexes([..._visibleIndexes, index])
  }

  useEffect(() => {
    console.log(visibleIndexes.current)
  }, [visibleIndexes])

  const emptyFallback = <>{emptyComponent
    ? emptyComponent
    : <div style={fallbackStyle}>Missing data</div>}
  </>

  return <div id={uniqueId} style={wrapperStyle}>
    <Context.Provider
      id="provider"
      value={{
        uniqueId,
        data: _data,
        rowHeight: _rowHeight,

        visibleIndexes,
        averageHeight,
        initialHeight,

        headerTemplate,

        gridTemplateColumns: _gridTemplateColumns,
        headerTemplateColumns: _headerTemplateColumns,
        grid, stats, global, onSort, updateDeterminedHeight
      }}>
      {_data ? children ? children : emptyFallback : emptyFallback}
    </Context.Provider>
  </div>
}

export default Context
export { Grid }
