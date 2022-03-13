import React, { useContext, useEffect, useState } from 'react';
import DataProvider from './GridStoreNg';

export default ({ style, className }) => {
  const { grid, gridTemplateColumns, global } = useContext(DataProvider)
  const [presentColumns, setPresentColumns] = useState([])

  useEffect(() => {
    const columnsVisible = grid.filter(gridItem => gridItem.header.visible)
    setPresentColumns(columnsVisible.map((gridItem, index) => {
      const { key, align } = gridItem.header
      return {
        key: key,
        align: align,
        border: index !== columnsVisible.length - 1,
      }
    }))
  }, [grid])

  return <div
    {...{ className }}
    style={{
      top: '0px', left: '0px', bottom: '0px', right: '0px',
      position: 'absolute',
      display: 'grid',
      gridTemplateColumns,
      ...global.style,
      ...style,
      paddingTop: '0',
      paddingBottom: '0',
		}}
  >
    {presentColumns.map((pcItem, index) => <div id={pcItem.align} key={pcItem.key} style={{
      border: '0px none transparent',
      borderRight: pcItem.border ? '1px solid #CCC' : '0px none',
      margin: `0px -${(style?.gap?.replace('px', '') / 2) || 0}px`,
    }} ></div>)}
	</div>
}
