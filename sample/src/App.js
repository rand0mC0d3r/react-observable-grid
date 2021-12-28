import { Button, Chip, IconButton, Slider, Typography } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
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
  const [performance, setPerformance] = useState(0);
  const [isColumned, setIsColumned] = useState(true);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [selectedAvatars, setSelectedAvatars] = useState([]);
  const [isDebugging, setIsDebugging] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
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
      suggestions: () => Array.from(new Set(rows.map(row => row.fullName.split(" ")).flat())).sort((a, b) => a.length - b.length).reverse().slice(0, 10),
      width: 'minmax(175px, 1fr)',
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
              <Typography variant="subtitle2">Selected People ({incomingRows.length})</Typography>
              <div style={{ display: 'flex',  width: '450px', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              {entries.filter((row) => selectedAvatars?.some(sa => sa.fullName === row.fullName)).map(entry => <AvatarRow
                  key={`${entry.fullName}_selected`}
                  {...{ selectedAvatars, name: entry.name, surname: entry.surname, fullName: entry.fullName }}
                  onSelectAvatar={({ fullName, surname, name }) => setSelectedAvatars(selectedAvatars => selectedAvatars.some(sa => sa === fullName)
                    ? selectedAvatars.filter(sa => sa !== fullName)
                    : [...selectedAvatars, { fullName, surname, name }]
                  )}
                />)}
              </div>
              <Typography variant="subtitle2">People ({entries.length})</Typography>
              <div style={{ display: 'flex',  width: '450px', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              {entries.filter((e, index) => index < 35).map(entry => <AvatarRow
                  key={`${entry.fullName}_all`}
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
        <NamesRow row={row} />
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
      suggestions: () => Array.from(new Set(rows.map(row => row.role).flat())).sort((a, b) => a.length - b.length).reverse().slice(0, 10),
      width: 'minmax(60px, 0.75fr)',
      row: (row) => <RoleRow {...{ role: row.role }} />,
    },
    {
      label: 'Description',
      suggestions: (rows) => Array.from(new Set(rows.map(row => row.description.split(" ")).flat())).sort((a, b) => a.length - b.length).reverse().slice(0, 20),
      icon: <SubjectIcon />,
      property: 'description',
      row: (row) => <DescriptionRow row={row} />,
      width: 'minmax(80px, 3fr)',
    },
    {
      label: 'Tiles',
      noSearch: true,
      icon: <DashboardIcon />,
      customFilter: (rows) => rows.filter((row) => selectedTiles.filter(st => row.tiles.some(t => t.id === st)).length === selectedTiles.length),
      suggestions: (rows) => Array.from(new Set(rows.map(row => row.tiles.map(tile => tile.name)).flat())),
      property: 'tilesHash',
      width: 'minmax(100px, 2fr)',
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
      suggestions: () => Array.from(new Set(rows.map(row => row.currency).flat())),
      align: 'flex-end',
      extraFilters: [
        {
          label: `${value[0]} - ${value[1]}`,
          icon: <SignalCellular3BarIcon />,
          tooltip: 'Prices range',
          func: (rows) => rows.filter((row) => value[0] <= row.price.split(' ')[0] && row.price.split(' ')[0] <= value[1]),
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
      width: 'minmax(130px, 250px)',
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
      suggestions: () => Array.from(new Set(rows.map(row => row.lastSeen).flat())),
      align: 'flex-end',
      property: 'lastSeen',
      // noSearch: true,
      onHover: (row) => <ActionsRow {...{ row }} />,
      row: (row) => <LastSeenRow {...{ row }} />,
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
    const t0 = Date.now()
    const rowsGenerated = dataGenerator(count);
    setRows(() => rowsGenerated)
    const t1 = Date.now();
    setPerformance(Math.round(t1 - t0));
  }

  useEffect(() => {
    const entries = rows.map(r => r.price.split(' ')[0] * 1000).sort((a, b) => a - b)
    setValue([Math.round(entries.slice(0, 1) / 1000), Math.round(entries.slice(-1) / 1000)])
  }, [rows])

  return <ThemeProvider {...{ theme }} >
    <div className={classes.wrapper}>
      <div className={`${classes.actions} ${classes.bigContainer}`}>
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
          <Chip onClick={() => setIsColumned(!isColumned)} variant="outlined" label={`Columns ${isColumned ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setCustomHeader(!customHeader)} variant="outlined" label={`Custom H ${customHeader ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setIsHeaderHidden(!isHeaderHidden)} variant="outlined" label={`Hide H ${isHeaderHidden ? 'ON' : 'OFF'}`} />
          <Chip variant="outlined" label={<div style={{ minWidth: '100px', textAlign: 'center' }}>{`Perf: ${performance}ms`}</div>} />
          <Chip onClick={() => setCanvasDrawing(!canvasDrawing)} variant="outlined" label={`🧪 Canvas ${canvasDrawing ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setSeeLive(!seeLive)} variant="outlined" label={`Env ${seeLive ? 'PROD' : 'DEV'}`} />
          <Chip onClick={() => setAsGrid(!asGrid)} variant="outlined" label={`Grid ${asGrid ? 'GRID' : 'TABLE'}`} />
        </div>
      </div>

      <div className={`${classes.actions} ${classes.bigContainer}`}>
        <div className={`${classes.actions} ${classes.smallActions}`}>
          {[5, 30, 250, 1500, 65000, 1000000].map(count => <Button
            disableElevation
            style={{minWidth: 'unset', padding: '5px 12px'}}
            color={count === rows?.length ? 'primary' : 'default'}
            variant={count !== rows?.length ? "outlined" : 'contained'}
            key={count}
            onClick={() => generateRows(count)}
          >
            {count}
          </Button>)}
        </div>
      </div>

      <div className={classes.containerWrapper}>
        <div className={classes.container}>
          {seeLive
            ? <ObservableGrid {...{isDebugging, headers, canvasDrawing }}
              uniqueId="fakeEntries"
              rowOptions={{ padding: '8px 16px' }}
              isColumned={isColumned}
              headerOptions={{ padding: '16px 16px' }}
              rows={rows}
              isEmpty={rows.length === 0}
              emptyElement={<Typography variant="caption" color="textSecondary">No data found ...</Typography>}
            />
            : <LocalObservableGrid {...{ isDebugging, headers: asGrid ? headersGrid : headers, canvasDrawing }}
                uniqueId="fakeEntries"
                isGrid={asGrid ? 4 : undefined}
                isAlternating={asGrid ? false : true}
                pageSize={asGrid ? 100 : 50}
                isHeaderHidden={isHeaderHidden}
                canvasDrawing={false}
                isColumned={asGrid ? false : isColumned}
                className={classes.observableGrid}
                isClearingOnBlur={true}
                rowOptions={{ padding: '8px 16px 8px 16px' }}
                headerOptions={{ padding: '4px 16px 4px 16px' }}
                rows={rows}
                emptyElement={<Typography variant="caption" color="textSecondary">No data found ...</Typography>}
              />}
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
    // '& #Container-root > *:hover': {
    //   backgroundColor: '#e0f0ff88',
    // },
    // '& #Container-root > *:active': {
    //   backgroundColor: '#e0f0ff88',
    // },
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
    borderRadius: '0px 4px 4px 4px',
    border: '1px solid #333',
  }
}))

export default App;
