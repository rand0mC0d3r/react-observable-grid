import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import DataProvider from './GridStoreNg';

const GridHeadersNg = ({ children, className, style }) => {
  const { stats } = useContext(DataProvider)
  const { total }  = stats

  return <div {...{ className }} style={{ ...style}}>
    {children && children({ total })}
    </div>
}

GridHeadersNg.propTypes = { children: PropTypes.func.isRequired }

export default GridHeadersNg