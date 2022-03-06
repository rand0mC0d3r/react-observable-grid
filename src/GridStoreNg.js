import { createNewSortInstance } from 'fast-sort'
import { createContext, useEffect, useState } from 'react'
import HeadlessProcessing from './HeadlessProcessing'

const Context = createContext()

const Grid = ({ data, grid, global, children, ...props }) => {
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
  const naturalSort = createNewSortInstance({ comparer: collator.compare })

  const [_data, set_Data] = useState([])
  const [_gridTemplateColumns, set_GridTemplateColumns] = useState('')


  // const [rows, setRows] = useState(props['rows'] || [])
  // const [headers, setHeaders] = useState(props['headers'] || [])
  // const [settings, setSettings] = useState(props['settings'] || {
  //   isCollapsed: false,
  //   canSplitter: true,
  //   inverseMarkers: false,
  //   allowRightClick: false,
  //   markerColor: 'textPrimary',
  //   debugMode: false,
  // })
  // const [_data, set_Data] = useState('asc')



  const [stats, setStats] = useState(props['facts'] || {
    total: '1',
    filtered: '2',
    order: 'asc',
    orderBy: '',
    sort: {}
  })

  const sortData = (data, column, direction) => (column === '' ? data : direction === 'asc'
    ? naturalSort(data).asc([item => item[column]])
    : naturalSort(data).desc([item => item[column]]))

  useEffect(() => {
    setStats(stats => ({ ...stats, total: data.length }))

    set_Data(sortData(data, stats.sort.column, stats.sort.direction))
  }, [data])

  useEffect(() => {
    set_GridTemplateColumns(grid
      .filter(gridItem => gridItem.header.visible)
      .map(gridItem => gridItem.header.width)
      .join(' '))
  }, [grid])

  useEffect(() => {
    console.log(data)
  }, [data])

  useEffect(() => {
    setStats(stats => ({
      ...stats, sort: {
        ...stats.sort,
        direction: global.sort.initialDirection || 'asc',
        column: global.sort.initialColumn || '',
      }
      }))
  }, [global])



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

  // useEffect(() => {
  //   setStats(stats => { ...stats, global })
  // }, [grid])
  // useEffect(() => setGridTemplateColumns(innerHeaders.filter(header => header.visible).map(header => header.width).join(' ')), [innerHeaders])

  return <div style={{
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    overflow: 'hidden'
  }}>
    <Context.Provider
      id="provider"
      value={{
        data: _data,
        gridTemplateColumns: _gridTemplateColumns,
        grid, stats, global,

        onSort
      }}>
      {children}
    </Context.Provider>
  </div>
}

export default Context
export { Grid }
