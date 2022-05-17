import clsx from 'clsx';
import { parse, stringify } from 'css';
import React, { useContext, useEffect, useState } from 'react';
import DataProvider from './GridStore';

const fallbackAlign = 'flex-start'
const listId = uniqueId => `${uniqueId}-columns-grid`
const itemId = uniqueId => `${uniqueId}-columns-grid-item`

export default ({ children, style, className }) => {
  const { uniqueId, grid, data, headerTemplateColumns, global } = useContext(DataProvider)
  const [ columns, setColumns ] = useState([])

  const generateCss = () => <style>{stringify(parse(`
      .${listId(uniqueId)} {
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
      .${itemId(uniqueId)} {
        box-shadow: inset -0.5px 0px 0px 0px #ccc;
      }
      ${!children && `
        .${listId(uniqueId)} > *:last-child {
          box-shadow: none;
        }`
      }
    `), { compress: true })}</style>

  useEffect(() => {
    setColumns(() => data.length > 0
      ? grid
        ? (grid || {})
          .filter(({ header }) => header?.visible === undefined ? true : header?.visible)
          .filter(({ header }) => !header?.noColumn)
          .map(({ key, header }) => ({ key, align: header?.align || fallbackAlign }))
        : [...new Set(data.map(item => Object.keys(item).map(key => key)).flat())]
          .sort()
          .map(key => ({ key, align: fallbackAlign }))
      : [])
  }, [grid, data, headerTemplateColumns])

  return data.length > 0 ? <>
    {generateCss()}
    <div
      className={clsx([listId(uniqueId), className])}
      style={{
        ...global?.style,
        gridTemplateColumns: headerTemplateColumns,
        paddingTop: '0 !important',
        paddingBottom: '0 !important',
      }}
    >
      {children
        ? children({ columns: columns.map(({ key, align }) => ({ key, align })) })
        : columns.map(({ key }) => <div {...{
            key,
            className: itemId(uniqueId),
            style: {
              ...style,
              margin: `0px -${(style?.gap?.replace('px', '') / 2) || 0}px`
            }
        }} />)}
    </div>
  </> : null
}
