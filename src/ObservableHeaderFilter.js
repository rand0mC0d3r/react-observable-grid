import { Chip, Popover, Switch, Tooltip } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ShortTextIcon from '@material-ui/icons/ShortText';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import React from 'react';

const anchorOrigin = { vertical: 'bottom', horizontal: 'center' }
const transformOrigin = { vertical: 'top', horizontal: 'center' }

const ObservableHeaderFilter = ({ width, checked, onChange, label, icon, tooltip = "Filtering mechanic", popover, popoverExtras, onDelete }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const divRef = React.useRef();
  const id = 'filters-section';

  const onClick = () => setAnchorEl(divRef.current);
  const onClose = () => setAnchorEl(null);

  return <div ref={divRef}>
    {open && <Popover {...{ id, className: classes.popover, key: `${label}_popover`, open, anchorEl, anchorOrigin, transformOrigin, onClose, elevation: 2 }}>
      <div className={classes.root} style={{ width }}>
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
          </div>
        </div>
        <div className={classes.popoverContent}>{popover}</div>
        {popoverExtras && <div className={classes.popoverExtra}>{popoverExtras}</div>}
      </div>
    </Popover>}
    <Tooltip arrow title={tooltip}>
      <Chip {...{ label, icon, onDelete, onClick,
          size: 'small',
          key: `${label}_popover_chip`,
          variant: 'outlined'
        }}
        aria-describedby={id}
        />
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
    // borderRadius: theme.shape.borderRadius,
    minWidth: '300px',
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