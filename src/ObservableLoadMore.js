import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import throttle from 'lodash/throttle'
import { useCallback, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import React from 'react'

function useLoadMore(callback, delay) {
  const throttleFn = useCallback(
    throttle((...args) => callback(...args), delay),
    [delay]
  )

  return throttleFn
}

const ObservableLoadMore = ({ onLoadMore = () => { } }) => {
  const { ref, inView } = useInView({ threshold: 1 })
  const throttledLoadMore = useLoadMore(() => onLoadMore(), 1000)

  useEffect(() => {
    if (inView) {
      throttledLoadMore()
    }

    // TODO: cancel throttle on unmount
    return () => {
      throttledLoadMore.cancel()
    }
  }, [inView, throttledLoadMore])

  return <>
    {ref && <div ref={ref}>
      <p style={{ textAlign: 'center' }}><RotateLeftIcon /></p>
    </div>}
  </>
}

export default ObservableLoadMore