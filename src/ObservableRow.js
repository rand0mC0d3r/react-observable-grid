import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { cloneElement, useEffect, useState } from 'react'
import { InView, useInView } from 'react-intersection-observer'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    '&:hover': {
      backgroundColor: theme.palette.augmentColor({ main: theme.palette.divider }).light,
    }
  },
  isSelected: {
    backgroundColor: `${theme.palette.augmentColor({ main: theme.palette.divider }).main} !important`,
  },
}))

const ObservableRow = ({
  innerIndex,
  innerOriginalIndex,
  isScrollable = true,
  isSelected = false,
  onClick,
  children,
  isRelevant = true,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [inView, setInView] = useState(false)

  return isRelevant && children
    ? <InView {...{
        ...inView
          ? {
            'data-i': innerIndex,
            'data-o': innerOriginalIndex,
          }
          : {},
        onClick,
        threshold: 0,
        as: 'div',
        key: innerIndex,
        onChange: setInView,
        className: [
          classes.wrapper,
          (inView && isSelected) ? classes.isSelected : false,
          inView ? 'observableGrid' : false,
        ].filter(c => c !== false).join(' ')
    }}>
      {(inView || isScrollable) && cloneElement(children, { inView })}
    </InView>
    : null
}

ObservableRow.defaultProps = { isScrollable: true}
ObservableRow.propTypes = { isScrollable: PropTypes.bool }

export default ObservableRow