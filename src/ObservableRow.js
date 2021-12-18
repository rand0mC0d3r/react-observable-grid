import PropTypes from 'prop-types'
import React from 'react'
import { InView } from 'react-intersection-observer'

const ObservableRow = ({ index, className, style, onClick, children, isRelevant, isScrollable }) => (isRelevant && children)
  ? <InView>{({ inView, ref }) => <div ref={ref} {...{ key: index, onClick, className, style }}>
    {inView && isScrollable && children}
  </div>}</InView>
  : null

ObservableRow.defaultProps = { isScrollable: true, isSelected: false, isRelevant: false }
ObservableRow.propTypes = { isScrollable: PropTypes.bool }

export default ObservableRow