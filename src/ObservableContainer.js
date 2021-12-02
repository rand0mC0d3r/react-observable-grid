import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(theme => ({
  wrapper: {
    flex: '1 0 auto',
    position: 'relative',
    alignSelf: 'stretch',

    '@media print' : {
      height: 'auto',
      overflow: 'auto',
    }
  },
  list: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },

    '@media print' : {
      height: 'auto',
      overflow: 'auto',
      position: 'initial',
    },
  },
  alternatingItem: {
    '& > *:nth-child(even)': {
      backgroundColor: theme.palette.augmentColor({ main: theme.palette.background.default }).main,
    }
  }
}))

/**
 *
 * Adds a wrapper that allows in a container a list of items to be scrolled alternatively
 *
 * @param { children } The React Node to be rendered
 * @param { isAlternating } Boolean to determine if the list should be alternating
 * @param { isScrollable } Boolean to determine if the list should be scrollable
 */
const ObservableContainer = ({ children, isAlternating, isScrollable }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return <div className={classes.wrapper}>
    <div
      className={`${classes.list} ${isAlternating && classes.alternatingItem}`}
      style={isScrollable
        ? {
          overflow: 'visible scroll',
          position: 'absolute',
          width: '100%',
          height: '100%'
        }
        : {}}
    >
      {children}
    </div>
  </div>
}

ObservableContainer.defaultProps = {
  isScrollable: true,
  isAlternating: true,
}

ObservableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  isScrollable: PropTypes.bool,
  isAlternating: PropTypes.bool,
}

export default ObservableContainer