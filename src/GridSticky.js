import clsx from 'clsx';
import { parse, stringify } from 'css';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import DataProvider from './GridStore';

const classes = (uniqueId) => parse(`
  .${uniqueId}-sticky-item {
    z-index: 1;
  }
`)

const GridSticky = ({ children, className, ...rest }) => {
  const { uniqueId } = useContext(DataProvider)

  return children ? <>
    <style>{stringify(classes(uniqueId), { compress: true })}</style>
    <div {...{ className: clsx([`${uniqueId}-sticky-item`, className]), ...rest }}>{children}</div>
  </> : null
}

GridSticky.propTypes = { children: PropTypes.oneOfType([PropTypes.func, PropTypes.element ])}

export default GridSticky