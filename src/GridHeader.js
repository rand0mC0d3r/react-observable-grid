import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import DataProvider from './GridStore';

const GridHeaders = ({ children }) => {
  const { innerHeaders } = useContext(DataProvider)

  return <div style={{
    display: 'grid',
    gridTemplateColumns: innerHeaders.map(header => header.visible ? header.width : '0px').join(' '),
  }}>{children && children(innerHeaders)}</div>
}


GridHeaders.propTypes = { children: PropTypes.func.isRequired }

export default GridHeaders