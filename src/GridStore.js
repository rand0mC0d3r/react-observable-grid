import { createNewSortInstance } from 'fast-sort'
import { createContext, useEffect, useState } from 'react'

const Context = createContext()

const Grid = ({ data, grid, global, children, ...props }) => {
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
  const naturalSort = createNewSortInstance({ comparer: collator.compare })

  const [_data, set_Data] = useState([])
  const [_headerTemplateColumns, set_HeaderTemplateColumns] = useState('')
  const [_gridTemplateColumns, set_GridTemplateColumns] = useState('')

  const _defaultWidth = '1fr'

  const jsonPathToValue = (jsonData, path) => {
    if (!(jsonData instanceof Object) || typeof (path) === "undefined") {
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
    return column === ''
      ? data
      : direction === 'asc'
        ? naturalSort(data).asc([item => jsonPathToValue(item, column)])
        : naturalSort(data).desc([item => jsonPathToValue(item, column)])
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
    const gridColumns = grid
      .filter(gridItem => gridItem?.header?.visible === undefined  ? true : gridItem?.header?.visible)
      .filter(gridItem => !gridItem?.header?.noColumn)
      .map(gridItem => gridItem?.header?.width || _defaultWidth)
      .join(' ')
    set_HeaderTemplateColumns(gridColumns)
    set_GridTemplateColumns(gridColumns)
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
      {children}
    </Context.Provider>
  </div>
}

export default Context
export { Grid }
