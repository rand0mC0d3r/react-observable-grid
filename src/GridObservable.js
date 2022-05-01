import PropTypes from 'prop-types'
import React from 'react'
import { InView } from 'react-intersection-observer'

const GridObservable = ({ id, forceRender, index, className, style, onClick, onMouseEnter, children, isRelevant, isScrollable }) => (isRelevant && children)
  ? <InView>{({ inView, ref }) => <div {...{ ref, onClick, onMouseEnter, id,
    onContextMenu: (e) => e.preventDefault(),
    onTouchStart: () => onMouseEnter(),
    key: index,
    ...(forceRender ? true : inView) && { className, style }
  }}>
    {(forceRender ? true : inView) && isScrollable && children}
  </div>}</InView>
  : null

export default GridObservable