import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import DataProvider from './GridStoreNg';

const GridRowsNg = ({ children, className, style }) => {
  const { data, grid, global } = useContext(DataProvider)

  const [gridTemplateColumns, setGridTemplateColumns] = useState('')
  const [presentColumns, setPresentColumns] = useState([])

  useEffect(() => {
    setGridTemplateColumns(grid
      .filter(gridItem => gridItem.header.visible)
      .map(gridItem => gridItem.header.width)
      .join(' '))
    setPresentColumns(grid
      .filter(gridItem => gridItem.header.visible)
      .map(gridItem => ({
        component: gridItem.row.component,
        key: gridItem.row.key
      })))
  }, [grid])

  return <div style={{
    flex: '1 0 auto',
    position: 'relative',
    alignSelf: 'stretch',
  }}>
    <div style={{
      overflow: 'hidden scroll',
      position: 'absolute',
      width: '100%',
      height: '100%'
    }}
    >
      {children && data && children({
        styleProps: {
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns,
        },
        rowProps: {
          className,
        },
        rows: data.map((dataItem, index) => ({
          alternating: global.alternatingRows.stepping(index),
          key: dataItem.uuid,
          component: <>
            {presentColumns.map(({ component, key }) => <div key={key}>{component(dataItem)}</div>)}
          </>
        }))})}
    </div>
  </div>
}

GridRowsNg.propTypes = { children: PropTypes.func.isRequired }

export default GridRowsNg