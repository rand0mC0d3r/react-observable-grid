import { createNewSortInstance } from 'fast-sort'
import { createContext, useEffect, useState } from 'react'

const Context = createContext()

const Grid = ({ data, grid, emptyComponent, global, children, ...props }) => {
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
  const naturalSort = createNewSortInstance({ comparer: collator.compare })

  const [_data, set_Data] = useState([])
  const [_noGrid, set_noGrid] = useState(false)
  const [_headerTemplateColumns, set_HeaderTemplateColumns] = useState('')
  const [_gridTemplateColumns, set_GridTemplateColumns] = useState('')

  const _defaultWidth = '1fr'

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

  useEffect(() => {
    setStats(prevStats => ({
      ...prevStats, sort: {
        ...prevStats.sort,
        total: data?.length || 0,
        direction: global?.sort?.initialDirection || 'asc',
        column: global?.sort?.initialColumn || '',
      }
      }))
    set_Data(sortData(data, stats.sort.column, stats.sort.direction))
  }, [data, global])

  useEffect(() => {
    if (_noGrid && !!data?.length) {
      const gridColumns = [...new Set(data.map(item => Object.keys(item).map(key => key)).flat())]
        .map(() => _defaultWidth)
        .join(' ')
      set_HeaderTemplateColumns(gridColumns)
      set_GridTemplateColumns(gridColumns)
    }
  }, [data, _noGrid])

  useEffect(() => {
    if (grid) {
      const gridColumns = grid
        .filter(gridItem => gridItem?.header?.visible === undefined  ? true : gridItem?.header?.visible)
        .filter(gridItem => !gridItem?.header?.noColumn)
        .map(gridItem => gridItem?.header?.width || _defaultWidth)
        .join(' ')
      set_noGrid(false)
      set_HeaderTemplateColumns(gridColumns)
      set_GridTemplateColumns(gridColumns)
    } else {
      set_noGrid(true)
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

  const emptyFallback = <>{emptyComponent
          ? emptyComponent
          : <div style={{
              alignSelf: 'stretch',
              flex: '1 1 auto',
              display: 'flex',
              color: '#888',
              justifyContent: 'center',
              alignItems: 'center',
          }}>Missing data</div>}
        </>

  return <div style={{
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%',
    inset: '0px',
    flexDirection: 'column',
    overflow: 'hidden'
  }}>
    <Context.Provider
      id="provider"
      value={{
        data: _data,
        gridTemplateColumns: _gridTemplateColumns,
        headerTemplateColumns: _headerTemplateColumns,
        grid, stats, global, onSort
      }}>
      {_data ? children ? children : emptyFallback : emptyFallback}
    </Context.Provider>
  </div>
}

export default Context
export { Grid }
