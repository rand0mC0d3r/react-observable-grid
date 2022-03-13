import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import DataProvider from './GridStoreNg';

const GridHeadersNg = ({ children, className, style }) => {
  const { grid, gridTemplateColumns, stats, onSort, global } = useContext(DataProvider)

  const componentTypeCheck = (component, options) => {
    return typeof component === 'string' || typeof component.type === 'symbol'
      ? <div>{component}</div>
      : component({ ...options })
  }

  const classes = `
    .grid-headers-grid {
      display: grid;
      z-index: 1;
      align-items: center;
      grid-template-columns: ${gridTemplateColumns};
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
              .map(({ header }) => ({
                component: componentTypeCheck(header.component, {
                  onSort: () => onSort(header.key),
                  sort: {
                    direction: stats.sort.direction,
                    column: stats.sort.column,
                  }
                }),
                key: header.key,
                onSort: () => onSort(header.key),
                extraKeys: header.extraKeys,
                align: header.align,
                sort: {
                  direction: stats.sort.direction,
                  column: stats.sort.column,
                }
                }))})
        : grid
          .filter(gridItem => gridItem.header.visible)
          .map(({ header }) => <div
            className='grid-headers-injected'
            onClick={() => onSort(header.key)}
          >
            {componentTypeCheck(header.component)}
            {stats.sort.column === header.key && <>
              {stats.sort.direction === 'asc' ? '↑' : '↓'}
            </>}
          </div>)}
    </div>
  </>
}

GridHeadersNg.propTypes = { children: PropTypes.func.isRequired }

export default GridHeadersNg