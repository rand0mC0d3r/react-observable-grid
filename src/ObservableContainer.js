import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'

const ObservableContainer = ({ children, isAlternating, isScrollable }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return <div className={classes.wrapper}>
    <div className={`
        ${classes.list}
        ${classes.anyItem}
        ${isAlternating && classes.alternatingItem}
        ${isScrollable && classes.isScrollable}
      `}
    >
      {children}
    </div>
  </div>
}

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
  anyItem: {
    '& > *': {
      minHeight: '44px',
      paddingLeft: '2px',
      paddingRight: '2px'
    },
    '& > *:hover': {
      backgroundColor: `${theme.palette.augmentColor({ main: theme.palette.divider }).light} !important`,
    }
  },
  alternatingItem: {
    '& > *:nth-child(even)': {
      backgroundColor: `${theme.palette.background.default}88`,
    }
  },
  isScrollable: {
    overflow: 'visible scroll',
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
}))

ObservableContainer.defaultProps = { isScrollable: true, isAlternating: true }
ObservableContainer.propTypes = { children: PropTypes.node.isRequired, isScrollable: PropTypes.bool, isAlternating: PropTypes.bool }

export default ObservableContainer