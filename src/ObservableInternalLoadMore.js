import throttle from 'lodash/throttle'
import { useCallback } from 'react'
import { InView } from 'react-intersection-observer'

function useLoadMore(callback, delay) {
  return useCallback(throttle((...args) => callback(...args), delay), [delay])
}

const ObservableInternalLoadMore = ({ onLoadMore = () => { } }) => {
  const throttledLoadMore = useLoadMore(() => onLoadMore(), 750)
  return <InView
    as="div"
    style={{
      position: 'relative',
      top: '-33%',
      opacity: '0',
    }}
    onChange={(inView) => {
      if (inView) {
        console.log("ddd")
        throttledLoadMore()
      }
    }}
  >.</InView>
}

export default ObservableInternalLoadMore