import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const ObservableEmpty = ({ children }) => {
  const theme = useTheme()

  return <div
    style={{
      flex: '1 0 auto',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '20px 40px',
        borderRadius: '4px',
        border: `1px solid ${theme.palette.divider} `
      }}
    >
      {children ? children : <Typography  variant="caption" color="textSecondary">No rows ...</Typography>}
      </div>
  </div>
}

ObservableEmpty.propTypes = { children: PropTypes.node }

export default ObservableEmpty