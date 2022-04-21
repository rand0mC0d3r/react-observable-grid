import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { cloneElement, useContext } from 'react';
import DataProvider from './GridStore';

const GridSticky = ({ children, className, style }) => {
  const classes = `
    .grid-sticky-grid {
      z-index: 1;
    }
  `

  return <>
    <style>{classes}</style>
    <div {...{
      className: clsx(['grid-sticky-grid', className]),
      style: {  ...style, gap: 0 }
    }}>
      {children}
    </div>
  </>
}

GridSticky.propTypes = { children: PropTypes.func }

export default GridSticky