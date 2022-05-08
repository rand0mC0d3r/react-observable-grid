import clsx from 'clsx';
import { parse, stringify } from 'css';
import React, { useContext, useEffect, useState } from 'react';
import DataProvider from './GridStore';

export default ({ children, style, className }) => {
  const { uniqueId, grid, data, headerTemplateColumns, global } = useContext(DataProvider)
  const [presentColumns, setPresentColumns] = useState([])

  const setGridPresentColumns = () => {
    const columnsVisible = (grid || {})
      .filter(({ header }) => header?.visible === undefined
        ? true
        : header?.visible)
          .filter(({ header }) => !header?.noColumn)
    setPresentColumns(() => columnsVisible
      .map(({ key, header }, index) => {
        return {
          key: key,
          align: header?.align || 'flex-start',
          border: index !== columnsVisible.length - 1,
        }
      }))
  }

  const setDiscoveredPresentColumns = () => {
    setPresentColumns(() => [...new Set(data
      .map(item => Object.
        keys(item)
        .map(key => key))
      .flat())]
      .sort()
      .map(key => ({ key, align: 'flex-start' })))
  }

  useEffect(() => {
    if (grid) {
      setGridPresentColumns()
    } else if (!!data?.length) {
      setDiscoveredPresentColumns()
    }
  }, [grid, data, headerTemplateColumns])

  const classes = parse(`
    .${uniqueId}-columns-grid {
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      grid-template-rows: 1fr;
      position: absolute;
      display: grid;
      z-index: 1;
      pointer-events: none;
    }
    .${uniqueId}-columns-item {
      box-shadow: inset -0.5px 0px 0px 0px #ccc;
    }
    ${!children && `
      .${uniqueId}-columns-grid > *:last-child {
        box-shadow: none;
      }`
    }
  `)

  return <>
    <style>{stringify(classes, { compress: true })}</style>
    <div className={clsx([`${uniqueId}-columns-grid`, className])}
      style={{
        gridTemplateColumns: headerTemplateColumns,
        ...global?.style,
        paddingTop: '0',
        paddingBottom: '0',
      }}
    >
      {children
        ? children({ columns: presentColumns.map(({ key, align }) => ({ key, align })) })
        : presentColumns.map(({ key }) => <div {...{
          key,
          className: `${uniqueId}-columns-item`,
          style: {
            ...style,
            margin: `0px -${(style?.gap?.replace('px', '') / 2) || 0}px`
          }
        }} />)}
    </div>
  </>
}
