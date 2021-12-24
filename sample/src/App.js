import { Button, Chip, IconButton, TextField, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GitHubIcon from '@material-ui/icons/GitHub';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import SubjectIcon from '@material-ui/icons/Subject';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import { useEffect, useMemo, useState } from 'react';
import { ObservableGrid } from 'react-observable-grid';
import LocalObservableGrid from './components/ObservableGrid';
import { dataGenerator } from './parts/dataGenerator';
import { ActionsRow, AvatarRow, Card, CurrencyRow, DescriptionRow, NamesRow, TilesRow } from './parts/SampleRow';


const App = () => {
  const [rows, setRows] = useState([]);
  const [searchedRows, setSearchedRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [performance, setPerformance] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [selectedAvatars, setSelectedAvatars] = useState([]);
  const [searchInField, setSearchInField] = useState(['name', 'description']);
  const [isDebugging, setIsDebugging] = useState(false);
  const [canvasDrawing, setCanvasDrawing] = useState(false);
  const [seeLive, setSeeLive] = useState(false);
  const [asGrid, setAsGrid] = useState(false);
  const [totalElements, setTotalElements] = useState(null)
  const [gridElements, setGridElements] = useState(null)
  const theme = useMemo(() => createTheme({ palette: { type: 'light', } }), [])
  const classes = useStyles()

  const headers = [
    {
      // icon: <GitHubIcon />,
      // canCanvas: true,
      noSearch: true,
      noSort: true,
      noHightlight: true,
      width: '60px',
      property: 'fullName',
      row: (row) => <AvatarRow {...{ selectedAvatars, row }} onSelectAvatar={(fullName) => {
        console.log('xxx', fullName)
        setSelectedAvatars(selectedAvatars => selectedAvatars.some(sa => sa === fullName)
          ? selectedAvatars.filter(sa => sa !== fullName)
          : [...selectedAvatars, fullName]
        )
      }} />
    },
    {
      label: 'Name',
      tooltip: "Filter users by name",
      property: 'name',
      // canCanvas: true,
      width: 'minmax(200px, 1fr)',
      row: (row) => <NamesRow row={row} />,
      postHeaders: [
        {
          label: 'Surname',
          property: 'surname'
        }
      ],
      secondaryHeaders: [
        {
          label: 'Full name',
          property: 'fullName'
        }
      ]
    },
    {
      label: 'Description',
      // canCanvas: true,
      icon: <SubjectIcon />,
      property: 'description',
      row: (row) => <DescriptionRow row={row} />,
      width: '2fr',
    },
    {
      label: 'Tiles',
      icon: <DashboardIcon />,
      property: 'tilesHash',
      width: 'minmax(100px, 2fr)',
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
      // canCanvas: true,
      icon: <MonetizationOnIcon />,
      property: 'price',
      align: 'flex-end',
      width: '110px',
      row: (row) => <CurrencyRow row={row} />,
      secondaryHeaders: [
        {
          label: 'Currency',
          property: 'currency',
        },
      ]
    },
    {
      noSort: true,
      noSearch: true,
      row: (row) => <ActionsRow row={row} />,
      width: '1fr',
      noHightlight: true,
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
      row: (row) => <Card row={row}  selectedTiles={selectedTiles} onSelectTile={(tile) => {
        setSelectedTiles(selectedTiles => selectedTiles.some(st => st === tile)
        ? selectedTiles.filter(st => st !== tile)
        : [...selectedTiles, tile]
        )
      }} />,
    },
  ]

  const calculateTotalElements = () => {
    return document.getElementsByTagName('*').length
  }

  const calculateGridElements = () => {
    const gridElement = document.getElementById("observable-grid")
    return gridElement ? gridElement.getElementsByTagName('*').length : 0
  }

  const generateRows = (count) => {
    const t0 = Date.now()
    const rowsGenerated = dataGenerator(count);
    const t1 = Date.now();
    setPerformance(Math.round(t1 - t0));
    if(rowsGenerated) {
      setRows(rowsGenerated)
    }
  }

  useEffect(() => generateRows(35), [])

  useEffect(( ) => {
    const interval = setInterval(() => {
      setTotalElements(Number(calculateTotalElements()))
      setGridElements(Number(calculateGridElements()))
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    searchTerm.length > 0
    ? setSearchedRows(rows => rows.filter((row) => {
      return searchInField.length > 0
      ? searchInField.some((field) => {
        return isCaseSensitive
          ? row[field].includes(searchTerm)
          : row[field].toLowerCase().includes(searchTerm.toLowerCase())
      })
      : true
    }))
    : setSearchedRows(rows)
  }, [searchTerm, rows, searchInField, isCaseSensitive])

  useEffect(() => {
    selectedTiles.length > 0
    ? setFilteredRows(searchedRows.filter((row) => selectedTiles.filter(st => row.tiles.some(t => t.id === st)).length === selectedTiles.length))
    : setFilteredRows(searchedRows)
  }, [selectedTiles, searchedRows])

{/* TODO: add header children */}
        {/* TODO: make grid support sub-columns */}

  return <ThemeProvider {...{ theme }} >
    <div className={classes.wrapper}>
      <div className={`${classes.actions} ${classes.bigContainer}`}>
        <div className={classes.actions}>
          <Typography color="textPrimary" variant="h3">👀 🗞️</Typography>
          <Typography
            color="textPrimary"
            style={{ border: '2px dotted #CCC', padding: '4px 12px', borderRadius: '8px', userSelect: 'all', backgroundColor: "#effdef" }}
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
          <Chip variant="outlined" label={`Filtered: ${filteredRows.length}`} />
          <Chip variant="outlined" label={`DOM (Grid): ${totalElements || '?'} (${gridElements || '?'})`} />
          <Chip onClick={() => setIsDebugging(!isDebugging)} variant="outlined" label={`Debug ${isDebugging ? 'ON' : 'OFF'}`} />
          <Chip variant="outlined" label={`Perf: ${performance}ms`} />
          <Chip onClick={() => setCanvasDrawing(!canvasDrawing)} variant="outlined" label={`🧪 Canvas ${canvasDrawing ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setSeeLive(!seeLive)} variant="outlined" label={`Env ${seeLive ? 'PROD' : 'DEV'}`} />
          {!seeLive && <Chip onClick={() => setAsGrid(!asGrid)} variant="outlined" label={`Grid ${asGrid ? 'GRID' : 'TABLE'}`} />}
        </div>
      </div>


      <div className={`${classes.actions} ${classes.bigContainer}`}>
        <div className={classes.actions}>
          <TextField
            placeholder={`Search in ${searchInField.join(', ')}...`}
            value={searchTerm}
            disabled={searchInField.length === 0}
            onChange={(event) => setSearchTerm(event.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
              endAdornment: <>
                <TextFieldsIcon
                  style={{cursor: 'pointer'}}
                  onClick={() => setIsCaseSensitive(!isCaseSensitive)}
                  color={isCaseSensitive ? 'primary' : 'disabled'}
                />
                {searchTerm.length > 0 && <InputAdornment onClick={() => setSearchTerm('')} position="end"><DeleteOutlineIcon style={{cursor: 'pointer'}} /></InputAdornment>}

              </>,
            }}
            style={{ width: '300px' }}
            size="small" />

            <div className={`${classes.actions} ${classes.smallActions}`}>
              {headers.filter(header => !header.noSearch).map((header) => {
                const isField = searchInField.some(field => field === header.property)
                return <Chip
                  color={isField ? 'primary' : 'default'}
                  key={header.property}
                  variant="outlined"
                  onClick={() => {
                    if (searchInField.includes(header.property)) {
                      setSearchInField(searchInField.filter(field => field !== header.property))
                    } else {
                      setSearchInField([...searchInField, header.property])
                    }
                  }}
                  icon={isField ? undefined : <AddCircleIcon />}
                  onDelete={isField ? () => {
                    setSearchInField(searchInField.filter(field => field !== header.property))
                  } : undefined}
                  label={header.label}
                />
              })}
            </div>
        </div>
              </div>

      <div className={`${classes.actions} ${classes.bigContainer}`}>
        <div className={`${classes.actions} ${classes.smallActions}`}>
          {[0, 2, 30, 40, 50, 100, 1500, 65000, 1000000].map(count => <Button
            disableElevation
            style={{minWidth: 'unset', padding: '5px 12px'}}
            color={count === rows.length ? 'primary' : 'default'}
            variant={count !== rows.length ? "outlined" : 'contained'}
            key={count}
            onClick={() => generateRows(count)}
            >
              {count}
          </Button>)}
        </div>
        {selectedTiles.map((tile) => <Chip key={tile} label={tile} />)}

        {/* {JSON.stringify(selectedAvatars)} */}
        <div className={`${classes.actions} ${classes.smallActions}`}>
          {selectedAvatars.map((avatar) => <AvatarRow
            row={{
              fullName: avatar,
              name: avatar.split(" ")[0],
              surname: avatar.split(" ")[1]
            }} />)}
          {/* {Array.from(new Set(filteredRows.map(fr => fr.fullName))).map((fullName) => <AvatarRow key={fullName} row={{ fullName }} />)} */}
        </div>
      </div>

      <div className={classes.container} style={{height: '850px'}}>
        {seeLive
          ? <ObservableGrid {...{isDebugging, headers, canvasDrawing }}
            uniqueId="fakeEntries"
            rowOptions={{ padding: '8px 16px' }}
            headerOptions={{ padding: '16px 16px' }}
            rows={filteredRows}
            isEmpty={filteredRows.length === 0}
            emptyElement={<Typography variant="caption" color="textSecondary">No data found ...</Typography>}
          />
          : <>
            {asGrid
              ? <LocalObservableGrid {...{ isDebugging, headers: headersGrid, canvasDrawing }}
                uniqueId="fakeEntries"
                isGrid={4}
                pageSize={100}
                isAlternating={false}
                className={classes.observableGrid}
                isClearingOnBlur={false}
                rowOptions={{ padding: '16px' }}
                headerOptions={{ padding: '8px 16px' }}
                rows={filteredRows}
                emptyElement={<Typography variant="caption" color="textSecondary">No data found ...</Typography>}
              />
              : <LocalObservableGrid {...{ isDebugging, headers, canvasDrawing }}
                uniqueId="fakeEntries"
                canvasDrawing={false}
                isColumned={true}
                className={classes.observableGrid}
                isClearingOnBlur={false}
                rowOptions={{ padding: '8px 8px' }}
                headerOptions={{ padding: '8px 8px' }}
                rows={filteredRows}
                isEmpty={filteredRows.length === 0}
                emptyElement={<Typography variant="caption" color="textSecondary">No data found ...</Typography>}
            />}
          </>}
      </div>


    </div>
  </ThemeProvider>
}

const useStyles = makeStyles(() => ({
  observableGrid: {
    '& #Header-wrapper': {
      boxShadow: 'none',
      backgroundColor: "#3f51b514",
    },
    '& #Row-root': {
      borderBottom: '1px solid #CCC',
    },
    '& #Container-root > *': {
      borderBottom: '1px solid #CCC'
    },
    '& #Container-root > *:hover': {
      backgroundColor: '#e0f0ff',
    },
    '& #Container-root .Row-isSelected': {
      backgroundColor: 'red',
    }
  },
  wrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    minWidth: '850px',
    gap: '16px',
    flexDirection: 'column',
    position: 'absolute',
    alignContent: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '95%',
  },
  container: {
    minWidth: '850px',
    position: 'relative',
    borderRadius: '4px',
    maxWidth: '95%',
    width: '95%',
    border: '2px solid #333',
    height: '80%'
  }
}))

export default App;
