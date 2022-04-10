import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import DataProvider from './GridStoreNg';

const GridHeadersNg = ({ children, className, style, fallbackComponent }) => {
  const { grid, headerTemplateColumns, stats, onSort, global } = useContext(DataProvider)

  const componentTypeCheck = (component, options) => {
    return typeof component === 'string' || typeof component.type === 'symbol'
      ? <>{fallbackComponent(component)}</>
      : component({ ...options })
  }

  const classes = `
    .grid-headers-grid {
      display: grid;
      z-index: 1;
      align-items: center;
      grid-template-columns: ${headerTemplateColumns};
    }
    .grid-headers-grid > * {
      display: flex;
      margin: 0px ${global?.style?.gap || '0'}px;
    }
    ${grid.map((gridItem, index) => `
    .grid-headers-grid > *:nth-child(${index + 1}) {
      justify-content: ${gridItem?.header?.align || 'flex-start'};
    }`).join('')}
    .grid-headers-injected {
      display: flex;
      gap: 4px;
      align-items: center;
    }
  `

  return <>
    <style>{classes}</style>
    <div {...{
      className: clsx(['grid-headers-grid', className]),
      style: { ...global.style, ...style, gap: 0 }
    }}>
      {children
        ? children({
          headers: grid
            .filter(gridItem => gridItem.header.visible)
            .filter(gridItem => !gridItem.header.noColumn)
            .map(({ header }) => ({
              key: header.key,
              extraKeys: header.extraKeys,
              align: header.align,
              component: componentTypeCheck(header.component, {
              onSort: (path) => onSort(path !== undefined ? path : header.key),
              sort: {
                direction: stats.sort.direction,
                column: stats.sort.column,
              },
              directionComponent: (current) => <>{stats.sort.column === current ? <>
                {stats.sort.direction === 'asc' ? '↑' : '↓'}
              </> : null}</>
            }),
          }))})
        : grid
          .filter(gridItem => gridItem.header.visible)
          .filter(gridItem => !gridItem.header.noColumn)
          .map(({ header }) => <div
            className='grid-headers-injected'
            onClick={() => !header.noSort && !header.disableOnClick && onSort(header.key)}
          >
            {componentTypeCheck(header.component, {
              onSort: (path) => !header.noSort && onSort(path !== undefined ? path : header.key) ,
              sort: {
                direction: !header.noSort && stats.sort.direction,
                column: !header.noSort && stats.sort.column,
              },
              directionComponent: (current) => <>{!header.noSort && stats.sort.column === current ? <>
                {stats.sort.direction === 'asc' ? '↑' : '↓'}
              </> : null}</>
            })}
          </div>)}
    </div>
  </>
}

GridHeadersNg.propTypes = { children: PropTypes.func.isRequired }

export default GridHeadersNg