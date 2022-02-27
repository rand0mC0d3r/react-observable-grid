import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import DataProvider from './GridStore';

const GridHeaders = ({ children, style, className }) => {
  const { innerHeaders } = useContext(DataProvider)

  return <div {...{className}} style={{
    display: 'grid',
    gridTemplateColumns: innerHeaders.map(header => header.visible ? header.width : '0px').join(' '),
    ...style,
  }}>{children && children(innerHeaders)}</div>
}


GridHeaders.propTypes = { children: PropTypes.func.isRequired }

export default GridHeaders