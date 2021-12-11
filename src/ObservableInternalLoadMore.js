import throttle from 'lodash/throttle'
import { useCallback } from 'react'
import { InView } from 'react-intersection-observer'

function useLoadMore(callback, delay) {
  return useCallback(throttle((...args) => callback(...args), delay), [delay])
}

const ObservableInternalLoadMore = ({ onLoadMore = () => { } }) => {
  const throttledLoadMore = useLoadMore(() => onLoadMore(), 500)
  return <InView as="p" onChange={(inView) => inView && throttledLoadMore()}>.</InView>
}

export default ObservableInternalLoadMore