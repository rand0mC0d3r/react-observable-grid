import { Popover, Switch, Tooltip } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ShortTextIcon from '@material-ui/icons/ShortText';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import clsx from 'clsx';
import React, { cloneElement, useRef, useState } from 'react';

const anchorOrigin = { vertical: 'bottom', horizontal: 'center' }
const transformOrigin = { vertical: 'top', horizontal: 'center' }

const ObservableHeaderFilter = ({ extraIcons, checked, onChange, label, icon, tooltip = "Filtering mechanic", popover, popoverExtras, onDelete, toolbarItems }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const open = Boolean(anchorEl);
  const divRef = useRef();
  const id = 'filters-section';

  const onClick = () => setAnchorEl(divRef.current);
  const onClose = () => setAnchorEl(null);

  return <div ref={divRef}>
    {open && <Popover {...{ id, className: classes.popover, key: `${label}_popover`, open, anchorEl, anchorOrigin, transformOrigin, onClose, elevation: 2 }}>
      <div className={classes.root}>
        <div className={classes.toolbar}>
          <div className={classes.menu} >
            <ViewHeadlineIcon />
            <Switch
              checked={checked}
              onChange={onChange}
              name="checkedA"
              color="primary"
              size='small'
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <ShortTextIcon />
            {toolbarItems}
          </div>
        </div>
        <div className={classes.popoverContent}>{popover}</div>
        {popoverExtras && <div className={classes.popoverExtra}>{popoverExtras}</div>}
      </div>
    </Popover>}
    <Tooltip arrow title={tooltip}>
      <div
        {...{ onClick }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={clsx([ label.length > 0 && classes.activeChip, classes.customChip,])}>
          {icon && cloneElement(icon, { className: classes.smallChipIcon})}
          {extraIcons}
          {label && <div className={classes.truncate}>{label}</div>}
      </div>
    </Tooltip>
  </div>
}

const useStyles = makeStyles(theme => ({
  popover: {
    '& .MuiPopover-paper': {
      backgroundColor: '#FFFFFF96',
      marginTop: '8px',
      borderRadius: '0px',
      backdropFilter: 'blur(10px)',
    }
  },
  smallChipIcon: {
    fontSize: '16px',
    color: theme.palette.text.hint,
  },
  activeChip: {
    border: `1px solid ${theme.palette.text.hint} !important`,
  },
  customChip: {
    display: 'flex',
    gap: '4px',
    cursor: 'pointer',
    alignItems: 'center',
    border: `1px dotted ${theme.palette.divider}`,
    padding: '2px 4px',
    borderRadius: theme.shape.borderRadius * 4,

    '&:hover': {
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: `inset 0px 0px 0px 1px ${theme.palette.divider}`,
    }
  },
  truncate: {
    minWidth: '35px',
    maxWidth: '65px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  menu: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#DDDDDD96',
    flexDirection: 'row-reverse',
    padding: '4px 16px'
  },
  root: {
    display: 'flex',
    width: '350px',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
  },
  popoverContent: {
    backgroundColor: theme.palette.background.default,
    padding: '12px',
  },
  popoverExtra: {
    borderTop: `1px solid ${theme.palette.primary.main}`,
    display: 'flex',
    padding: '12px',
    gap: '8px 4px',
    flexWrap: 'wrap'
  },
}))

export default ObservableHeaderFilter