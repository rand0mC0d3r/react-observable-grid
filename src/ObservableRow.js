import PropTypes from 'prop-types';
import { cloneElement, useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';

const ObservableRow = ({
  innerIndex,
  innerOriginalIndex,
  onClick,
  children,
  isRelevant,
  isScrollable,
  isSelected,
}) => {
  let renderedChildren;
  let delayedRenderer;

  const renderChildren = (children, inView) => {
    if (inView) {
      if (!renderedChildren) {
        console.log('rendering children', innerIndex);
        const freshRenderer = cloneElement(children)
        renderedChildren = freshRenderer;
        return freshRenderer
      } else {
        console.log('reusing children', innerIndex);
        return renderedChildren;
      }
    }
  }

  useEffect(() => {
    return () => {
      !!delayedRenderer && clearTimeout(delayedRenderer)
    }
  }, [])

  return isRelevant && children
  ? <InView>
    {({ inView, ref }) => <div {...{
      ref,
      onClick,
      key: innerIndex,
      'data-i': innerIndex,
      'data-o': innerOriginalIndex,
      className: [
        'observableGrid',
        (inView && isSelected) ? 'observableGrid-selected' : false,
      ].filter(c => c !== false).join(' ')
    }}>
      {inView && isScrollable && renderChildren(children, inView)}
    </div>}
  </InView>
  : null
}

ObservableRow.defaultProps = { isScrollable: true, isSelected: false, isRelevant: true }
ObservableRow.propTypes = { isScrollable: PropTypes.bool }

export default ObservableRow