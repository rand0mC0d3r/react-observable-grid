import { Tooltip } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const ActionButtons = ({ selectedIndex, isAtTop, customActions, total, filtered }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const predefinedActions = [
    { id: 'first', onClick: () => focusElement('first'), title: `Scroll to beginning`, label: '↑', visible: isAtTop },
    { id: 'selected', onClick: () => focusElement('selected'), title: `Scroll to item: ${selectedIndex + 1}`, label: `→ ${selectedIndex + 1}`, visible: selectedIndex },
    { id: 'filtered', title: `Filtered rows: ${filtered}`, label: <><SearchIcon style={{fontSize: '18px'}} /> {filtered}</>, visible: filtered !== total && total > 0 },
    { id: 'total', title: `Total rows: ${total}`, label: total, visible: total > 0 }
  ]

  const focusElement = (id) => {
    const requestedElement = document.getElementById(id)
    if(requestedElement) {
      requestedElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return <div className={classes.root}>
    {predefinedActions.filter(item => item.visible).map(({ id, label, title, onClick }) => <Tooltip {...{ title }} key={id} arrow>
      <div onClick={onClick && onClick} className={clsx([classes.item, onClick && classes.actionItem])}>{label}</div>
    </Tooltip>)}
    {customActions}
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
    alignItems: 'flex-end',
  },
  actionItem: {
    cursor: 'pointer',
  },
  item: {
    fontWeight: 'bold',
    border: `1px solid ${theme.palette.divider}`,
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backdropFilter: 'blur(4px)',
    lineHeight: '16px',
    gap: theme.spacing(0.5),
    userSelect: 'none',

    '&:hover': {
      backdropFilter: 'blur(4px) brightness(1.05)',
      boxShadow: `inset 0px 0px 0px 1px ${theme.palette.divider}`,
    }
  },
}))

ActionButtons.defaultProps = {
  total: 0,
  filtered: 0,
}

ActionButtons.propTypes = {
  selectedIndex: PropTypes.number,
  total: PropTypes.number,
  filtered: PropTypes.number,
  customActions: PropTypes.node.isRequired,
  isAtTop: PropTypes.bool,
}

export default ActionButtons