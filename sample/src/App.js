import { Button, Chip, Fab, IconButton, Slider, Typography } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GitHubIcon from '@material-ui/icons/GitHub';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SignalCellular3BarIcon from '@material-ui/icons/SignalCellular3Bar';
import SubjectIcon from '@material-ui/icons/Subject';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { ObservableGrid } from 'react-observable-grid';
import GridColumnsNg from './components/GridColumnsNg';
import GridDebug from './components/GridDebug';
import GridHeadersNg from './components/GridHeadersNg';
import GridRowsNg from './components/GridRowsNg';
import GridStatsNg from './components/GridStatsNg';
import { Grid } from './components/GridStoreNg';
import HeadlessActionButtons from './components/HeadlessActionButtons';
import HeadlessColumns from './components/HeadlessColumns';
import HeadlessContainer from './components/HeadlessContainer';
import HeadlessDebugging from './components/HeadlessDebugging';
import HeadlessRowList from './components/HeadlessRowList';
import LocalObservableGrid from './components/ObservableGrid';
import { dataGenerator } from './parts/dataGenerator';
import { GridHeaders } from './parts/GridHeaders';
import { ActionsRow, AvatarRow, Card, CurrencyRow, DescriptionRow, LastSeenRow, NamesRow, RoleRow, RowTabs, TilesRow } from './parts/SampleRow';
import { ActionButtons } from './parts/Tooling';

const App = () => {
  const [data, setData] = useState(dataGenerator(10));
  const [hideAll, setHideAll] = useState(false);

  const theme = useMemo(() => createTheme({ palette: { type: 'light', } }), [])
  const classes = useStyles()

  const [value, setValue] = useState([-1,-1]);
  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue);
  };


  const global =  {
		alternatingRows: {
			enabled: true,
			stepping: (index) => index % 2 === 0,
    },
    sort: {
      initialDirection: 'asc',
      initialColumn: 'name',
    },
    style: {
      padding: '16px',
      gap: '8'
    }
  }

	const grid = [
		{
      header: {
        extraKeys: ['name', 'surname'],
        key: 'fullName',
        align: 'flex-start',
				width: '1fr',
				visible: true,
				component: <>Name</>,
			},
      row: {
        key: 'namer',
        component: ({ name, surname }) => <div style={{ display: 'flex', gap: '8px'}}>
          <AvatarRow {...{name, surname}}/>
          <NamesRow {...{name, surname}} />
        </div>,
			}
    },
    {
      header: {
        key: 'role',
				width: '150px',
				visible: true,
        component: <>Role</>,
			},
      row: {
        key: 'role',
        component: (row) => <RoleRow {...{row}} />,
			}
		},
		{
      header: {
        key: 'fullName',
				width: '1fr',
				visible: true,
        component: <>FullName</>,
			},
      row: {
        key: 'fullNamer',
        component: (row) => <>{row.fullName}</>,
			}
		},

		{
      header: {
        key: 'description',
				width: '2fr',
				visible: true,
        component: <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <SubjectIcon />
          <Typography variant="caption">Description</Typography>
        </div>,
			},
      row: {
        key:  'descriptionr',
        component: (row) => <>{row.description}</>,
			}
		},
		{
      header: {
        extraKeys: ['currency'],
        key: 'amount',
				width: '200px',
        visible: true,
        align: 'flex-end',
        component: 'Currency',
			},
      row: {
        key:  'currency',
        component: (row) => <CurrencyRow {...{row}} />,
			}
		},
		{
      header: {
        key: 'currency',
				width: '200px',
        visible: true,
        component: <>Currency left</>,
			},
      row: {
        key:  'currencyVal',
        component: (row) => <>value</>
			}
		},
		{
      header: {
        key: 'lastSeen',
				width: '200px',
        visible: true,
        align: 'flex-end',
        component: <>Last Seen</>,
			},
      row: {
        key:  'lastSeen',
        component: (row) => <LastSeenRow {...{row}} />,
			}
		}
	]



  return <ThemeProvider {...{ theme }} >
    <div className={hideAll ? classes.wrapperClean : classes.wrapper}>
      <Button variant="outlined" onClick={() => setData(dataGenerator(50))}>Recreate</Button>
      <div className={classes.containerWrapper}>
        <div id="outside" className={hideAll ? classes.containerClean : classes.container}>
          <Grid {...{ data, grid, global }}>
            <GridHeadersNg >
              {/* {({ headers }) => headers.map(({ key, component }) => <div key={key}>{component}</div> )} */}
            </GridHeadersNg>
            {/* <GridColumnsNg /> */}
            <GridRowsNg>
              {({ rows, rowProps, styleProps }) => rows.map(({ key, component, alternating }) => <div
                {...rowProps}
                {...{
                  key,
                  style: {
                    ...styleProps,
                    borderBottom: '1px solid #DDD',
                    padding: '16px',
                    gap: '8px',
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
          </Grid>
          </div>
        </div>
      </div>
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
