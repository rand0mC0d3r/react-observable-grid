import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { cloneElement, Fragment, useContext, useEffect, useState } from 'react';
import DataProvider from './GridStoreNg';

const wrapperStyle = {
  flex: '1 0 auto',
  position: 'relative',
  alignSelf: 'stretch',
}

const scrollerStyle = {
  overflow: 'hidden scroll',
  position: 'absolute',
  width: '100%',
  height: '100%'
}

const GridRowsNg = ({ children, className, style, generateKey, selectedRow }) => {
  const { data, gridTemplateColumns, grid, global } = useContext(DataProvider)
  // const [selectedIndex, setSelectedIndex] = useState(null)
  const [presentColumns, setPresentColumns] = useState([])

  const componentTypeCheck = (component, key, index) => {
    if (component === null) {
      return <div onClick={() => setSelectedIndex(index)} key={key} style={{ margin: '0px', padding: '0px'}} id="auto-generated" />
    }
    return typeof component === 'string' || typeof component.type === 'symbol'
      ? <div onClick={() => setSelectedIndex(index)}>{component}</div>
      : <Fragment key={key}>{component}</Fragment>
  }

  useEffect(() => {
    setPresentColumns(grid
      .filter(gridItem => gridItem.header.visible === undefined  ? true : gridItem.header.visible)
      .map(gridItem => ({
        component: gridItem.row.component,
        key: gridItem.row.key
      })))
  }, [grid])

  const textMap = [
    { id: 'flex-start', text: 'left' },
    { id: 'flex-end', text: 'right' },
    { id: 'center', text: 'center' },
  ]

  const classes = `
    .grid-rows-grid {
      display: grid;
      z-index: 1;
      align-items: center;
      grid-template-columns: ${gridTemplateColumns};
    }
    ${grid
      .filter(gridItem => gridItem.header.visible === undefined  ? true : gridItem.header.visible)
      .map((gridItem, index) => !gridItem.header.noColumn
      ? `
        .grid-rows-grid > *:nth-child(${index}) {
          display: ${gridItem?.row?.noWrapper ? 'flex' : 'inline-block'};
          padding: ${global.style.rowPadding.split(" ")[0]} ${(global?.style?.gap || '0')}px;
          margin: -${(global?.style?.gap || '0')}px 0px;
        }
        .grid-rows-grid > *:nth-child(${index + 1}) {
          justify-content: ${gridItem?.header?.align || 'flex-start'};
          justify-items: ${gridItem?.header?.align || 'flex-start'};
          align-items: ${gridItem?.header?.align || 'flex-start'};
          ${gridItem?.row?.noWrapper ? `text-align: ${(textMap.find(tm => tm.id === gridItem?.header?.align || '') || []).text}` : ''}
        }
        .grid-rows-grid > *:nth-child(${index + 1}) > * {
          justify-content: ${gridItem?.header?.align || 'flex-start'};
          justify-items: ${gridItem?.header?.align || 'flex-start'};
          text-align: ${(textMap.find(tm => tm.id === gridItem?.header?.align || '') || []).text};
        }
    ` : `
        .grid-rows-grid > *:nth-child(${index + 1}) {
          display: ${gridItem?.row?.noWrapper ? 'flex' : 'inline-block'};
          margin: ${index !== 0 ? '0' : `-${global.style.rowPadding.split(" ")[0]}`} -${global.style.rowPadding.split(" ")[1]} ${index === 0 ? '0' : `-${global.style.rowPadding.split(" ")[0]}`} -${global.style.rowPadding.split(" ")[1]} !important;
        }
    `).join('')}
    ${grid
    .filter(gridItem => gridItem.header.visible === undefined ? true : gridItem.header.visible)
    .map((gridItem, index) => gridItem?.header?.noColumn ? `
    .grid-rows-grid > *:nth-child(${index + 1}) {
      ${gridItem.row.component !== null && `
      margin:
        ${index !== 0 ? '0' : `-${global.style.rowPadding.split(" ")[0]}`}
        -${(gridItem?.row?.columnEnd && gridItem?.row?.columnEnd !== 'none') ? 0 : global.style.rowPadding.split(" ")[1]}
        ${index === 0 ? '0' : `-${global.style.rowPadding.split(" ")[0]}`}
        -${(gridItem?.row?.columnStart && gridItem?.row?.columnStart !== 0) ? 0 : global.style.rowPadding.split(" ")[1]} !important;
      `
      }
      grid-column-start: ${gridItem?.row?.columnStart || '1'};
      grid-column-end: ${gridItem?.row?.columnEnd || 'none'};
      grid-row-start: ${gridItem?.row?.rowStart || '0'};
      grid-row-end: ${gridItem?.row?.rowEnd || '0'};
      z-index: 1;
    }
    `:'').join('')}
  `

  return <>
    <style>{classes}</style>
    <div style={wrapperStyle}>
      <div style={scrollerStyle}>
        {children && data && children({
          styleProps: {
            display: 'grid',
            alignItems: 'center',
            padding: global.style.rowPadding || '0',
            gridTemplateColumns,
          },
          className: clsx(['grid-rows-grid', className]),
          rows: (data.length ? data : []).map((dataItem, index) => ({
            index,
            alternating: global.alternatingRows.stepping(index),
            data: dataItem,
            key: `${index}.${generateKey(dataItem)}`,
            component: presentColumns.map(({ component, key }) => componentTypeCheck(component(dataItem, index), `${index}.${key}.${generateKey(dataItem)}`, index))
          }))
        })}
      </div>
    </div>
  </>
}

GridRowsNg.propTypes = { children: PropTypes.func.isRequired }

export default GridRowsNg