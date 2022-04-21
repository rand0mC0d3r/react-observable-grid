/* eslint-disable import/no-anonymous-default-export */
import { Button, Popover, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useEffect, useState } from 'react';

export default ({ processedGrid, setProcessedGrid, columnsState, setColumnsState }) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (columnsState.length === 0) {
      setColumnsState(processedGrid.map(({ header }) => ({
        key: header.key,
        align: header.align,
        visible: header.visible === undefined ? true : header.visible
      })))
    }
  }, [processedGrid, columnsState, setColumnsState]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const toggleVisibility = (key) => {
    setColumnsState(columnsState.map(header => {
      if (header.key === key) {
        return {
          key: header.key,
          align: header.align,
          visible: header.visible === undefined ? false : !header.visible,
        }
      }
      return header
    }))
  }

  const swapWithPreviousIndex = (index) => {
    const newProcessedGrid = [...columnsState]
    const [removed] = newProcessedGrid.splice(index, 1)
    newProcessedGrid.splice(index - 1, 0, removed)
    setColumnsState(newProcessedGrid)
  }

  const swapWithNextIndex = (index) => {
    const newProcessedGrid = [...columnsState]
    const [removed] = newProcessedGrid.splice(index, 1)
    newProcessedGrid.splice(index + 1, 0, removed)
    setColumnsState(newProcessedGrid)
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
        // open={true}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center',}}
        transformOrigin={{ vertical: 'top', horizontal: 'center',}}
    >
      <div style={{ border: '1px solid #CCC', display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px' }}>
        {columnsState.map(({ key, visible, align }, index) => <div key={key} className={classes.container}>
          <ChevronLeftIcon onClick={() => swapWithPreviousIndex(index)} />
          <ChevronRightIcon onClick={() => swapWithNextIndex(index)} />
          <Typography
            variant="subtitle2"
            color={visible === undefined || visible ? 'primary' : 'textSecondary'}
            style={{ flex: '1 1 auto' }}
          >{index} . {align} . {key}</Typography>
            {visible === undefined
              ? <VisibilityIcon onClick={() => toggleVisibility(key)} />
              : (visible
                ? <VisibilityIcon onClick={() => toggleVisibility(key)} />
                : <VisibilityOffIcon onClick={() => toggleVisibility(key)} />)}
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