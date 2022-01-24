import { Avatar, Chip, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TuneIcon from '@material-ui/icons/Tune';
import { memo } from 'react';
import stringToColor from 'string-to-color';

const ActionButtons = ({ total, filtered, selectedIndex, goToTop, goToSelectedIndex }) => {
  const theme = useTheme()
  const classes = tileStyles(theme)
  return <div className={classes.root}>
    <Chip variant='outlined' label={`Total: ${total}`} />
    <Chip variant='outlined' label={`Filtered: ${filtered}`} />
    <Chip variant='outlined' label={`Selected index: ${selectedIndex}`} />
  </div>
}

const tileStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: '8px 8px',
    padding: '4px 0px',
    position: 'absolute',
    right: '4px',
    bottom: '4px'
  },
}))

export { ActionButtons };
