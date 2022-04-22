import { Avatar, Button, Chip, Grid as Flexbox, Typography } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useMemo, useState } from 'react';
// import { Grid, GridColumns, GridHeaders, GridRows, GridStats, GridSticky } from 'react-observable-grid';
import { Grid, GridColumns, GridHeaders, GridRows, GridStats, GridSticky } from './components';
// import { Grid } from './components/GridStoreNg';
import ColumnManager from './parts/ColumnManager';
import DataStores from './parts/DataStores';
import GridStructure from './parts/GridStructure';
import SearchField from './parts/SearchField';

const App = () => {
  let queryTimeout

  const [isLive, setIsLive] = useState(false)
  const [data, setData] = useState([]);
  const [columnsState, setColumnsState] = useState([]);
  const [processedGrid, setProcessedGrid] = useState([]);
  const [terms, setTerms] = useState([]);
  const [total, setTotal] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('react');
  const [currentSearchTerm, setCurrentSearchTerm] = useState('react');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [richPayloads, setRichPayloads] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [trees, setTrees] = useState([]);
  const [openRows, setOpenRows] = useState([]);

  const theme = useMemo(() => createTheme({
    palette: { type: 'light', },
    transitions: {
      create: () => 'none',
    },
  }), [])
  const classes = useStyles()

  const global =  {
		alternatingRows: {
			enabled: true,
			stepping: (index) => index % 2 === 0,
    },
    sort: {
      initialDirection: '',
      initialColumn: '',
    },
    style: {
      padding: '16px',
      rowPadding: '8px 16px',
      gap: '8'
    }
  }

  return <>
    <GridStructure {...{
      processedGrid, searchTerm, setOpenRows, openRows, selectedRows, setSelectedRows, richPayloads, setCurrentSearchTerm,
      setSearchTerm, contributors, setProcessedGrid, columnsState,
    }} />
    <DataStores {...{currentSearchTerm, setTotal, setCurrentSearchTerm,
      setDataNew: setData, setTerms, suggestions, setSuggestions,
      richPayloads, selectedItem, setRichPayloads, trees, setTrees,
      contributors, setContributors}} />
    <ThemeProvider {...{ theme }} >
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'absolute',
      top: '24px',
      left: '24px',
      right: '24px',
      bottom: '24px',
      }}>
        <Flexbox style={{ gap: '8px' }} container direction='row' justifyContent='space-between' alignItems='center' wrap="nowrap">
          <SearchField {...{ searchTerm, suggestions, setSearchTerm, setCurrentSearchTerm }} />
          <Button disabled={isLive} onClick={() => setIsLive(true)}>Live</Button>
          <Button disabled={!isLive} onClick={() => setIsLive(false)}>Sandbox</Button>
          <ColumnManager {...{ processedGrid, setProcessedGrid, columnsState, setColumnsState }} />
        </Flexbox>
      <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {terms.map(term => <Chip key={term.term} avatar={<Avatar>{term.count}</Avatar>} variant="outlined" size="small" label={`${term.term}`}/>)}
      </div>
        <div className={classes.backgroundContainer} style={{ display: 'flex', flexDirection: 'column', position: 'relative', gap: '8px', flex: '1 1 auto' }}>
          {isLive ? <>
            live
            </>
            : <Grid {...{ data: data.map(data => ({ ...data.package, ...data.score })) }} flattenObjects >

                {/* Grid Headers */}
                <GridHeaders />
                <GridHeaders
                  className={classes.header}
                  fallbackComponent={(component, { sort }) => <Typography
                    style={{ padding: '10px', cursor: 'default' }}
                    variant="caption"
                    color={sort.isActive ? 'primary' : 'textSecondary'}
                  >{component}</Typography>}
                />
                <GridHeaders className={classes.header}>
                  {({ headers }) => headers.map(({ key, component }) => <Typography {...{ key }} variant="caption">{component}</Typography>)}
                </GridHeaders>

                {/* Grid Columns */}
                {/* <GridColumns /> */}
                {/* <GridColumns style={{border: '1px dotted red'}} /> */}
                <GridColumns>
                  {({ columns }) => columns.map(({ key }, index) => <div style={index !== columns.length - 1 ? { borderRight: '1px dotted red' } : {}} key={key}></div>)}
                </GridColumns>

                <GridRows />
                {/* <GridRows selectedRow={selectedRow} generateKey={(row) => row}>
                  {({ rows, className, styleProps }) => rows.map(({ style, data, component, alternating, index }) => <div
                    onMouseUp={() => {
                      setSelectedRow(index)
                      setSelectedItem({
                        url: Object.entries(data.package.links).filter(([key, _]) => key === 'repository').map(([_, value]) => value)[0],
                        name: data.package.name,
                      })
                    }}
                    style={style}
                    className={[
                    className,
                    classes.row,
                    alternating ? classes.alternating : '',
                    selectedRows.includes(data.package.name) ? classes.selected : '',
                    (selectedItem?.name === data.package.name && !richPayloads.some(rp => rp.repo === data.package.name)) ? classes.isBusy : '',
                    index === selectedRow ? classes.focused : '',
                    ].filter(Boolean).join(' ')}
                    {...{ id: data.package.name, key: data.package.name, style: { ...styleProps, borderBottom: '1px solid #DDD', }
                    }}>
                    {component}
                  </div>)}
                </GridRows> */}
                {/* <GridStats className={classes.stats}>
                  {({ total, sort }) => <div >
                    {total} {sort.column} {sort.direction}
                  </div>}
                </GridStats>
                <GridSticky style={{backgroundColor: '#FFF', border: '1px solid #c7d0ff8a'}}/> */}
              </Grid>}
        </div>
      </div>
    </ThemeProvider>
    </>
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
  avatar: {
    opacity: 0.6,

    '&:hover': {
      opacity: 1,
    }
  },
  backgroundContainer: {
    // backgroundColor: '#e5e5f7',
    // background: 'linear-gradient(135deg, #444cf711 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, #444cf711 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, #444cf711 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, #444cf711 25%, #e5e5f711 25%) 0px 0/ 20px 20px',
  },
  header: {
    borderBottom: "1px solid #BBBBBB55",
    backgroundColor: "#c7d0ff8a",
    // boxShadow: '0px 0px 2px 2px #CCC'
  },
  stats: {
    position: 'absolute',
    backgroundColor: '#BBB',
    border: '1px solid #888',
    right: '16px',
    padding: '16px',
    bottom: '60px'
  },
  row: {
    backgroundColor: '#f0f0f077',

    '&:hover': {
      backgroundColor: '#e3e3e377',
    }
  },
  alternating: {
    backgroundColor: '#ffffff77',
  },
  focused: {
    boxShadow: 'inset 0px 0px 0px 1px #4052b5',
  },
  isBusy: {
    filter: 'blur(1px) grayscale(1)',
  },
  selected: {
    backgroundColor: '#c9d2ff77 !important',
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
