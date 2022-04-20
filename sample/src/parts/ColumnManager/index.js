/* eslint-disable import/no-anonymous-default-export */
import { Button, Popover, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';

export default ({ processedGrid, setProcessedGrid }) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const toggleVisibility = (key) => {
    setProcessedGrid(processedGrid.map(({ header, row}) => {
      if (header.key === key) {
        return {
          header: { ...header, visible: header.visible === undefined ? false : !header.visible },
          row: row
        }
      }
      return { header, row}
    }))
  }

  const swapWithPreviousIndex = (index) => {
    const newProcessedGrid = [...processedGrid]
    const [removed] = newProcessedGrid.splice(index, 1)
    newProcessedGrid.splice(index - 1, 0, removed)
    setProcessedGrid(newProcessedGrid)
  }

  const swapWithNextIndex = (index) => {
    const newProcessedGrid = [...processedGrid]
    const [removed] = newProcessedGrid.splice(index, 1)
    newProcessedGrid.splice(index + 1, 0, removed)
    setProcessedGrid(newProcessedGrid)
  }

  const theme = useTheme()
  const classes = styles(theme)

  return <div>
    <Button variant="outlined" size="large" color="primary" onClick={handleClick}>
        Columns
    </Button>
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center',}}
        transformOrigin={{ vertical: 'top', horizontal: 'center',}}
    >
      <div style={{ border: '1px solid #CCC', display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px' }}>
        {processedGrid.map(({ header, row }, index) => <div key={header.key} className={classes.container}>
          <ChevronLeftIcon onClick={() => swapWithPreviousIndex(index)} />
          <ChevronRightIcon onClick={() => swapWithNextIndex(index)} />
          <Typography
            variant="subtitle2"
            color={header.visible === undefined || header.visible ? 'primary' : 'textSecondary'}
            style={{ flex: '1 1 auto' }}
          >{index} . {header.key}</Typography>
            {header.visible === undefined
              ? <VisibilityIcon onClick={() => toggleVisibility(header.key)} />
              : (header.visible
                ? <VisibilityIcon onClick={() => toggleVisibility(header.key)} />
                : <VisibilityOffIcon onClick={() => toggleVisibility(header.key)} />)}
        </div>)}
        </div>
      </Popover>

  </div>

}

const styles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    gap: '4px',
    flexWrap: 'nowrap',
    padding: '8px',
    alignItems: 'center',

    '&:hover': {
      backgroundColor: '#eaedfe'
    }
  }
}))