import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import DataProvider from './GridStoreNg';

export default ({ style, className }) => {
  const { grid, gridTemplateColumns } = useContext(DataProvider)
  const [presentColumns, setPresentColumns] = useState([])

  useEffect(() => {
    setPresentColumns(grid.filter(gridItem => gridItem.header.visible).map(gridItem => gridItem.header.key))
  }, [grid])

  return <div
    {...{ className }}
    style={{
      ...style,
      paddingTop: '0',
      paddingBottom: '0',
      top: '0px', left: '0px', bottom: '0px', right: '0px',
      position: 'absolute',
      display: 'grid',
      gridTemplateColumns
		}}
  >
    {presentColumns.map((key, index) => <div key={key} style={{
      border: '0px none',
      borderRight: index !== presentColumns.length - 1
        ? '1px solid #CCC'
        : '0px none',
    }} />)}
	</div>
}
