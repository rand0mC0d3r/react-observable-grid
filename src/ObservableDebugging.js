import PropTypes from 'prop-types'
import React from 'react'

const ObservableDebugging = ({ items }) => <div style={{
  flex: '1 0 auto',
  display: 'flex',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  alignItems: 'center',
  position: 'absolute',
  bottom: '20px',
  gap: '4px',
  left: '20px',
  zIndex: '1',
  width: '80%'
}}>
  {items.map(({ label, value }) => <div
    style={{
      color: 'white',
      fontSize: '12px',
      backgroundColor: '#333',
      borderRadius: '8px',
      padding: '8px 12px',
    }}
    key={`${label}: ${value}`}
  >
    {`${label.toUpperCase()}: ${value}`}
  </div>)}
</div>

ObservableDebugging.defaultProps = { items: [] }
ObservableDebugging.propTypes = { items: PropTypes.array.isRequired }

export default ObservableDebugging