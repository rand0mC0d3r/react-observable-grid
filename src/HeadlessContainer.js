import PropTypes from 'prop-types'
import React from 'react'

const HeadlessContainer = ({ children }) => {
  return <div style={{ flex: '1 0 auto', position: 'relative', alignSelf: 'stretch' }}>
    <div style={{ overflow: 'hidden scroll', position: 'absolute', width: '100%', height: '100%' }}>
      {children}
    </div>
  </div>
}

HeadlessContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HeadlessContainer