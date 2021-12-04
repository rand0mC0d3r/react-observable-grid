import { Button, Chip, IconButton, TextField, Typography } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import SubjectIcon from '@material-ui/icons/Subject';
import { useEffect, useMemo, useState } from 'react';
import ObservableGrid from './components/ObservableGrid';
import SampleRow from './parts/SampleRow';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    gap: '16px',
    flexDirection: 'column',
    position: 'absolute',
    alignContent: 'stretch',
    justifyContent: "center",
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
  bigContainer: {
    width: '90%',
  },
  container: {
    minWidth: '800px',
    position: 'relative',
    borderRadius: '4px',
    maxWidth: '95%',
    width: '90%',
    border: '4px solid #333',
    height: '80%'
  }
}))

const headers = [
  {
    label: 'Name',
    tooltip: "Filter users by name",
    icon: <GitHubIcon />,
    property: 'name',
    width: 'minmax(200px, 1fr)',
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
    width: '3fr',
  },
  {
    label: 'Tiles',
    property: 'tiles',
    width: 'minmax(100px, 300px)',
  },
  {
    label: 'Price',
    icon: <MonetizationOnIcon />,
    property: 'price',
    align: 'flex-end',
    width: '110px',
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
    width: '1fr',
  },
]

const colorList = [
  'pink',
  'green',
  'blue',
  'yellow',
  'orange',
  'purple',
  'brown',
  'grey',
  'black',
  'white',
]

const flavorsList = [
  'Chocolate',
  'Vanilla',
  'Strawberry',
  'Mint',
].map((flavor, index) => ({
  id: index,
  name: flavor,
  color: colorList[index % colorList.length],
}))

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "SEK",
  "NZD"
];

const App = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isDebugging, setIsDebugging] = useState(false);
  const theme = useMemo(() => createTheme({ palette: { type: 'light', } }), [])
  const classes = useStyles()



  const generateRows = (count) => setRows(count === 0 ? [] : new Array(count).fill().map((_, i) => ({
    uuid: `uuid_${i}`,
    name: `${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}.${i+1}`,
    surname: `${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}.${i+1}`,
    nickname: `n1_${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3)}${i+1}`,
    streetname: `n2_${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3)}${i+1}`,
    description: `${[
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Donec pulvinar nisi pulvinar metus cursus, eget malesuada nunc auctor.',
      'Maecenas vitae suscipit elit, ut varius diam.',
      'Duis consectetur a erat non tempus.',
      'Sed molestie at nibh ut ullamcorper.',
      'Mauris hendrerit egestas quam, vitae dictum tellus condimentum ut.',
      'Suspendisse in lorem pharetra, ornare leo id, condimentum neque. ',
      'Vestibulum odio justo, efficitur at dictum sed, pharetra ac nisi.',
      'Vivamus vel eleifend massa.',
      'Aenean est nunc, iaculis a maximus ut, blandit eget lorem.',
      'Proin et porta arcu.',
      'Curabitur ornare est nulla, in interdum dui lacinia id.',
      'Praesent et nunc eget ipsum blandit venenatis et et est.',
      'Sed bibendum auctor ullamcorper.',
      'Integer at ligula ac neque accumsan tincidunt.',
    ][Math.floor(Math.random()*14)]} ${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3)}`
  ,
    price: `${i + 1}.0${Math.floor(Math.random() * 100)}`,
    currency: currencies[Math.floor(Math.random() * currencies.length)],
  })));

  useEffect(() => generateRows(30), [])

  useEffect(() => {
    setFilteredRows(rows.filter(({name, description}) => `${name}${description}`.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm, rows])

  return <ThemeProvider {...{ theme }} >
    <div className={classes.wrapper}>
      <div className={`${classes.actions} ${classes.bigContainer}`}>
        <div className={classes.actions}>
          <Typography color="textPrimary" variant="h6">React Grid Observable</Typography>
          <IconButton onClick={() => window.open('https://github.com/rand0mC0d3r/react-observable-grid')}>
            <GitHubIcon />
          </IconButton>
        </div>

        <div className={classes.actions}>
          <TextField
            placeholder="Search ..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            variant="outlined"
            size="small" />
        </div>

        <div className={classes.actions}>
          <Chip variant="outlined" label={`Rows: ${rows.length}`} />
          <Chip onClick={() => setIsDebugging(!isDebugging)} variant="outlined" label={`Debugging: ${isDebugging ? 'ON' : 'OFF'}`} />
        </div>

        <div className={classes.actions}>
          {[0, 10, 20, 50, 500, 5000].map(count => <Button style={{minWidth: 'unset'}} variant="outlined" key={count} onClick={() => generateRows(count)}>{count}</Button>)}
        </div>

      </div>
      <div className={classes.container}>
        <div className={classes.wrapper2}>
          <ObservableGrid
            {...{ headers, rows: filteredRows, isDebugging }}
            isEmpty={filteredRows.length === 0}
            emptyElement={<div>No data found ...</div>}
            keyPattern={row => row.uuid}
            isSelectable={true}
            rowOptions={{
              padding: '4px 16px',
            }}
            rowRenderer={row => <SampleRow {...{ row }} />}
          />
        </div>
      </div>
    </div>
  </ThemeProvider>
}

export default App;
