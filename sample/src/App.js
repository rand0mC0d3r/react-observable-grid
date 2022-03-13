import { Typography } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useEffect, useMemo, useState } from 'react';
import GridColumnsNg from './components/GridColumnsNg';
import GridHeadersNg from './components/GridHeadersNg';
import GridRowsNg from './components/GridRowsNg';
import GridStatsNg from './components/GridStatsNg';
import { Grid } from './components/GridStoreNg';
import { files } from './parts/sample';

const App = () => {
  const [data, setData] = useState([]);
  const [hideAll, setHideAll] = useState(false);

  const theme = useMemo(() => createTheme({ palette: { type: 'light', } }), [])
  const classes = useStyles()

  useEffect(() => {
    setData(files.tree)
  }, [])

  const global =  {
		alternatingRows: {
			enabled: true,
			stepping: (index) => index % 2 === 0,
    },
    sort: {
      initialDirection: 'asc',
      initialColumn: 'type',
    },
    style: {
      padding: '16px',
      rowPadding: '8px 16px',
      gap: '8'
    }
  }

	const grid = [
		{
      header: {
        key: 'type',
        align: 'flex-start',
				width: '100px',
				visible: true,
				component: ({onSort}) => <Typography onClick={onSort} color="textSecondary" variant="subtitle2">Type</Typography>,
			},
      row: {
        key: 'type',
        component: ({ type }) => <div>
          {type}
        </div>,
			}
    },
    {
      header: {
        key: 'path',
				width: '2fr',
				visible: true,
        component:  () => <Typography color="textSecondary" variant="caption">Path</Typography>,
			},
      row: {
        key: 'role',
        component: ({ path }) => <div>{path}</div>,
			}
		},
		{
      header: {
        key: 'size',
				width: '100px',
        visible: true,
        align: 'flex-end',
        component:  () => <Typography color="textSecondary" variant="caption">File size</Typography>,
			},
      row: {
        key:  'size',
        component: ({ size }) => <Typography variant="caption">{size}</Typography>
			}
		},
		{
      header: {
        key: 'sha',
				width: '300px',
        visible: true,
        align: 'flex-end',
        component: () =>  <Typography color="textSecondary" variant="caption">SHA</Typography>,
			},
      row: {
        key: 'sha',
        component: ({ sha }) => <Typography variant="caption">{sha}</Typography>,
			}
		}
	]



  return <ThemeProvider {...{ theme }} >
    {1 === 1 && <Grid {...{ data: data, grid, global }}>
      {/* <GridHeadersNg >
        {({ headers }) => headers.map(({ key, component, sort }) => <div key={key}>
          {component}
          {sort.column === key && <>{sort.direction === 'asc' ? '↑' : '↓'}</>}
        </div>)}
      </GridHeadersNg> */}
      <GridHeadersNg />
      <GridColumnsNg >
        {/* {({ columns }) => columns.map(({ key, align }) => <div key={key}>|</div> )} */}
      </GridColumnsNg>
      <GridRowsNg>
        {({ rows, rowProps, styleProps }) => rows.map(({ key, component, alternating }) => <div
          {...rowProps}
          {...{
            key,
            style: {
              ...styleProps,
              borderBottom: '1px solid #DDD',
              backgroundColor: alternating ? '#f0f0f077' : '#ffffff77'
            }
          }}>
          {component}
        </div>)}
      </GridRowsNg>
      <GridStatsNg className={classes.stats}>
        {({ total, sort }) => <div >
          {total} {sort.column} {sort.direction}
        </div>}
      </GridStatsNg>
    </Grid>}
  </ThemeProvider>
}

const useStyles = makeStyles(() => ({
  observableGrid: {
    '& #Header-wrapper': {
      boxShadow: 'none',
      backgroundColor: "#BBBBBB42",
      borderBottom: '1px solid #4052b5',
    },
    '& #Row-root': {
      borderBottom: '1px solid #CCC',
    },
    // '& #Container-root > *': {
    //   borderBottom: '1px solid #CCC'
    // },
    '& #Container-root > *:hover': {
      backgroundColor: '#3f51b51c',
    },
    '& #Container-root > *:active': {
      backgroundColor: '#3f51b51c',
    },
    '& #Container-root .Row-isSelected': {
      backgroundColor: 'red',
    }
  },
  stats: {
    position: 'absolute',
    backgroundColor: '#BBB',
    border: '1px solid #888',
    right: '16px',
    padding: '16px',
    bottom: '16px'
  },
  wrapper: {
    display: 'flex',
    gap: '16px',
    left: '24px',
    right: '24px',
    top: '24px',
    bottom: '24px',
    flexDirection: 'column',
    position: 'absolute',
    alignContent: 'stretch',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  wrapperClean: {
    display: 'flex',
    gap: '16px',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    flexDirection: 'column',
    position: 'absolute',
    alignContent: 'stretch',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  wrapper2: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  smallActions: {
    gap: '4px',
  },
  bigContainer: {
    minHeight: '60px'
  },
  containerWrapper: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    flex: '1 0 auto',
    position: 'relative',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid #CCC',
    // border: '1px solid rgb(230, 230, 230)',
    // borderTop: '4px solid rgb(204, 0, 0)',
  },
  containerClean: {
    flex: '1 0 auto',
    position: 'relative',
    // borderRadius: '8px',
    overflow: 'hidden',
    // border: '1px solid #333',
  }
}))

export default App;
