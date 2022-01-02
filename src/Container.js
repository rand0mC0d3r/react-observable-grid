import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

const Container = ({ children, isAlternating, isDirty, isGrid, isScrollable }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return <div className={clsx([classes.root, isGrid && classes.rootGrid])}>
    <div
      id="Container-root"
      className={clsx([
        classes.container,
        isDirty && classes.dirty,
        isGrid ? classes.grid : classes.anyItem,
        isAlternating && classes.alternatingItem,
        isScrollable && (isGrid ? classes.isScrollableGrid : classes.isScrollable)
      ])}>
      {children}
    </div>
  </div>
}

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 0 auto',
    position: 'relative',
    alignSelf: 'stretch',
  },
  rootGrid: {
    display: 'flex',
    justifyContent: 'stretch',
    overflow: 'hidden',
  },
  dirty: {
    filter: 'opacity(0.45) grayscale(0.85)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',

    '& > *': {
      alignItems: `stretch !important`,
    },
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
    '& *': {
      overflow: 'scroll',
    },
    '& *::-webkit-scrollbar': {
      display: 'none',
    },
    '& > *:hover': {
      backgroundColor: '#e0f0ff88',
    },
    '& > *:active': {
      backgroundColor: '#e0f0ff88',
    }
  },
  alternatingItem: {
    '& > *:nth-child(even)': {
      backgroundColor: '#88888811',
    }
  },
  isScrollable: {
    overflow: 'hidden scroll',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  isScrollableGrid: {
    overflow: 'visible scroll',
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
}))

Container.defaultProps = {
  isScrollable: true,
  isAlternating: true,
  isDirty: false,
  isGrid: false,
}
Container.propTypes = {
  children: PropTypes.node.isRequired,
  isAlternating: PropTypes.bool,
  isDirty: PropTypes.bool,
  isGrid: PropTypes.bool,
  isScrollable: PropTypes.bool,
}

export default Container