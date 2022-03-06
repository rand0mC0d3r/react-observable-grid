import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import DataProvider from './GridStoreNg'

const GridDebug = ({ children }) => {
  const { stats } = useContext(DataProvider)
  return <>{children && children(stats)}</>
}

GridDebug.propTypes = { children: PropTypes.func.isRequired }

export default GridDebug