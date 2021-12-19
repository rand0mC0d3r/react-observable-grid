import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const ObservableScrollTop = ({ selectedIndex }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const focusElement = (id) => {
    const requestedElement = document.getElementById(id)
    if(requestedElement) {
      requestedElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return <>
    {selectedIndex && <div onClick={() => focusElement('selected')} className={classes.container}style={{ right: '80px' }}>
      selected {selectedIndex}
    </div>}
    <div onClick={() => focusElement('first')} className={classes.container} style={{ right: '20px' }}>
      UP
    </div>
  </>
}

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    bottom: '20px',
    zIndex: '1',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: `${theme.palette.background.default}`,
    padding: '10px',
    borderRadius: '8px',

    '&:hover': {
      backgroundColor: `${theme.palette.divider} !important`,
    }
  },
}))

export default ObservableScrollTop