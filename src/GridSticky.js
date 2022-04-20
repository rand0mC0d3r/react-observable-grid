import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { cloneElement, useContext } from 'react';
import DataProvider from './GridStoreNg';

const GridSticky = ({ children, className, style, upComponent, downComponent, fallbackComponent = <></> }) => {
  const { grid, headerTemplateColumns, stats, onSort, global } = useContext(DataProvider)

  const componentTypeCheck = (component, onClick, options) => {
    return typeof component === 'string' || typeof component.type === 'symbol'
      ? <>{cloneElement(fallbackComponent(component, options), { style: { cursor: onClick ? 'pointer' : 'default'}})}</>
      : component({ ...options })
  }

  const classes = `
    .grid-sticky-grid {
      z-index: 1;
    }
  `

  return <>
    <style>{classes}</style>
    <div {...{
      className: clsx(['grid-sticky-grid', className]),
      style: { ...global.style, ...style, gap: 0 }
    }}>
      {children}
    </div>
  </>
}

GridSticky.propTypes = { children: PropTypes.func }

export default GridSticky