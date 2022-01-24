import { createContext, useEffect, useState } from 'react'
import Processing from './Processing'

const Context = createContext()

function GridProvider({ rows, headers, children, ...props }) {

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
  const [facts, setFacts] = useState(props['facts'] || {
    total: 1,
    filtered: 2,
    selectedIndex: 3,
    order: 'asc',
    orderBy: '',
  })

  useEffect(() => {
    console.log(rows)
    setFacts(() => ({ ...facts, total: rows.length}))
  }, [rows])

  return <>
    <Processing {...{ rows, headers }} />
      {/* // rows, headers, orderBy, order, searchColumns, throttleLimit, isDiscovering, isOmittingColumns, */}
      {/* // setProcessedRows: setSortedRows, setProcessedHeaders: setInnerHeaders, setSelectedIndex, setThrottling, setDiscovering, setStartEnd, */}
    {/* }} /> */}
    <Context.Provider
    id="provider"
    value={{
      rows, headers, facts
    }}>
      {children}
    </Context.Provider>
  </>
}

export default Context
export { GridProvider }
