import { Button, Chip } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
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
  container: {
    position: 'relative',
    borderRadius: '30px',
    maxWidth: '90%',
    width: '80%',
    border: '45px solid #333',
    height: '80%'
  }
}))

const gridSpacing = 'minmax(200px, 1fr) 3fr 110px 1fr'
const headers = [
  {
    label: 'Name',
    property: 'name',
    additionalHeaders: [
      {
        label: 'Surname',
        property: 'surname'
      }
    ],
    secondaryHeaders: [
      {
        label: 'Name1',
        property: 'nickname',
        noSort: true
      },
      {
        label: 'Name2',
        property: 'streetname'
      }
    ]
  },
  { label: 'Description', property: 'description' },
  { label: 'Price', property: 'price', align: 'flex-end' },
  { label: 'Actions', align: 'flex-end', noSort: true },
]

const App = () => {
  const [rows, setRows] = useState([]);
  const theme = useMemo(() => createTheme({ palette: { type: 'light', } }), [])
  const classes = useStyles()

  const generateRows = (count) => setRows(count === 0 ? [] : new Array(count).fill().map((_, i) => ({
    uuid: `uuid_${i}`,
    name: `${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)} ${i+1}`,
    nickname: `nck_${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)} ${i+1}`,
    streetname: `str_${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)} ${i+1}`,
    description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec pulvinar nisi pulvinar metus cursus, eget malesuada nunc auctor.
      Maecenas vitae suscipit elit, ut varius diam.
      Duis consectetur a erat non tempus.
      Sed molestie at nibh ut ullamcorper.
      Mauris hendrerit egestas quam, vitae dictum tellus condimentum ut.
      ${i}
    `,
    price: `${i+1}.00 $`,
  })));

  useEffect(() => generateRows(30), [])

  return <ThemeProvider {...{ theme }} >
    <div className={classes.wrapper}>
      <div className={classes.actions}>
        {[0, 10, 20, 50, 500, 5000].map(count => <Button variant="outlined" color="primary" key={count} onClick={() => generateRows(count)}>{count} rows</Button>)}

        <Chip variant="outlined" label={`Rows ${rows.length}`} />
        <Chip variant="outlined" label={`Rows ${rows.length}`} />

      </div>
      <div className={classes.container}>
        <div className={classes.wrapper2}>
          <ObservableGrid
                {...{ headers, gridSpacing, rows }}
                isEmpty={rows.length === 0}
                emptyElement={<div>No data found ...</div>}
                keyPattern={row => row.uuid}
                isSelectable={true}
                rowOptions={{
                  padding: '4px 16px',
                  template: gridSpacing,
                }}
                rowRenderer={row => <SampleRow {...{ row }} />}
          />
        </div>
      </div>
    </div>
  </ThemeProvider>
}

export default App;
