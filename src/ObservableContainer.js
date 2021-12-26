import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'

const ObservableContainer = ({ children, isAlternating, isGrid, isScrollable }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return <div className={classes.wrapper}>
    <div
      id="Container-root"
      className={[
        classes.container,
        isGrid ? classes.grid : classes.anyItem,
        isAlternating && classes.alternatingItem,
        isScrollable && classes.isScrollable
      ].join(' ')}>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
  },
  container: {
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
      paddingRight: '2px',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& > *:hover': {
      backgroundColor: '#88888844',
    }
  },
  alternatingItem: {
    '& > *:nth-child(even)': {
      backgroundColor: '#88888811',
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