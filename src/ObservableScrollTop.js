import { Tooltip } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

const ObservableScrollTop = ({ selectedIndex, isAtTop, customActions, total = 0, filtered = 1 }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const predefinedActions = [
    { id: 'selected', tooltip: `Scroll to item: ${selectedIndex}`, label: `→ ${selectedIndex + 1}`, visible: selectedIndex },
    { id: 'first', tooltip: `Scroll to top: ${selectedIndex}`, label: '↑', visible: isAtTop }
  ]

  const focusElement = (id) => {
    const requestedElement = document.getElementById(id)
    if(requestedElement) {
      requestedElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return <div className={classes.root}>
    {customActions}
    {predefinedActions
      .filter(item => item !== false)
      .map(({ id, label }) => <Tooltip key={id} title={`Scroll to ${id}`} arrow>
        <div onClick={() => focusElement(id)} className={classes.item}>{label}</div>
      </Tooltip>)}


    {filtered !== total && <Tooltip title={`Filtered rows: ${filtered}`} arrow>
      <div className={classes.item}><SearchIcon style={{fontSize: '18px'}} /> {filtered}</div>
    </Tooltip>}

    <Tooltip title={`Total rows: ${total}`} arrow>
      <div className={classes.item}>{total}</div>
    </Tooltip>

  </div>
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    display: 'flex',
    gap: '8px',
    zIndex: '1',
    alignItems: 'center',
  },
  item: {
    fontWeight: 'bold',
    border: `1px solid ${theme.palette.divider}`,
    padding: '10px 16px',
    borderRadius: theme.shape.borderRadius,
    backdropFilter: 'blur(4px)',
    gap: theme.spacing(0.5),

    '&:hover': {
      backdropFilter: 'blur(4px) brightness(1.05)',
    }
  },
}))

export default ObservableScrollTop