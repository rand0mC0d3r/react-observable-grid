import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { InView } from 'react-intersection-observer'

const ObservableRow = ({ index, onClick, children, isRelevant, isScrollable, isSelected }) => {
  const [inView, setInView] = useState()

  return (isRelevant && children)
    ? <InView {...{
      as: 'div',
      onClick,
      onChange: setInView,
      key: index,
      className: (inView ? ['observableGrid', isSelected ? ' observableGrid-selected' : ''].join(' ').trim() : undefined)
    }}>
      {inView && isScrollable && children}
    </InView>
  : null
}

ObservableRow.defaultProps = { isScrollable: true, isSelected: false, isRelevant: false }
ObservableRow.propTypes = { isScrollable: PropTypes.bool }

export default ObservableRow