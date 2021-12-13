import PropTypes from 'prop-types'
import { cloneElement, useState } from 'react'
import { InView } from 'react-intersection-observer'

const ObservableRow = ({
  innerIndex,
  innerOriginalIndex,
  isScrollable = true,
  isSelected = false,
  onClick,
  children,
  isRelevant = true,
}) => {
  const [inView, setInView] = useState(false)

  return isRelevant && children
    ? <InView {...{
        onClick,
        threshold: 0,
        as: 'div',
        key: innerIndex,
        onChange: setInView,
          'data-i': innerIndex,
          'data-o': innerOriginalIndex,
        className: [
          'observableGrid-base observableGrid',
          (inView && isSelected) ? 'observableGrid-selected': false,
        ].filter(c => c !== false).join(' ')
    }}>
      {(inView || isScrollable) && cloneElement(children)}
    </InView>
    : null
}

ObservableRow.defaultProps = { isScrollable: true}
ObservableRow.propTypes = { isScrollable: PropTypes.bool }

export default ObservableRow