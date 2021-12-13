import PropTypes from 'prop-types'
import { cloneElement, useEffect, useState } from 'react'
import { InView } from 'react-intersection-observer'

const ObservableRow = ({
  innerIndex,
  innerOriginalIndex,
  onClick,
  children,
  isRelevant,
  isScrollable,
  isSelected,
}) => {
  const [renderedChildren, setRenderedChildren] = useState()
  useEffect(() => isRelevant && renderedChildren === undefined && setRenderedChildren(cloneElement(children)), [renderedChildren, children, isRelevant])

  return isRelevant && children
  ? <InView>
    {({ inView, ref }) => <div {...{
      ref,
      onClick,
      key: innerIndex,
      'data-i': innerIndex,
      'data-o': innerOriginalIndex,
      className: [
        'observableGrid-base observableGrid',
        (inView && isSelected) ? 'observableGrid-selected' : false,
      ].filter(c => c !== false).join(' ')
    }}>
      {inView && isScrollable && renderedChildren}
    </div>}
  </InView>
  : null
}

ObservableRow.defaultProps = { isScrollable: true, isSelected: false, isRelevant: true }
ObservableRow.propTypes = { isScrollable: PropTypes.bool }

export default ObservableRow