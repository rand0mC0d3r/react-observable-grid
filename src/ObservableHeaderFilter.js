import { Chip, Popover, Tooltip } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';

const anchorOrigin = { vertical: 'bottom', horizontal: 'center' }
const transformOrigin = { vertical: 'top', horizontal: 'center' }

const ObservableHeaderFilter = ({ width, label, icon, tooltip = "Filtering mechanic", popover, popoverExtras, onDelete }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const divRef = React.useRef();
  const id = 'filters-section';

  const onClick = () => setAnchorEl(divRef.current);
  const onClose = () => setAnchorEl(null);

  return <div ref={divRef}>
    <Popover {...{ id, key: `${label}_popover`, open, anchorEl, anchorOrigin, transformOrigin, onClose, elevation: 1 }}>
      {open && <div className={classes.popoverRoot} style={{ width }}>
        <div className={classes.popoverContent}>{popover}</div>
        {popoverExtras && <div className={classes.popoverExtra}>{popoverExtras}</div>}
      </div>}
    </Popover>
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
  popoverRoot: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    minWidth: '300px',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
  },
  popoverContent: {
    backgroundColor: theme.palette.background.default,
    padding: '16px 16px',
  },
  popoverExtra: {
    borderTop: `1px solid ${theme.palette.primary.main}`,
    display: 'flex',
    padding: '12px 16px',
    gap: '8px',
    flexWrap: 'wrap'
  },
}))

export default ObservableHeaderFilter