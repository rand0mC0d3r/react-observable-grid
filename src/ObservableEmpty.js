import { Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const ObservableEmpty = ({ children }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return <div className={classes.root}>
    <div className={classes.container}>
      {children ? children : <Typography variant="caption" color="textSecondary">No rows ...</Typography>}
      </div>
  </div>
}

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 0 auto',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: '20px 40px',
    borderRadius: '4px',
    border: `1px solid ${theme.palette.divider} `
  },
}))

ObservableEmpty.propTypes = { children: PropTypes.node }

export default ObservableEmpty