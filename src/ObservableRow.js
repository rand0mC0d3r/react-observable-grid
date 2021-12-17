import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { InView } from 'react-intersection-observer'

const ObservableRow = ({
  innerIndex,
  // innerOriginalIndex,
  onClick,
  children,
  isRelevant,
  isScrollable,
  isSelected,
}) => {
  const [inView, setInView] = useState()

  return (isRelevant && children)
    ? <InView {...{
      as: 'div',
      onClick,
      onChange: setInView,
      key: innerIndex,
      // 'data-i': innerIndex,
      // 'data-o': innerOriginalIndex,
      className: [
        'observableGrid',
          (inView && isSelected) ? 'observableGrid-selected' : false,
      ].filter(c => c !== false).join(' ')
    }}>
      {inView && isScrollable && children}
    </InView>
  : null
}

ObservableRow.defaultProps = { isScrollable: true, isSelected: false, isRelevant: true }
ObservableRow.propTypes = { isScrollable: PropTypes.bool }

export default ObservableRow