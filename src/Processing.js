import { createNewSortInstance } from 'fast-sort'
import React, { useEffect, useState } from 'react'


const Processing =  ({
  headers,
  rows,
	orderBy,
	order,
	searchColumns,

	isDiscovering,
	isOmittingColumns,

	setProcessedRows,
	setProcessedHeaders,
}) => {

  const [innerHeaders, setInnerHeaders] = useState([])
  const [discovering, setDiscovering] = useState(false)
  const [url, setUrl] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const [throttling, setThrottling] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [sortedRows, setSortedRows] = useState([])
  const [startEnd, setStartEnd] = useState({ start: -1, end: 1 })
  const [throttleLimit, setThrottleLimit] = useState(50)

  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
  const naturalSort = createNewSortInstance({ comparer: collator.compare })

	const determineAverageOfContent = (rows, column) => {
		let averageLength = 0
		rows.filter((_, i) => i * 2 < 10).forEach(r => typeof r[column] === 'string'
			? averageLength = (r[column].length + averageLength) / 2
			: averageLength = (100 + averageLength) / 2
		)
		return averageLength
	}
	const extractHeaderKeys = (headers) => headers?.map(header => ([
			header.property,
			...header.secondaryHeaders?.map(sh => sh.property) || [],
			...header.preHeaders?.map(sh => sh.property) || [],
			...header.postHeaders?.map(sh => sh.property) || [],
		])).flat() || []
	const extractCustomFilters = (headers) => headers.filter(h => h.customFilter).map(h => ({ filter: h.customFilter }))
	const extractExtraFilters = (headers) => headers.filter(h => h.extraFilters).reduce((acc, h) => [...acc, ...h.extraFilters.map(f => ({ filter: f.func }))], [])
	const extractFilter = (headers) => [ ...extractCustomFilters(headers), ...extractExtraFilters(headers)]
	const indexRows = (rows) => rows.map((row, index) => ({ ...row, __origIndex: index }))
	const sensitiveSearch = (sensitive, cr, key, term) => sensitive ? cr[key].includes(term) : cr[key].toLowerCase().includes(term.toLowerCase())
	const searchByRegex = (regex, property) => regex.test(property)
	const createRegex = (term, isCaseSensitive) => new RegExp(term, isCaseSensitive ? '' : 'i')
	const filterRows = (rows, searchColumns) => rows.filter(cr => (searchColumns.filter(({ term, isRegex, isSensitive, key }) => term.length > 0
		? isRegex ? searchByRegex(createRegex(term, isSensitive), cr[key]) : sensitiveSearch(isSensitive, cr, key, term)
		: true
	)).length === searchColumns.length)
	const orderRows = (rows, orderBy, order) => (orderBy === '' ? rows : order === 'asc'
		? naturalSort(rows).asc([r => r[orderBy]])
		: naturalSort(rows).desc([r => r[orderBy]]))

  useEffect(() => {
    console.log("B.i start")
    console.log(rows, headers, searchColumns, order, orderBy)
    const indexedRows = indexRows(rows)
    setIsDirty(() => true)
    setSelectedIndex(() => null)
    if (!headers) { setDiscovering(() => true) }

    const tmpRows1 = headers?.length > 0 ? extractFilter(headers).reduce((acc, value) => value.filter(acc), indexedRows) : indexedRows
    const tmpRows2 = searchColumns.length > 0 ? filterRows(tmpRows1, searchColumns) : tmpRows1
    const tmpRows3 = orderRows(tmpRows2, orderBy, order).map((r, index) => ({ ...r, __index: index }))
    setSortedRows(() => tmpRows3)
    setStartEnd(() => ({ start: -1, end: 1 }))
    setThrottling(() => tmpRows3.length - 1 >= throttleLimit)
    setIsDirty(() => false)
    console.log("B.i end")
  }, [rows, headers, searchColumns, order, orderBy, throttleLimit])

  useEffect(() => {
    // console.log('4. useEffect', rows, headers, isDiscovering, discovering)
    if (isDiscovering) {
      const watchedHeaders = extractHeaderKeys(headers)
      const missingColumns = Object.keys(rows[0]).filter(knownColumn => !watchedHeaders.includes(knownColumn))
      const newHeaders =  [
        ...(headers || []).filter(prev => !missingColumns.includes(prev.property)),
        ...missingColumns.map(missingColumn => {
          let minMax = '1fr'
          const averageLength = determineAverageOfContent(rows, missingColumn)
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
      setInnerHeaders(() => newHeaders.map(header => ({ ...header, selected: false, visible: header.visible || true })).filter(header => !isOmittingColumns?.includes(header.property)))
    } else {
      setInnerHeaders(() => (headers || []).map(header => ({ ...header, selected: false, visible: header.visible || true })).filter(header => !isOmittingColumns?.includes(header.property)))
    }
    // console.log("i end")
  }, [rows, headers, isDiscovering])

  return null
}


export default Processing