import PropTypes from 'prop-types'
import React from 'react'

/**
 * Adds a wrapper that allows to center the content of the component.
 * @param { children } The React Node to be rendered
 */
const ObservableEmpty = ({ children }) => <div
  style={{
    flex: '1 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
  {children}
</div>

ObservableEmpty.propTypes = { children: PropTypes.node.isRequired }

export default ObservableEmpty