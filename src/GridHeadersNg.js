import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import DataProvider from './GridStoreNg';

const GridHeadersNg = ({ children, className, style }) => {
  const { grid, gridTemplateColumns, stats, onSort, global } = useContext(DataProvider)

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
  `

  return <>
    <style>{classes}</style>
    <div className={`grid-headers-grid ${className}`} style={{ ...global.style, ...style, gap: 0}}>
      {children
        ? children({
          headers: grid
            .filter(gridItem => gridItem.header.visible)
            .map(({ header }) => ({
              component: header.component,
              key: header.key,
              onSort,
              extraKeys: header.extraKeys,
              align: header.align,
              sort: {
                direction: stats.sort.direction,
                column: stats.sort.column,
              }
            }))
        })
        : <>{grid
          .filter(gridItem => gridItem.header.visible)
          .map(({ header }) => <>
            {typeof header.component === 'string' || typeof header.component.type === 'symbol'
              ? <div>{header.component}</div>
              : header.component
            }
          </>)
        }</>}
    </div>
  </>
}

GridHeadersNg.propTypes = { children: PropTypes.func.isRequired }

export default GridHeadersNg