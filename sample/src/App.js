import { faLink, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Checkbox, Chip, TextField, Tooltip, Typography } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AccountTreeSharpIcon from '@material-ui/icons/AccountTreeSharp';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import GridColumnsNg from './components/GridColumnsNg';
import GridHeadersNg from './components/GridHeadersNg';
import GridRowsNg from './components/GridRowsNg';
import GridStatsNg from './components/GridStatsNg';
import { Grid } from './components/GridStoreNg';
import {
  CircularProgressBlock, CollaboratorsColumn, KeywordsColumn, LinksColumn,
  MetadataColumn, NameColumn, SearchScoreColumn, SelectionAndOpenColumn
} from './parts/SampleRow';

const App = () => {
  const [dataNew, setDataNew] = useState([]);
  const [terms, setTerms] = useState([]);
  const [total, setTotal] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('react');
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

  useEffect(() => {
    if (searchTerm !== '') {
      fetch(`https://api.npms.io/v2/search?q=${searchTerm}&size=10`)
        .then(response => response.json())
        .then(data => {
          const newTerms = Object.entries(data.results.reduce((acc, item) => {
            if (item?.package?.description) {
              acc.push(...item?.package?.description?.split(' '))
            }
            return acc
          }, []).reduce((count, word) => {
            count[word] = (count[word] || 0) + 1;
            return count;
          }, {}))
            .map(item => ({ term: item[0], count: item[1] }))
            .sort((a, b) => b.count - a.count)
            .filter(item => item.count > 2 && item.term.length > 2 && item.term.toLowerCase() !== searchTerm.toLowerCase())
            .filter(item => !['for', 'a', 'all','of', 'and', 'with', 'to',  'the', 'in', 'into', 'that', 'by'].some(word => word.toLowerCase() === item.term.toLowerCase()))
          setTerms(newTerms)
          setTotal(data.total)
          setDataNew(data.results.map(item => ({
            ...item, custom: {
            packageName: item.package.links.repository?.replace('https://github.com/', '')
          } })))
        });
      fetch(`https://api.npms.io/v2/search/suggestions?q=${searchTerm}&size=10`)
        .then(response => response.json())
        .then(data => setSuggestions(data));
    }
  }, [searchTerm]);

  const accumulateData = useCallback((repoUrl, accumulator, accumulatorName, setAccumulator) => {
    if (selectedItem) {
      if (!accumulator.some(item => item.repo === selectedItem.name)) {
        fetch(repoUrl(selectedItem.url.replace('https://github.com/', '')))
          .then(response => response.json())
          .then(data => {
            setAccumulator(() => [...accumulator, { repo: selectedItem.name, data }])
            const newArray = JSON.parse(localStorage.getItem(accumulatorName) || '[]')
            localStorage.setItem(accumulatorName, JSON.stringify([...newArray, { repo: selectedItem.name, data }]))
          });
      }
    }
  }, [selectedItem])

  useEffect(() => {
    accumulateData((repoName) => `https://api.github.com/repos/${repoName}`, richPayloads, 'richPayloads', (payload) => setRichPayloads(payload))
  }, [selectedItem, richPayloads, accumulateData]);

  useEffect(() => {
    accumulateData((repoName) => `https://api.github.com/repos/${repoName}/contributors`, contributors, 'contributors', (payload) => setContributors(payload))
  }, [selectedItem, contributors, accumulateData])

  useEffect(() => {
    accumulateData((repoName) => `https://api.github.com/repos/${repoName}/git/trees/HEAD?per_page=100&recursive=1`, trees, 'trees', (payload) => setTrees(payload))
  }, [selectedItem, trees, accumulateData])

  useEffect(() => {
    setRichPayloads(JSON.parse(localStorage.getItem('richPayloads') || '[]'))
    setContributors(JSON.parse(localStorage.getItem('contributors') || '[]'))
    setTrees(JSON.parse(localStorage.getItem('trees') || '[]'))
  }, [])

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

  const grid = [
    {
      header: {
        key: 'custom.section.header',
        align: 'flex-end',
        visible: true,
        noColumn: true,
			},
      row: {
        key: 'custom.section.row',
        fullWidth: true,
        component: (item, index, count = 3) => <div key={`header.${item.package.name}`}>
            {index % count === 0 && <div style={{ display: 'flex', backgroundColor: "#EEE", padding: '8px', gap: '4px', flexWrap: 'wrap' }}>
              <Typography variant="caption" color="textSecondary">Header from {index + 1} - {index + count}</Typography>
            </div>}
        </div>
			}
    },
    // {
    //   header: {
    //     key: 'selection',
    //     align: 'flex-end',
		// 		width: '60px',
    //     visible: true,
    //     noSort: true,
		// 		component: '',
		// 	},
    //   row: {
    //     key: 'type',
    //     component: (item, index) => <Checkbox
    //       color="primary"
    //       fullWidth={false}
    //       checked={selectedRows.some(sr => sr === item.package.name)}
    //       onClick={() => setSelectedRows(selectedRows.some(sr => sr === item.package.name)
    //         ? [...selectedRows.filter(sr => sr !== item.package.name)]
    //         : [...selectedRows, item.package.name])} />,
		// 	}
    // },
		{
      header: {
        key: 'openRow',
        align: 'flex-end',
				width: '80px',
        visible: true,
        noSort: true,
				component: () => <AccountTreeSharpIcon />,
			},
      row: {
        key: 'selection',
        component: (item, index) => <SelectionAndOpenColumn {...{item, index, setOpenRows, openRows}} />,
			}
    },

		{
      header: {
        key: 'searchScore',
        align: 'flex-end',
				width: '120px',
				visible: true,
				component: 'Search Score',
			},
      row: {
        key: 'scores',
        noWrapper: true,
        component: item => <SearchScoreColumn {...{item}} />,
			}
    },
		{
      header: {
        key: 'package.name',
				width: 'minmax(250px, 1fr)',
        visible: true,
        disableOnClick: true,
        component: ({ onSort, sort, directionComponent }) => <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start', flexDirection: 'column' }}>
          {[{ key: 'package.version', label: 'Version' }, { key: 'package.name', label: 'Package Name' }].map(item => <div key={item.key} style={{ display: 'flex', gap: '8px'}}>
            <Typography
              onClick={() => onSort(item.key)}
              style={{ cursor: 'pointer' }}
              color={item.key === sort.column ? 'primary' : 'textSecondary'}
              variant="subtitle2">
              {item.label}
            </Typography>
            {directionComponent(item.key)}
          </div>)}
        </div>,
			},
      row: {
        key: 'type',
        component: item => <NameColumn {...{ item, searchTerm, richPayloads }} />
			}
    },
		{
      header: {
        key: 'package.description',
        width: 'minmax(200px, 1fr)',
        visible: true,
        align: 'flex-end',
        component: 'Description',
			},
      row: {
        key: 'description',
        noWrapper: true,
        component: item => <MetadataColumn {...{ item, value: item.package.description, searchTerm, setSearchTerm }} />,
			}
    },
		{
      header: {
        key: 'package.keywords',
				width: 'minmax(200px, 1fr)',
        visible: true,
        noSort: true,
				component: 'Keywords',
			},
      row: {
        key: 'keywords',
        component: item => <KeywordsColumn {...{item, searchTerm, setSearchTerm}} />,
			}
    },
    {
      header: {
        key: 'package.links',
        align: 'center',
				width: 'minmax(140px, 160px)',
        visible: true,
        noSort: true,
				component: 'Links',
			},
      row: {
        key: 'links',
        component: (item) => <LinksColumn item={item} />,
			}
    },
    {
      header: {
        key: 'Collaborators',
        align: 'flex-end',
				width: 'minmax(140px, 160px)',
        visible: true,
        noSort: true,
				component: 'Collaborators',
			},
      row: {
        key: 'collabs',
        component: (item) => <CollaboratorsColumn {...{item, contributors}} />
			}
    },
    {
      header: {
        key: 'Secondary:Column',
        align: 'flex-end',
        visible: true,
        noColumn: true,
			},
      row: {
        key: 'preview',
        component: (item) => openRows.some(openRow => openRow === item.package.name)
          && <iframe
            key={item.package.name}
            src={item?.package?.links.homepage}
            title="Preview of website resource"
            style={{
              margin: '8px',
              backgroundColor: '#FFF',
              boxShadow: '0px 4px 0px 1px #77777733',
              border: '2px dotted #777',
              borderRadius: '8px',
              width: '100%',
              height: '350px'
            }} />
      }
    },
    // {
    //   header: {
    //     key: 'custom.section.footer',
    //     align: 'flex-end',
    //     visible: true,
    //     noColumn: true,
		// 	},
    //   row: {
    //     columnStart: 7,
    //     columnEnd: 'none',
    //     rowStart: 3,
    //     rowEnd: 3,
    //     component: (item) => <div style={{ display: 'flex', backgroundColor: '#FFF', border: '1px solid #EEE', padding: '8px', gap: '4px', flexWrap: 'wrap' }}>
    //       <Typography color="textSecondary" variant="caption">footer 7 to none</Typography>
    //     </div>
		// 	}
    // },
    // {
    //   header: {
    //     key: 'custom.section.footer2',
    //     align: 'flex-end',
    //     visible: true,
    //     noColumn: true,
		// 	},
    //   row: {
    //     columnStart: 2,
    //     columnEnd: 4,
    //     rowStart: 3,
    //     rowEnd: 3,
    //     component: (item) => <div style={{ display: 'flex', backgroundColor: '#FFF', border: '1px solid #EEE', padding: '8px', gap: '4px', flexWrap: 'wrap' }}>
    //       <Typography color="textSecondary" variant="caption">footer none to 4</Typography>
    //     </div>
		// 	}
    // },
	]

  return <ThemeProvider {...{ theme }} >
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
      <TextField
        variant='outlined'
        placeholder="Search term"
        label="Search term"
        fullWidth
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: <div style={{ display: 'flex', gap: '4px', margin: '4px', flexWrap: 'nowrap' }}>
            {[...new Set(suggestions
              .map((suggestion => suggestion.package.name.toLowerCase()))
              // .map(name => name
              //   .replace(/[\W_]+/g, " ")
              //   .replace(`${searchTerm}`, '')
              //   .trim())
              .filter(name => name.length > 0)
              .filter(name => name !== searchTerm)
              .sort()
            )]?.filter((_, index) => index < 10)
              .map(suggestion => <Chip icon={<FontAwesomeIcon
                icon={suggestion.includes(searchTerm.toLowerCase()) ? faLink : faMagnifyingGlass} />}
                key={suggestion}
                style={{ borderStyle: 'dotted'}}
                onClick={() => setSearchTerm(suggestion)}
                label={suggestion}
                size="small"
                variant="outlined"
              />)}
            <Chip label={dataNew.length} size="small" color="primary" variant="outlined" />
            <Chip label={total} size="small" color="primary" variant="outlined" />
          </div>,
          }}
      />
      {/* <div>
        {JSON.stringify(openRows)} */}
        {/* {dataNew.map(item => <div key={item.package.name}>{item.package.publisher.username}</div>)} */}
      {/* </div> */}
      <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {terms.map(term => <Chip key={term.term} avatar={<Avatar>{term.count}</Avatar>} variant="outlined" size="small" label={`${term.term}`}/>)}
      </div>
      {/* <div>
        total {total}
      </div> */}
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', gap: '8px', flex: '1 1 auto'}}>
    {1 === 1 && <Grid {...{ data: dataNew, grid, global }}>
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
