import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const ObservableScrollTop = ({ selectedIndex, isAtTop }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const focusElement = (id) => {
    const requestedElement = document.getElementById(id)
    if(requestedElement) {
      requestedElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return <div className={classes.wrapper}>
    {[
      selectedIndex ? { id: 'selected', label: `→ ${selectedIndex + 1}` } : false,
      isAtTop ? { id: 'first', label: '↑' } : false
    ]
      .filter(item => item !== false)
      .map(({ id, label }) => <div key={id} onClick={() => focusElement(id)} className={classes.container}>{label}</div>)}
  </div>
}

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    gap: '8px',
    zIndex: '1',
  },
  container: {
    fontWeight: 'bold',
    border: `1px solid ${theme.palette.augmentColor({ main: theme.palette.divider }).dark}`,
    backgroundColor: `${theme.palette.background.default}`,
    padding: '10px 16px',
    borderRadius: '8px',

    '&:hover': {
      backgroundColor: '#CCC !important',
    }
  },
}))

export default ObservableScrollTop