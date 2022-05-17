import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import DataProvider from './GridStore';

const GridStats = ({ children, className, style }) => {
  const { stats } = useContext(DataProvider)

  return <>{children && <div {...{ className, style: { ...style, zIndex: 2 } }}>{children({ ...stats })}</div>}</>
}

GridStats.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  className: PropTypes.object,
  style: PropTypes.object
}

export default GridStats