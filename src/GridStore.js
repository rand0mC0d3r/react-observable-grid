import { createContext, useEffect, useState } from 'react'
import HeadlessProcessing from './HeadlessProcessing'

const Context = createContext()

function Grid({ rows, headers, children, ...props }) {

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
  const [innerRows, setInnerRows] = useState([])
  const [startEnd, setStartEnd] = useState({ start: -1, end: 1 })
  const [throttleLimit, setThrottleLimit] = useState(50)

  const [facts, setFacts] = useState(props['facts'] || {
    total: 1,
    filtered: 2,
    order: 'asc',
    orderBy: '',
    searchColumns: [],
    throttleLimit: 50,
    isDiscovering: false,
  })
  const [stats, setStats] = useState(props['facts'] || {
    total: '1',
    filtered: '2',
    order: 'asc',
    orderBy: '',
  })

  useEffect(() => setFacts(() => ({ ...facts, total: rows.length })), [rows])
  useEffect(() => setGridTemplateColumns(innerHeaders
    .filter(header => header.visible)
    .filter(header => header.noList)
    .map(header => header.width)
    .join(' c ')
  ), [innerHeaders])

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
        rows, headers, facts, stats,

        gridTemplateColumns,

        startEnd, setStartEnd,
        throttling, setThrottling,
        innerRows, setInnerRows,
        innerHeaders, setInnerHeaders,
        selectedIndex, setSelectedIndex,
        currentRow, setCurrentRow
    }}>
      <HeadlessProcessing {...{ rows, headers }} />
      {children}
    </Context.Provider>
  </div>
}

export default Context
export { Grid }
