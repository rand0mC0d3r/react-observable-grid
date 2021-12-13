import throttle from 'lodash/throttle'
import { useCallback } from 'react'
import { InView } from 'react-intersection-observer'

const useLoadMore = (callback, delay) => (useCallback(throttle((...args) => callback(...args), delay), [delay]))

const ObservableInternalLoadMore = ({ onLoadMore = () => { }, isPointing = false }) => {
  const throttledLoadMore = useLoadMore(() => onLoadMore(), 750)
  return <InView
    as="div"
    style={{
      position: 'relative',
      top: isPointing ? '10%' : '-10%',
      opacity: '0',
    }}
    onChange={(inView) => inView && throttledLoadMore()}
  >.</InView>
}

export default ObservableInternalLoadMore