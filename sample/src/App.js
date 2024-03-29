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
import { useEffect, useMemo, useState } from 'react';
import { ObservableGrid } from 'react-observable-grid';
import LocalObservableGrid from './components/ObservableGrid';
import { dataGenerator } from './parts/dataGenerator';
import { ActionsRow, AvatarRow, Card, CurrencyRow, DescriptionRow, LastSeenRow, NamesRow, RoleRow, RowTabs, TilesRow } from './parts/SampleRow';

const App = () => {
  const [rows, setRows] = useState(dataGenerator(100));
  const [isColumned, setIsColumned] = useState(true);
  const [hideAll, setHideAll] = useState(false);
  const [testOptions, setTestOptions] = useState({ foo: 'bar' });
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [selectedAvatars, setSelectedAvatars] = useState([]);
  const [isDebugging, setIsDebugging] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [hasProgressBar, setHasProgressBar] = useState(false);
  const [hasFloatingActions, setHasFloatingActions] = useState(true);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [noHeaders, setNoHeaders] = useState(false);
  const [customHeader, setCustomHeader] = useState(false);
  const [canvasDrawing, setCanvasDrawing] = useState(false);
  const [seeLive, setSeeLive] = useState(false);
  const [asGrid, setAsGrid] = useState(false);
  const theme = useMemo(() => createTheme({ palette: { type: 'light', } }), [])
  const classes = useStyles()

  const [value, setValue] = useState([-1,-1]);
  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue);
  };

  const headers = [
    {
      label: 'Full Name',
      tooltip: "Filter users by name",
      property: 'fullName',
      customFilter: (rows) => selectedAvatars.length > 0 ? rows.filter((row) => selectedAvatars?.some(sa => sa.fullName === row.fullName)) : rows,
      suggestions: (data) => Array.from(new Set(data.map(row => row.fullName.split(" ")).flat())).sort((a, b) => a.length - b.length).reverse().slice(0, 20),
      width: 'minmax(200px, 1fr)',
      extraFilters: [
        {
          label: 'People',
          icon: <PersonOutlineIcon />,
          func: (rows) => rows,
          variable: selectedAvatars,
          node: (incomingRows) => {
            const rowsProcessed = rows.map(r => ({ fullName: r.fullName, name: r.name, surname: r.surname }))
            const entries = [...new Map(rowsProcessed.map(item => [item['fullName'], item])).values()];
            return <div style={{ display: 'flex', gap: '8px', padding: '8px', flexDirection: 'column' }}>
              <Typography variant="subtitle2">People ({entries.length}) ({incomingRows.length})</Typography>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                {entries.filter((e, index) => index < 35).map(entry => <AvatarRow
                  key={`${entry.fullName}_all`}
                  opacity={selectedAvatars?.some(sa => sa.fullName === entry.fullName) ? 1 : 0.5}
                  {...{ selectedAvatars, name: entry.name, surname: entry.surname, fullName: entry.fullName }}
                  onSelectAvatar={({ fullName, surname, name }) => setSelectedAvatars(selectedAvatars => selectedAvatars.some(sa => sa === fullName)
                    ? selectedAvatars.filter(sa => sa !== fullName)
                    : [...selectedAvatars, { fullName, surname, name }]
                  )}
                />)}
              </div>
            </div>
          },
        }
      ],
      // extension: <>
      //   {selectedAvatars.length > 0 && <Chip onDelete={() => setSelectedAvatars([])} variant="outlined" size="small" label={`People: ${selectedAvatars.length}`} />}
      // </>,
      row: (row) => <div style={{ display: 'flex', gap: '8px', flexWrap: 'nowrap'}}>
        <AvatarRow
          {...{ selectedAvatars, fullName: row.fullName, name: row.name, surname: row.surname }}
          onSelectAvatar={({ fullName, surname, name }) => setSelectedAvatars(selectedAvatars => selectedAvatars.some(sa => sa.fullName === fullName)
          ? selectedAvatars.filter(sa => sa.fullName !== fullName)
          : [...selectedAvatars, { fullName, surname, name }]
        )}
        />
        <NamesRow {...{name: row.name, surname: row.surname}} />
      </div>,
      secondaryHeaders: [
        {
          label: 'Name',
          property: 'name'
        },
        {
          label: 'Surname',
          property: 'surname'
        }

      ]
    },
    {
      label: 'Role',
      tooltip: "Filter users by role",
      property: 'role',
      suggestions: (data) => Array.from(new Set(data.map(row => row.role).flat())).sort((a, b) => a.length - b.length).reverse().slice(0, 10),
      width: 'minmax(90px, 0.75fr)',
      row: (row) => <RoleRow {...{ role: row.role }} />,
    },
    {
      label: 'Description',
      suggestions: (data) => Array
        .from(new Set(data
          .map(row => row.description.split(" "))
          .flat()
          .map(entry => entry.replace(/[^a-zA-z0-9]/gi, ''))))
        .sort((a, b) => b.length - a.length)
        .filter(entry => entry.length > 2)
        .slice(0, 20),
      icon: <SubjectIcon />,
      property: 'description',
      row: (row) => <DescriptionRow {...{ description: row.description }} />,
      width: 'minmax(80px, 2fr)',
    },
    {
      label: 'Tiles',
      noSearch: true,
      icon: <DashboardIcon />,
      customFilter: (rows) => rows.filter((row) => selectedTiles.filter(st => row.tiles.some(t => t.id === st)).length === selectedTiles.length),
      suggestions: (data) => Array.from(new Set(data.map(row => row.tiles.map(tile => tile.name)).flat())),
      property: 'tilesHash',
      width: 'minmax(100px, 1.5fr)',
      // extension: <>
      //   {selectedTiles.length > 0 && <Chip onDelete={() => setSelectedTiles([])} variant="outlined" size="small" label={`Tiles: ${selectedTiles.length}`} />}
      // </>,
      row: (row) => <TilesRow row={row} selectedTiles={selectedTiles} onSelectTile={(tile) => {
        setSelectedTiles(selectedTiles => selectedTiles.some(st => st === tile)
        ? selectedTiles.filter(st => st !== tile)
        : [...selectedTiles, tile]
        )
      }}  />,
      secondaryHeaders: [
        {
          label: 'Tiles Count',
          property: 'tiles',
        },
      ]
    },
    {
      label: 'Price',
      icon: <MonetizationOnIcon />,
      property: 'price',
      suggestions: (data) => Array.from(new Set(data.map(row => row.currency).flat())),
      align: 'flex-end',
      extraFilters: [
        {
          label: `Prices`,
          icon: <AccountBalanceWalletIcon />,
          tooltip: 'Prices range',
          func: (rows) => value[0] !== -1 ? rows.filter((row) => value[0] <= row.price.split(' ')[0] && row.price.split(' ')[0] <= value[1]) : rows,
          variable: value,
          node: () => {
            const entries = rows.map(r => r.price.split(' ')[0] * 1000).sort((a, b) => a - b);
            return <div style={{ display: 'flex', gap: '16px', padding: '8px', alignItems: 'center'}}>
              <Typography variant="caption" color="textSecondary">{Math.round(entries.slice(0, 1) / 1000)}</Typography>
              <Typography variant="caption" color="primary">{value[0]}</Typography>
              <Slider
                value={value}
                min={Math.round(entries.slice(0, 1) / 1000)}
                max={Math.round(entries.slice(-1) / 1000)}
                onChange={handleChange}
                valueLabelDisplay="off"
                aria-labelledby="continuous-slider"
              />
              <Typography variant="caption" color="primary">{value[1]}</Typography>
              <Typography variant="caption" color="textSecondary">{Math.round(entries.slice(-1) / 1000)}</Typography>
            </div>
          },
        }
      ],
      width: 'minmax(130px, 200px)',
      row: (row) => <CurrencyRow row={row} />,
      secondaryHeaders: [
        {
          label: 'Currency',
          property: 'currency',
        },
      ]
    },
    {
      label: "Last Seen",
      suggestions: (data) => Array.from(new Set(data.map(row => row.lastSeen).flat())),
      align: 'flex-end',
      property: 'lastSeen',
      // noSearch: true,
      onHover: (row) => <ActionsRow />,
      row: (row) => <LastSeenRow  {...{ lastSeen: row.lastSeen }} />,
      width: 'minmax(130px, 0.75fr)',
      // noHightlight: true,
      secondaryHeaders: [
        {
          noSort: true,
          label: 'Actions',
          property: '',
        },
      ]
    },
  ]

  const headersGrid = [
    {
      label: 'Entries',
      tooltip: "Filter users by name",
      icon: <ViewAgendaIcon />,
      property: 'name',
      canCanvas: true,
      width: 'minmax(200px, 1fr)',
      row: (row) => <Card row={row}  selectedTiles={selectedTiles} onSelectAvatar={(fullName) => {
        setSelectedAvatars(selectedAvatars => selectedAvatars.some(sa => sa === fullName)
          ? selectedAvatars.filter(sa => sa !== fullName)
          : [...selectedAvatars, fullName]
        )
      }} onSelectTile={(tile) => {
        setSelectedTiles(selectedTiles => selectedTiles.some(st => st === tile)
        ? selectedTiles.filter(st => st !== tile)
        : [...selectedTiles, tile]
        )
      }} />,
    },
  ]

  const generateRows = (count) => {
    setRows(dataGenerator(count));
  }

  return <ThemeProvider {...{ theme }} >
    <div className={hideAll ? classes.wrapperClean : classes.wrapper}>
      {!hideAll && <div className={`${classes.actions} ${classes.bigContainer}`}>
        <div className={classes.actions}>
          <Typography color="textPrimary" variant="h3">👀 🗞️</Typography>
          <Typography
            color="textPrimary"
            style={{ border: '2px dotted #CCC', padding: '4px 12px', borderRadius: '8px', userSelect: 'all', backgroundColor: "#dbffdb" }}
            variant="h6"
          >npm i react-observable-grid</Typography>
          <IconButton title="Open NPM link ..." onClick={() => window.open('https://www.npmjs.com/package/react-observable-grid')}>
            <OpenInNewIcon />
          </IconButton>
          <IconButton title="Open Github link ..." onClick={() => window.open('https://github.com/rand0mC0d3r/react-observable-grid')}>
            <GitHubIcon />
          </IconButton>
        </div>
        <div className={`${classes.actions} ${classes.smallActions}`}>
          <Chip onClick={() => setIsDebugging(!isDebugging)} variant="outlined" label={`Debug ${isDebugging ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setIsDiscovering(!isDiscovering)} variant="outlined" label={`Discover ${isDiscovering ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setNoHeaders(!noHeaders)} variant="outlined" label={`Headers ${noHeaders ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setTestOptions({ foo: 'baz' })} variant="outlined" label={`Options ${JSON.stringify(testOptions)}`} />
          <Chip onClick={() => setHasProgressBar(!hasProgressBar)} variant="outlined" label={`Progress bar ${hasProgressBar ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setHasFloatingActions(!hasFloatingActions)} variant="outlined" label={`Floating ${hasFloatingActions ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setIsColumned(!isColumned)} variant="outlined" label={`Columns ${isColumned ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setCustomHeader(!customHeader)} variant="outlined" label={`Custom H ${customHeader ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setIsHeaderHidden(!isHeaderHidden)} variant="outlined" label={`Hide H ${isHeaderHidden ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setCanvasDrawing(!canvasDrawing)} variant="outlined" label={`🧪 Canvas ${canvasDrawing ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setHideAll(!hideAll)} variant="outlined" label={`🧪 Destroy UI ${hideAll ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setSeeLive(!seeLive)} variant="outlined" label={`Env ${seeLive ? 'PROD' : 'DEV'}`} />
          <Chip onClick={() => setAsGrid(!asGrid)} variant="outlined" label={`Grid ${asGrid ? 'GRID' : 'TABLE'}`} />
        </div>
      </div>}

      {!hideAll && <div className={`${classes.actions} ${classes.bigContainer}`}>
        <div className={`${classes.actions} ${classes.smallActions}`}>
          {[5, 30, 250, 1500, 65000, 100000].map(count => <Button
            disableElevation
            style={{ minWidth: 'unset', padding: '5px 12px' }}
            color={count === rows?.length ? 'primary' : 'default'}
            variant={count !== rows?.length ? "outlined" : 'contained'}
            key={count}
            onClick={() => generateRows(count)}
          >
            {count}
          </Button>)}
        </div>
      </div>}

      <div className={classes.containerWrapper}>
        <div className={hideAll ? classes.containerClean : classes.container}>
          {seeLive
            ? <ObservableGrid {...{ isDebugging, headers: asGrid ? headersGrid : (noHeaders ? undefined : headers), canvasDrawing }}
                uniqueId="fakeEntries"
                customActions={<Fab size="small" color="primary" onClick={() => { alert('I am inserted by the developer')}} aria-label="add">
                  <AddIcon />
                </Fab>}
                testOptions={testOptions}
                hasProgressBar={hasProgressBar}
                isOmittingColumns={['uuid', 'tilesHash']}
                isGrid={asGrid ? 4 : undefined}
                isAlternating={asGrid ? false : true}
                pageSize={asGrid ? 100 : 50}
                isHeaderHidden={isHeaderHidden}
                canvasDrawing={false}
                isDiscovering={isDiscovering}
                isColumned={asGrid ? false : isColumned}
                className={classes.observableGrid}
                hasFloatingActions={hasFloatingActions}
                isClearingOnBlur={true}
                rowOptions={{ padding: '8px 16px 8px 16px' }}
                headerOptions={{ padding: '4px 16px 4px 16px' }}
                rows={rows}
                emptyElement={<Typography variant="caption" color="textSecondary">No data found ...</Typography>}/>
            : <>
              {/* <LocalObservableGrid
                className={classes.observableGrid}
                rows={rows}
              /> */}
              <LocalObservableGrid {...{ isDebugging, headers: asGrid ? headersGrid : (noHeaders ? undefined : headers), canvasDrawing }}
                uniqueId="fakeEntries"
                customActions={<Fab size="small" color="primary" onClick={() => { alert('I am inserted by the developer')}} aria-label="add">
                  <AddIcon />
                </Fab>}
                testOptions={testOptions}
                hasProgressBar={hasProgressBar}
                // isOmittingColumns={['uuid', 'tilesHash']}
                isGrid={asGrid ? 4 : undefined}
                isAlternating={asGrid ? false : true}
                pageSize={asGrid ? 100 : 50}
                isHeaderHidden={isHeaderHidden}
                canvasDrawing={false}
                isDiscovering={isDiscovering}
                isColumned={asGrid ? false : isColumned}
                className={classes.observableGrid}
                hasFloatingActions={hasFloatingActions}
                isClearingOnBlur={true}
                rowOptions={{ padding: '8px 16px 8px 16px' }}
                headerOptions={{ padding: '4px 16px 4px 16px' }}
                rows={rows}
                emptyElement={<Typography variant="caption" color="textSecondary">No data found ...</Typography>}
              />
            </>}
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
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #333',
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
