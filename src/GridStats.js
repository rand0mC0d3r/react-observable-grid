import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import DataProvider from './GridStore';

const GridStats = ({ children, className, style }) => {
  const { stats } = useContext(DataProvider)
  const { total, sort }  = stats

  return <div {...{ className }} style={{ ...style, zIndex: 2}}>
    {children && children({ total, sort })}
  </div>
}

GridStats.propTypes = { children: PropTypes.func.isRequired }

export default GridStats