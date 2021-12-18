import PropTypes from 'prop-types'
import React from 'react'

/**
 * Adds a wrapper that allows to show debug information in the UI.
 * @param { children } The React Node to be rendered
 */
const ObservableDebugging = ({ items }) => <div style={{
  flex: '1 0 auto',
  display: 'flex',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  alignItems: 'center',
  position: 'absolute',
  bottom: '20px',
  gap: '4px',
  right: '20px',
  zIndex: '1',
  width: '500px'
}}>
  {items.map(({ label, value }) => <div
    style={{
      color: 'white',
      backgroundColor: '#777',
      borderRadius: '4px',
      padding: '4px 8px',
    }}
    key={`${label}: ${value}`}
  >
    {`${label.toUpperCase()}: ${value}`}
  </div>)}
</div>

ObservableDebugging.defaultProps = { items: [] }
ObservableDebugging.propTypes = { items: PropTypes.array.isRequired }

export default ObservableDebugging