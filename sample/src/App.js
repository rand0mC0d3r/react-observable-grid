import { faLink, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Checkbox, Chip, Grid as Flexbox, TextField, Tooltip, Typography } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AccountTreeSharpIcon from '@material-ui/icons/AccountTreeSharp';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import GridColumnsNg from './components/GridColumnsNg';
import GridHeadersNg from './components/GridHeadersNg';
import GridRowsNg from './components/GridRowsNg';
import GridStatsNg from './components/GridStatsNg';
import { Grid } from './components/GridStoreNg';
import ColumnManager from './parts/ColumnManager';
import DataStores from './parts/DataStores';
import GridStructure from './parts/GridStructure';
import {
  CircularProgressBlock, CollaboratorsColumn, KeywordsColumn, LinksColumn,
  MetadataColumn, NameColumn, SearchScoreColumn, SelectionAndOpenColumn
} from './parts/SampleRow';
import SearchField from './parts/SearchField';

const App = () => {
  let queryTimeout

  const [dataNew, setDataNew] = useState([]);
  const [processedGrid, setProcessedGrid] = useState([]);
  const [terms, setTerms] = useState([]);
  const [total, setTotal] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('react');
  const [currentSearchTerm, setCurrentSearchTerm] = useState('react');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const doQuery = (value) => {
    clearTimeout(queryTimeout)
    queryTimeout = setTimeout(() => { setCurrentSearchTerm(value) }, 500)
  }

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
    <GridStructure {...{ processedGrid, searchTerm, setOpenRows, openRows, selectedRows, setSelectedRows, richPayloads, setSearchTerm, contributors, setProcessedGrid }} />
    <DataStores {...{currentSearchTerm, setTotal, setCurrentSearchTerm,
      setDataNew, setTerms, suggestions, setSuggestions,
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
        <Flexbox container direction='row' justifyContent='space-between' alignItems='center' wrap="nowrap">
          <SearchField {...{ searchTerm, suggestions, setSearchTerm, doQuery, setCurrentSearchTerm }} />
          {/* <div>{selectedRows}</div> */}
          <ColumnManager {...{ processedGrid, setProcessedGrid }} />
        </Flexbox>
      {/* <div> */}
        {/* {JSON.stringify(processedGrid.map(row => `${row.header.key} ${row.header.visible}`))} */}
        {/* {dataNew.map(item => <div key={item.package.name}>{item.package.publisher.username}</div>)} */}
      {/* </div> */}
      <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {terms.map(term => <Chip key={term.term} avatar={<Avatar>{term.count}</Avatar>} variant="outlined" size="small" label={`${term.term}`}/>)}
      </div>
      {/* <div>
        total {total}
      </div> */}
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', gap: '8px', flex: '1 1 auto'}}>
    {1 === 1 && <Grid {...{ data: dataNew, grid: processedGrid, global }}>
      {/* <GridHeadersNg className={classes.header} >
        {({ headers }) => headers.map(({ key, component, sort, align }) => component)}
      </GridHeadersNg> */}
      <GridHeadersNg
        className={classes.header}
        // upComponent={<>UP</>}
        // downComponent={<>DOWN</>}
        fallbackComponent={(component, { sort }) => <Typography variant="caption" color={sort.isActive ? 'primary' : 'textSecondary'}>{component}</Typography>}
      />
      <GridColumnsNg >
        {/* {({ columns }) => columns.map(({ key, align }) => <div key={key}>|</div> )} */}
      </GridColumnsNg>
      <GridRowsNg generateKey={(row) => row.package.name}>
        {({ rows, className, styleProps }) => rows.map(({ data, component, alternating, index }) => <div
          onMouseUp={() => {
            setSelectedItem({
              url: Object.entries(data.package.links).filter(([key, _]) => key === 'repository').map(([_, value]) => value)[0],
              name: data.package.name,
            })
          }}
          className={`
          ${className}
          ${classes.row}
          ${alternating ? classes.alternating : ''}
          ${selectedRows.includes(data.package.name) ? classes.selected : ''}
          ${(selectedItem?.name === data.package.name && !richPayloads.some(rp => rp.repo === data.package.name)) ? classes.isBusy : ''}
          `}
          {...{ id: data.package.name, key: data.package.name, style: { ...styleProps, borderBottom: '1px solid #DDD', }
          }}>
          {component}
        </div>)}
      </GridRowsNg>
      <GridStatsNg className={classes.stats}>
        {({ total, sort }) => <div >
          {total} {sort.column} {sort.direction}
        </div>}
      </GridStatsNg>
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
  header: {
    borderBottom: "1px solid #BBBBBB55",
    // boxShadow: '0px 0px 2px 2px #CCC'
  },
  stats: {
    position: 'absolute',
    backgroundColor: '#BBB',
    border: '1px solid #888',
    right: '16px',
    padding: '16px',
    bottom: '16px'
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
