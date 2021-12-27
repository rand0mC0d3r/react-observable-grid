import { makeStyles } from '@material-ui/core/styles'
import throttle from 'lodash/throttle'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { InView } from 'react-intersection-observer'

const ObservableInternalLoadMore = ({ onLoadMore = () => { }, isPointing = false }) => {
  const classes = useStyles()
  const useLoadMore = (callback, delay) => (useCallback(throttle((...args) => callback(...args), delay), [delay]))
  const throttledLoadMore = useLoadMore(() => onLoadMore(), 750)

  return <InView
    as="div"
    className={classes.root}
    style={{ top: isPointing ? '50%' : '-25%' }}
    onChange={(inView) => inView && throttledLoadMore()}
  >.</InView>
}

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    height: '0px',
    padding: '0px',
    margin: '0px',
    width: '0px',
    opacity: '0',
    float: 'left',
  },
}))

ObservableInternalLoadMore.defaultProps = { onLoadMore: () => {}, isPointing: false }
ObservableInternalLoadMore.propTypes = { onLoadMore: PropTypes.func }

export default ObservableInternalLoadMore