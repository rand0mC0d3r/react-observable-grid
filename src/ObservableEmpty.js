import PropTypes from 'prop-types'
import React from 'react'

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