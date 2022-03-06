import { Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Fragment } from 'react';
import GridHeadersNg from '../components/GridHeadersNg';

const GridHeaders = () => {
  const theme = useTheme()
  const classes = gridHeadersStyles(theme)
  return <GridHeadersNg className={classes.headers}>
    {headers => headers.map(({ key, component, sort, onSort, align }) => <Fragment key={key}>
      <div className={classes.header} style={{ justifyContent: align ? align : 'flex-start'}}>
        <Typography
          onClick={() => onSort(key)}
          color={sort.active ? 'primary' : 'textPrimary'}
          variant='subtitle2'
        >
          {component}
        </Typography>
        {sort.active && <>
          <div className={classes.sortArrow}>{sort.direction === 'asc' ? '↑' : '↓'}</div>
        </>}
      </div>
    </Fragment>)}
  </GridHeadersNg>
}

const gridHeadersStyles = makeStyles(() => ({
  sortArrow: {
    border: '1px solid #adadad',
    borderRadius: '50%',
    padding: '0px 4px'
  },
  headers: {
    backgroundColor: '#3f51b51c',
    borderBottom: '2px solid #999',
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
