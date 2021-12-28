import { Chip, Popover, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';

const anchorOrigin = { vertical: 'bottom', horizontal: 'center' }
const transformOrigin = { vertical: 'top', horizontal: 'center' }

const ObservableHeaderFilter = ({ label, icon, tooltip = "Filtering mechanic", popover, popoverExtras, onDelete }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? `customFilter-popover-${label}` : undefined;

  const handleClick = (event) => { setAnchorEl(event.currentTarget) };
  const onClose = () => { setAnchorEl(null) };

  useEffect(() => {
    console.log('rendering popover')
  }, [])

  return <Fragment key={`${label}_popover_and_chip`}>
    {open && <Popover {...{ id, key: `${label}_popover`, open, anchorEl, anchorOrigin, transformOrigin, onClose, elevation: 1}}>
      <div className={classes.popoverRoot}>
        <div className={classes.popoverContent}>{popover}</div>
        {popoverExtras && <div className={classes.popoverExtra}>{popoverExtras}</div>}
      </div>
    </Popover>}
    <Tooltip arrow title={tooltip}>
      <Chip {...{label, icon, size: 'small', key: `${label}_popover_chip`, onDelete, onClick: handleClick, variant: 'outlined'}}/>
    </Tooltip>
  </Fragment>
}

const useStyles = makeStyles(theme => ({
  popoverRoot: {
    display: 'flex',
    gap: '8px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    minWidth: '300px',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
  },
  popoverContent: {
    backgroundColor: theme.palette.background.default,
    padding: '16px 16px',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  popoverExtra: {
    display: 'flex',
    padding: '12px 16px',
    gap: '8px',
    flexWrap: 'wrap'
  },
}))

export default ObservableHeaderFilter