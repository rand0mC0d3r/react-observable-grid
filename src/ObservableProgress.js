import { Tooltip } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

const ObservableProgress =  ({ selectedIndex, currentRow, rowsLength }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const focusElement = () => {
    const requestedElement = document.getElementById('selected')
    if(requestedElement) {
      requestedElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return <div className={classes.progress}>
    <div style={{ position: 'relative' }}>
      <div className={classes.totalProgress} />
      <div className={classes.currentProgress} style={{ width: `${Math.round((currentRow + 1) * 100 / rowsLength)}%` }}></div>
      {selectedIndex && <Tooltip arrow title={`Scroll to row ${selectedIndex} ...`}>
        <div onClick={focusElement} className={classes.selectionProgress} style={{ left: `${Math.round((selectedIndex + 1) * 100 / rowsLength)}%`}} />
      </Tooltip>}
    </div>
  </div>
}

const useStyles = makeStyles((theme) => ({
  progress: {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
  },
  selectionProgress: {
    position: 'absolute',
    borderRadius: '8px',
    top: '-2px',
    width: '8px',
    height: '8px',
    backgroundColor: theme.palette.primary.light,
    border: '1px solid #FFF',
    borderTop: '0px none',
    borderBottom: '0px none',

    '&:hover': {
      boxShadow: `0px 0px 0px 10px ${theme.palette.primary.main}`,
    }
  },
  currentProgress: {
    position: 'absolute',
    borderRadius: '0px 8px 8px 0px',
    top: '0px',
    left: '0px',
    backgroundColor: theme.palette.primary.light,
    width: '0px',
    height: '4px'
  },
  totalProgress: {
    width: '100%',
    backgroundColor: theme.palette.divider,
    height: '4px'
  },
}))

export default ObservableProgress