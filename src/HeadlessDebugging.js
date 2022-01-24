import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import DataProvider from './GridStore'

const HeadlessDebugging = ({ children }) => {
  const { settings } = useContext(DataProvider)
  return <>{children(settings)}</>
}

HeadlessDebugging.propTypes = { children: PropTypes.func.isRequired }

export default HeadlessDebugging