import { Chip, Popover, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';

const anchorOrigin = { vertical: 'bottom', horizontal: 'center' }
const transformOrigin = { vertical: 'top', horizontal: 'center' }

const ObservableHeaderFilter = ({ label, icon, key, popover }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'customFilter-popover' : undefined;

  const handleClick = (event) => { setAnchorEl(event.currentTarget) };
  const onClose = () => { setAnchorEl(null) };

  return <>
    {open && <Popover {...{ id, open, anchorEl, anchorOrigin, transformOrigin, onClose, elevation: 1, key: `${key}-popover`}}>
      <div className={classes.popoverRoot}>
        <div className={classes.popoverContent}>{popover}</div>
        <div className={classes.popoverExtra}>
          <Typography variant="caption" color="textSecondary">Custom injected search element</Typography>
        </div>
      </div>
    </Popover>}
    <Chip {...{label, icon, size: 'small', onClick: handleClick, key: `${key}-chip`, variant: 'outlined'}}/>
  </>
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