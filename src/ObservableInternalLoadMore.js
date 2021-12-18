import throttle from 'lodash/throttle'
import PropTypes from 'prop-types'
import React from 'react'
import { useCallback } from 'react'
import { InView } from 'react-intersection-observer'

const ObservableInternalLoadMore = ({ onLoadMore = () => { }, isPointing = false }) => {
  const useLoadMore = (callback, delay) => (useCallback(throttle((...args) => callback(...args), delay), [delay]))
  const throttledLoadMore = useLoadMore(() => onLoadMore(), 750)

  return <InView
    as="div"
    style={{
      position: 'absolute',
      height: '0px',
      top: isPointing ? '50%' : '-25%',
      opacity: '0',
    }}
    onChange={(inView) => inView && throttledLoadMore()}
  >.</InView>
}

ObservableInternalLoadMore.defaultProps = { onLoadMore: () => {}, isPointing: false }
ObservableInternalLoadMore.propTypes = { onLoadMore: PropTypes.func }

export default ObservableInternalLoadMore