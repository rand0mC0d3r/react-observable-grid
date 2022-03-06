import { Avatar, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TuneIcon from '@material-ui/icons/Tune';
import { memo } from 'react';
import stringToColor from 'string-to-color';
import GridHeadersNg from '../components/GridHeadersNg';


const GridHeaders = ({  }) => {
  const theme = useTheme()
  const classes = gridHeadersStyles(theme)
  return <>
    <GridHeadersNg className={classes.headers}>
      {headers => headers.map(({ key, component, sort, onSort }) => <div className={classes.header} key={key}>
        <Typography
          onClick={() => onSort(key)}
          color={sort.active ? 'primary' : 'textPrimary'}
          variant='subtitle2'>{component}</Typography>
        {sort.active && <div className={classes.sortArrow}>{sort.direction === 'asc' ? '↑' : '↓'}</div>}
      </div>)}
    </GridHeadersNg>
  </>
}

const gridHeadersStyles = makeStyles(() => ({
  sortArrow: {
    border: '1px solid #adadad',
    borderRadius: '50%',
    padding: '0px 4px'
  },
  headers: {
    backgroundColor: '#3f51b51c',
    borderBottom: '1px solid red',
    padding: '16px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
}))

export { GridHeaders };
