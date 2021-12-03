import { makeStyles, useTheme } from '@material-ui/core/styles';
import ObservableGrid from '../components/ObservableGrid';
import SampleRow from './SampleRow';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
}))

const gridSpacing = 'minmax(200px, 1fr) 3fr 110px 1fr'
const headers = [
  { label: 'Name', property: 'name' },
  { label: 'Description', property: 'description' },
  { label: 'Price', property: 'price', align: 'flex-end' },
  { label: 'Actions', align: 'flex-end', noSort: true },
]

const ImplementationFrame = ({ rows }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return <div className={classes.wrapper}>
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
}

export default ImplementationFrame;
