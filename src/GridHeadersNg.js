import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import DataProvider from './GridStoreNg';

const GridHeadersNg = ({ children, className, style }) => {
  const { grid } = useContext(DataProvider)
  const [gridTemplateColumns, setGridTemplateColumns] = useState('')

  useEffect(() => {
    setGridTemplateColumns(grid
      .filter(gridItem => gridItem.header.visible)
      .map(gridItem => gridItem.header.width)
      .join(' '))
  }, [grid])

  return <div {...{ className }} style={{
      display: 'grid',
      gridTemplateColumns,
      ...style,
    }}>
      {children && children(grid
        .filter(gridItem => gridItem.header.visible)
        .map(({ header }) => ({
          component: header.component,
          key: header.key
        })))}
    </div>
}


GridHeadersNg.propTypes = { children: PropTypes.func.isRequired }

export default GridHeadersNg