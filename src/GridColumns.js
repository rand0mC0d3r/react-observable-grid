import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import DataProvider from './GridStore';

export default ({ children, style, className }) => {
  const { grid, data, headerTemplateColumns, global } = useContext(DataProvider)
  const [presentColumns, setPresentColumns] = useState([])

  useEffect(() => {
    if (grid) {
      const columnsVisible = grid?.filter(gridItem => gridItem?.header?.visible === undefined
        ? true
        : gridItem?.header?.visible)
        .filter(gridItem => !gridItem?.header?.noColumn)
      setPresentColumns(() => columnsVisible
        .map((gridItem, index) => {
          return {
            key: gridItem.key,
            align: gridItem?.header?.align || 'flex-start',
            border: index !== columnsVisible.length - 1,
          }
        }))
    } else {
      if (!!data?.length) {
        setPresentColumns(() => Object.keys(data[0]).map((key, index) => ({ key, align: 'flex-start' })))
      }
    }
  }, [grid, data, headerTemplateColumns])

  const classes = `
    .grid-columns-grid {
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      position: absolute;
      display: grid;
    }
    ${!children && `
      .grid-columns-grid > * {
        border-top-style: none !important;
        border-left-style: none !important;
        border-bottom-style: none !important;
      }
      .grid-columns-grid > *:last-child {
        border-right-style: none !important;
      }`
    }
    .grid-column {
      border: 0px none transparent;
      border-right: 1px solid #CCC;
    }
  `

  return <>
    <style>{classes}</style>
    <div className={clsx(['grid-columns-grid', className])}
      style={{
        gridTemplateColumns: headerTemplateColumns,
        ...global.style,
        paddingTop: '0',
        paddingBottom: '0',
      }}
    >
      {children
        ? children({ columns: presentColumns.map(({ key, align }) => ({ key, align })) })
        : presentColumns.map(({ key }) => <div {...{
          key,
          className: 'grid-column',
          style: { ...style, margin: `0px -${(style?.gap?.replace('px', '') / 2) || 0}px` }
        }} />)}
    </div>
  </>
}
