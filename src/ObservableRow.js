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
  const [renderedChildren, setRenderedChildren] = useState();
  const [inView, setInView] = useState()
  let delayedRenderer = null

  const renderChildren = (children) => {
      if (!renderedChildren) {
        const freshRenderer = cloneElement(children)
        setRenderedChildren(freshRenderer)
        return freshRenderer
      } else {
        return renderedChildren;
      }
  }

  useEffect(() => {
    if (inView && !renderedChildren) {
        clearTimeout(delayedRenderer);
    } else if (inView  === false && isRelevant && !renderedChildren) {
      delayedRenderer = setTimeout((renderedChildren) => {
        const freshRenderer = cloneElement(children)
        setRenderedChildren(freshRenderer)
      },  Math.floor(Math.random() *  1500 + 250));
    }

  }, [isRelevant, inView, renderedChildren, children]);

  useEffect(() => {
    if (inView) {
      renderChildren(children)
    }

  }, [children, inView]);

  useEffect(() => {
    return () => {
      !!delayedRenderer && clearTimeout(delayedRenderer)
    }
  }, [])

  return (isRelevant && children)
    ? <InView {...{
        as: 'div',
        onClick,
        onChange: setInView,
        key: innerIndex,
        'data-i': innerIndex,
        'data-o': innerOriginalIndex,
        className: [
          'observableGrid',
          (inView && isSelected) ? 'observableGrid-selected' : false,
        ].filter(c => c !== false).join(' ')
      }}>
      {inView && isScrollable && renderedChildren}
    </InView>
  : null
}

ObservableRow.defaultProps = { isScrollable: true, isSelected: false, isRelevant: true }
ObservableRow.propTypes = { isScrollable: PropTypes.bool }

export default ObservableRow