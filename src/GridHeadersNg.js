import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import DataProvider from './GridStoreNg';

const GridHeadersNg = ({ children, className, style }) => {
  const { grid, gridTemplateColumns, stats, onSort, global } = useContext(DataProvider)

  return <div {...{ className }} style={{
    display: 'grid',
    zIndex: 1,
    alignItems: 'center',
    gridTemplateColumns,
    ...global.style,
    ...style,
  }}>
    {children && children({
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
    })}
  </div>
}

GridHeadersNg.propTypes = { children: PropTypes.func.isRequired }

export default GridHeadersNg