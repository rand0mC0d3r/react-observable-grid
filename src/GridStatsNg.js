import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import DataProvider from './GridStoreNg';

const GridHeadersNg = ({ children, className, style }) => {
  const { stats } = useContext(DataProvider)
  const { total, sort }  = stats

  return <div {...{ className }} style={{ ...style}}>
    {children && children({ total, sort })}
    </div>
}

GridHeadersNg.propTypes = { children: PropTypes.func.isRequired }

export default GridHeadersNg