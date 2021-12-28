import { Chip, InputAdornment, Popover, TextField, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FunctionsIcon from '@material-ui/icons/Functions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import PropTypes from 'prop-types';
import React, { cloneElement, useCallback, useEffect, useState } from 'react';


const ObservableHeaderFilter = ({
  label,
  icon,
  popover,
  variable,
  triggerReload = () => { },
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => { setAnchorEl(event.currentTarget) };
  const handleClose = () => { setAnchorEl(null) };

  useEffect(() => {
    triggerReload()
  }, [variable])

  return <>
    {open && <Popover
      id={id}
      open={open}
      elevation={1}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div style={{
        display: 'flex',
        gap: '8px',
        backgroundColor: theme.palette.background.paper,
        width: '350px',
        borderRadius: '4px',
        flexDirection: 'column',
        border: `1px solid ${theme.palette.divider}`,
      }}>
        <div style={{
          backgroundColor: theme.palette.background.default,
          padding: '16px 16px',
          borderBottom: `1px solid ${theme.palette.primary.main}`,
        }}>
          {popover}
        </div>
      </div>
    </Popover>}

      <Chip {...{label, icon}}
        onClick={(e) => { handleClick(e) }}
        size="small"
        variant="outlined"
      />
  </>
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  wrapper: {
    display: 'grid',
    fontSize: '12px',
    minHeight: '56px',

    alignItems: 'stretch',
    gridColumnGap: '16px',
    gridRowGap: '16px',

    boxShadow: '0px 5px 3px -5px #00000029',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  arrowColor: {
    color: theme.palette.primary.main
  },
  flexbox: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '4px'
  },
  miniFlexbox: {
    gap: '2px',
  },
  maxiFlexbox: {
    gap: '4px 12px',
  },
  secondaryHeaders: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '8px'
  },
  headersSelectable: {
    // backgroundColor: 'red',
  },
  headersWrapper: {
    // '&:hover': {
      // backgroundColor: 'rgba(0,0,0,0.1)',
    // },
  },
  headers: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    position: 'relative',
    alignSelf: 'stretch',
    gap: theme.spacing(1),

    margin: '0px -4px',
    padding: '0px 4px',
    alignSelf: 'center',
    height: '100%',
    justifyContent: 'center',


  },
  flipped: {
    transform: 'rotate(180deg)'
  }
}))


export default ObservableHeaderFilter