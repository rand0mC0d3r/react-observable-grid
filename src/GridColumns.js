import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import DataProvider from './GridStore';

export default ({ children, style, className }) => {
  const { grid, headerTemplateColumns, global } = useContext(DataProvider)
  const [presentColumns, setPresentColumns] = useState([])

  useEffect(() => {
    const columnsVisible = grid
      .filter(gridItem => gridItem.header.visible === undefined  ? true : gridItem.header.visible)
      .filter(gridItem => !gridItem.header.noColumn)
    setPresentColumns(columnsVisible.map((gridItem, index) => {
      const { key, align } = gridItem.header
      return {
        key: key,
        align: align,
        border: index !== columnsVisible.length - 1,
      }
    }))
  }, [grid])

  const classes = `
    .grid-columns-grid {
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      position: absolute;
      display: grid;
    }
    .grid-columns-grid > * {
      border-top-style: none !important;
      border-left-style: none !important;
      border-bottom-style: none !important;
    }
    .grid-columns-grid > *:last-child {
      border-right-style: none !important;
    }
  `

  return <>
    <style>{classes}</style>
    <div className={clsx(['grid-columns-grid', className])}
      style={{
        gridTemplateColumns: headerTemplateColumns,
        ...global.style,
        ...style,
        paddingTop: '0',
        paddingBottom: '0',
      }}
    >
      {children
        ? children({ columns: presentColumns.map(pc => ({ key: pc.key, align: pc.align})) })
        : <>
        {presentColumns.map(pcItem => <div key={pcItem.key} style={{
          border: '0px none transparent',
          borderRight: pcItem.border ? '1px solid #CCC' : '0px none',
          margin: `0px -${(style?.gap?.replace('px', '') / 2) || 0}px`,
        }}/>)}
        </>}
    </div>
  </>
}
