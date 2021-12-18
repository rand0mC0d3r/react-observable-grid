import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { InView } from 'react-intersection-observer'

const ObservableRow = ({ index, className, style, onClick, children, isRelevant, isScrollable }) => {
  const [inView, setInView] = useState()

  return (isRelevant && children) ?
    <InView {...{ as: 'div', onChange: setInView, key: index, index, onClick, className, style }}>
      {inView && isScrollable && children}
    </InView>
    // <InView>{({ inView, ref }) => <div ref={ref} {...{ key: index, onClick, className, style }}>
    //   {inView && isScrollable && children}
    // </div>}</InView>
    : null
}

ObservableRow.defaultProps = { isScrollable: true, isSelected: false, isRelevant: false }
ObservableRow.propTypes = { isScrollable: PropTypes.bool }

export default ObservableRow