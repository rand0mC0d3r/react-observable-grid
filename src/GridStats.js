import PropTypes from 'prop-types';
import { useContext } from 'react';
import DataProvider from './GridStore';

const GridStats = ({ children, className, style }) => {
  const { stats } = useContext(DataProvider)

  return children
    ? <div {...{ className }} style={{ ...style, zIndex: 2 }}>{children({ ...stats })}</div>
    : null
}

GridStats.propTypes = { children: PropTypes.oneOfType([PropTypes.func, PropTypes.element ])}

export default GridStats