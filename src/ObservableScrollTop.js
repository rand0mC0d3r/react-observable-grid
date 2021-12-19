import React from 'react'

const ObservableScrollTop = () => <div
  onClick={() => {
    const firstElement = document.getElementById('first')
    firstElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }}
  style={{
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    zIndex: '1',
    border: '2px solid #CCC',
    backgroundColor: '#DDD',
    padding: '10px',
    borderRadius: '50%',
  }}>
  UP
</div>

export default ObservableScrollTop