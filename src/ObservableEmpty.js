import PropTypes from 'prop-types'
import React from 'react'
import { Typography } from '@material-ui/core'

const ObservableEmpty = ({ children }) => <div
  style={{
    flex: '1 0 auto',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
  {children ? children : <Typography variant="caption" color="textSecondary">No rows ...</Typography>}
</div>

ObservableEmpty.propTypes = { children: PropTypes.node.isRequired }

export default ObservableEmpty