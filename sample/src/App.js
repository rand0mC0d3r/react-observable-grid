import { createTheme, makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import { useMemo, useState } from 'react';
import ImplementationFrame from './parts/ImplementationFrame';

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
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
  },
  container: {
    position: 'relative',
    borderRadius: '30px',
    maxWidth: '90%',
    width: '70%',
    border: '45px solid #333333',
    height: '70%'
  }
}))

const generateRows = (count) => new Array(count).fill().map((_, i) => ({
  uuid: `uuid_${i}`,
  name: `name ${i}`,
  description: `description ${i}`,
  price: `${i} @`,
}));

const App = () => {
  const [rows, setRows] = useState([]);
  const theme = useMemo(() => createTheme({ palette: { type: 'light', } }), [])
  const classes = useStyles()

  return <ThemeProvider {...{ theme }} >
    <div className={classes.wrapper}>
      <div className={classes.actions}>
        <button onClick={() => setRows([])}>No data</button>
        <button onClick={() => setRows(generateRows(50))}>Generate 50 rows</button>
        <button onClick={() => setRows(generateRows(500))}>Generate 500 rows</button>
        <button onClick={() => setRows(generateRows(5000))}>Generate 5000 rows</button>
        <button onClick={() => setRows(generateRows(10000))}>Generate 10000 rows</button>
      </div>
      <div className={classes.container}><ImplementationFrame {...{ rows }} /></div>
    </div>
  </ThemeProvider>
}

export default App;
