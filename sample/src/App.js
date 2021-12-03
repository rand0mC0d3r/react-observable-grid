import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
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
    width: '80%',
    border: '45px solid #333',
    boxShadow: 'inset 0px 0px 3px 0px #333',
    height: '80%'
  }
}))

const App = () => {
  const [rows, setRows] = useState([]);
  const theme = useMemo(() => createTheme({ palette: { type: 'light', } }), [])
  const classes = useStyles()

  const generateRows = (count) => setRows(count === 0 ? [] : new Array(count).fill().map((_, i) => ({
    uuid: `uuid_${i}`,
    name: `${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)} ${i+1}`,
    nickname: `nck_${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)} ${i+1}`,
    streetname: `str_${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)} ${i+1}`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar nisi pulvinar metus cursus, eget malesuada nunc auctor. Maecenas vitae suscipit elit, ut varius diam. Duis consectetur a erat non tempus. Sed molestie at nibh ut ullamcorper. Mauris hendrerit egestas quam, vitae dictum tellus condimentum ut. ${i}`,
    price: `${i+1}.00 $`,
  })));

  return <ThemeProvider {...{ theme }} >
    <div className={classes.wrapper}>
      <div className={classes.actions}>
        {[0, 10, 20, 50, 500, 5000].map(count => <button key={count} onClick={() => generateRows(count)}>Generate {count} rows</button>)}
      </div>
      <div className={classes.container}><ImplementationFrame {...{ rows }} /></div>
    </div>
  </ThemeProvider>
}

export default App;
