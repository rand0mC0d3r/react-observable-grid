import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'

const ObservableDebugging = ({ items }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return <div className={classes.root}>
    {items?.map(({ label, value }) => <div className={classes.item} key={`${label}_${value}_debugging`}>
      {label}: {value}
    </div>)}
  </div>
}

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 0 auto',
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
    position: 'absolute',
    bottom: theme.spacing(2),
    gap: theme.spacing(0.5),
    left: theme.spacing(2),
    zIndex: '1',
    width: '75%'
  },
  item: {
    color: theme.palette.text.primary,
    fontSize: '12px',
    backgroundColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
    backdropFilter: 'blur(4px)',
  },
}))

ObservableDebugging.defaultProps = { items: [] }
ObservableDebugging.propTypes = { items: PropTypes.array.isRequired }

export default ObservableDebugging