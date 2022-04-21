/* eslint-disable import/no-anonymous-default-export */
import { Chip, Popover, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HistoryIcon from '@material-ui/icons/History';
import { useEffect, useState } from 'react';

export default ({ searchTerm, setSearchTerm, setCurrentSearchTerm }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [historicalItems, setHistoricalItems] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {

  }, [historicalItems])

  useEffect(() => {
    if (searchTerm) {
      // setHistoricalItems(historicalItems => historicalItems.filter(item => item.searchTerm !== searchTerm))
      setHistoricalItems(historicalItems => [{ searchTerm, date: new Date() }, ...historicalItems])
    }
  }, [searchTerm])

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const theme = useTheme()
  const classes = styles(theme)

  return <div style={{ marginRight: '4px'}}>
    <Chip size="small" variant="outlined" icon={<HistoryIcon/>} label={historicalItems.length} onClick={handleClick} />
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center',}}
        transformOrigin={{ vertical: 'top', horizontal: 'center',}}
    >
      <div style={{ border: '1px solid #CCC', display: 'flex', flexDirection: 'column', gap: '0px', margin: '8px' }}>
        {historicalItems.map(({ searchTerm, date }, index) => (
          <div key={index} className={classes.container}>
            <Chip variant='outlined' size="small" onClick={() => {
              setSearchTerm(searchTerm)
              setCurrentSearchTerm(searchTerm)
            }}
              label={searchTerm}
            />
            <Typography variant="body2">{date.toLocaleString()}</Typography>
          </div>
        ))}
        </div>
      </Popover>

  </div>

}

const styles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    gap: '4px',
    flexWrap: 'nowrap',
    padding: '4px',
    alignItems: 'center',

    '&:hover': {
      backgroundColor: '#eaedfe'
    }
  }
}))