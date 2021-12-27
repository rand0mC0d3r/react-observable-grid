import { Tooltip } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

const ObservableScrollTop = ({ selectedIndex, isAtTop }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const focusElement = (id) => {
    const requestedElement = document.getElementById(id)
    if(requestedElement) {
      requestedElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return <div className={classes.root}>
    {[
      selectedIndex ? { id: 'selected', label: `→ ${selectedIndex + 1}` } : false,
      isAtTop ? { id: 'first', label: '↑' } : false
    ]
      .filter(item => item !== false)
      .map(({ id, label }) => <Tooltip title={`Scroll to ${id}`} arrow>
        <div key={id} onClick={() => focusElement(id)} className={classes.item}>{label}</div>
      </Tooltip>)}
  </div>
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    gap: '8px',
    zIndex: '1',
  },
  item: {
    fontWeight: 'bold',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: `${theme.palette.divider}`,
    padding: '10px 16px',
    borderRadius: '8px',
    opacity: 0.5,
    backdropFilter: 'blur(4px)',

    '&:hover': {
      opacity: 1,
      backgroundColor: '#CCC !important',
    }
  },
}))

export default ObservableScrollTop