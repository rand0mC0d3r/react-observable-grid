import { Button, Chip, IconButton, TextField, Typography } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GitHubIcon from '@material-ui/icons/GitHub';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import SubjectIcon from '@material-ui/icons/Subject';
import { useEffect, useMemo, useState } from 'react';
import { ActionsRow, CurrencyRow, TilesRow, DescriptionRow, NamesRow } from './parts/SampleRow';
import { ObservableGrid } from 'react-observable-grid';
import LocalObservableGrid from './components/ObservableGrid';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { dataGenerator } from './parts/dataGenerator';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const App = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [searchInField, setSearchInField] = useState(['name', 'description']);
  const [isDebugging, setIsDebugging] = useState(false);
  const [seeLive, setSeeLive] = useState(false);
  const theme = useMemo(() => createTheme({ palette: { type: 'light', } }), [])
  const classes = useStyles()

  const headers = [
    {
      label: 'Name',
      tooltip: "Filter users by name",
      icon: <GitHubIcon />,
      property: 'name',
      width: 'minmax(200px, 1fr)',
      row: (row) => <NamesRow row={row} />,
      additionalHeaders: [
        {
          label: 'Surname',
          icon: <PersonPinCircleIcon />,
          property: 'surname'
        }
      ],
      secondaryHeaders: [
        {
          label: 'Name1',
          property: 'nickname',
          // noSort: true
        },
        {
          label: 'Name2',
          property: 'streetname'
        }
      ]
    },
    {
      label: 'Description',
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
      row: (row) => <TilesRow row={row} onSelectTile={(tile) => {
        console.log(tile)
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
      icon: <MoreHorizIcon />,
      align: 'flex-end',
      tooltip: "Actions for entries",
      noSort: true,
      noSearch: true,
      row: (row) => <ActionsRow row={row} />,
      width: '1fr',
      noHightlight: true,
    },
  ]

  const generateRows = (count) => setRows(dataGenerator(count));

  useEffect(() => generateRows(50), [])

  useEffect(() => {
    searchTerm.length > 0
    ? setFilteredRows(rows.filter((row) => {
      return searchInField.length > 0
      ? searchInField.some((field) => {
        return isCaseSensitive
          ? row[field].includes(searchTerm)
          : row[field].toLowerCase().includes(searchTerm.toLowerCase())
      })
      : true
    }))
    : setFilteredRows(rows)
  }, [searchTerm, rows, searchInField, isCaseSensitive])

  return <ThemeProvider {...{ theme }} >
    <div className={classes.wrapper}>
      <div className={`${classes.actions} ${classes.bigContainer}`}>
        <div className={classes.actions}>
          <Typography color="textPrimary" variant="h3">👀 🗞️</Typography>
          <Typography
            color="textPrimary"
            style={{
              border: '2px dotted #CCC',
              padding: '4px 12px',
              borderRadius: '8px',
              userSelect: 'all',
              backgroundColor: "#effdef",
            }}
            variant="h6"
          >npm i react-observable-grid</Typography>

        </div>

        <div className={classes.actions}>
          <Chip variant="outlined" label={`Search Rows: ${filteredRows.length}`} />
          <Chip onClick={() => setIsDebugging(!isDebugging)} variant="outlined" label={`Debugging: ${isDebugging ? 'ON' : 'OFF'}`} />
          <Chip onClick={() => setSeeLive(!seeLive)} variant="outlined" label={`Env: ${seeLive ? 'PROD' : 'DEV'}`} />
        </div>

        <div className={`${classes.actions} ${classes.smallActions}`}>
          {[0, 2, 50, 100, 1500, 65000].map(count => <Button
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

        <div className={`${classes.actions} ${classes.smallActions}`}>
          <IconButton title="Open NPM link ..." onClick={() => window.open('https://www.npmjs.com/package/react-observable-grid')}>
            <OpenInNewIcon />
          </IconButton>

          <IconButton title="Open Github link ..." onClick={() => window.open('https://github.com/rand0mC0d3r/react-observable-grid')}>
            <GitHubIcon />
          </IconButton>
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
          style={{ width: '400px' }}
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

      <div className={`${classes.actions} ${classes.smallActions}`}>
        {selectedTiles.map((tile) => <Chip key={tile} label={tile} />)}
      </div>

      </div>
      <div className={classes.container} style={{height: '850px'}}>
          {seeLive ? <ObservableGrid
            headers={headers}
            rows={filteredRows}
            isEmpty={filteredRows.length === 0}
            emptyElement={<div>No data found ...</div>}
          /> : <LocalObservableGrid
        {...{isDebugging, headers}}
          uniqueId="fakeEntries"
          rowOptions={{
            padding: '8px 16px'
          }}
          headerOptions={{
            padding: '8px 16px'
          }}
          rows={filteredRows}
          emptyElement={<Typography variant="caption" color="textSecondary">No data found ...</Typography>}
        />}
      </div>
    </div>
  </ThemeProvider>
}

const useStyles = makeStyles(() => ({
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
    gap: '16px',
    alignItems: 'center'
  },
  smallActions: {
    gap: '4px',
  },
  bigContainer: {
    width: '90%',
  },
  container: {
    minWidth: '850px',
    position: 'relative',
    borderRadius: '4px',
    maxWidth: '95%',
    width: '90%',
    border: '4px solid #333',
    height: '80%'
  }
}))

export default App;
