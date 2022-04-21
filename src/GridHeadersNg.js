import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { cloneElement, useContext } from 'react';
import DataProvider from './GridStoreNg';

const GridHeadersNg = ({ children, className, style, upComponent, downComponent, fallbackComponent = <></> }) => {
  const { grid, headerTemplateColumns, stats, onSort, global } = useContext(DataProvider)

  const componentTypeCheck = (component, onClick, options) => {
    return typeof component === 'string' || typeof component.type === 'symbol'
      ? <>{cloneElement(fallbackComponent(component, options), { style: { cursor: onClick ? 'pointer' : 'default'}})}</>
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
    ${grid
      // .filter(gridItem => gridItem.header.visible === undefined  ? true : gridItem.header.visible)
      .filter(gridItem => !gridItem.header.noColumn)
      .map((gridItem, index) => `
    .grid-headers-grid > *:nth-child(${index}) {
      justify-content: ${gridItem?.header?.align || 'flex-start'};
    }`).join('')}
    .grid-headers-injected {
      display: flex;
      user-select: none;
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
            .filter(gridItem => gridItem.header.visible === undefined  ? true : gridItem.header.visible)
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
          .filter(gridItem => gridItem.header.visible === undefined  ? true : gridItem.header.visible)
          .filter(gridItem => !gridItem.header.noColumn)
          .map(({ header }) => <div
            key={header.key}
            className='grid-headers-injected'
            onClick={() => !header.noSort && !header.disableOnClick && onSort(header.key)}
            onContextMenu={(e) => {
              e.preventDefault()
              !header.noSort && !header.disableOnClick && onSort('')
            }}
          >
            {componentTypeCheck(
              header.component,
              !header.noSort && !header.disableOnClick,
              {
                onSort: (path) => !header.noSort && onSort(path !== undefined ? path : header.key) ,
                sort: {
                  direction: !header.noSort && stats.sort.direction,
                  column: !header.noSort && stats.sort.column,
                  isActive: !header.noSort && stats.sort.column === header.key,
                },
                directionComponent: (current) => <>{!header.noSort && stats.sort.column === current ? <>
                  {stats.sort.direction === 'asc' ? '↑' : '↓'}
                </> : null}</>
              }
            )}
            {(typeof header.component === 'string' || typeof header.component.type === 'symbol') && !header.noSort && stats.sort.column === header.key && <>
              {stats.sort.direction === 'asc' ? (upComponent || '↑') : (downComponent || '↓')}
            </>}
          </div>)}
    </div>
  </>
}

GridHeadersNg.propTypes = { children: PropTypes.func }

export default GridHeadersNg