import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import { faBug, faCode, faHouse, faHouseSignal, faLink, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Checkbox, Chip, CircularProgress, Fade, InputAdornment, Popper, TextField, Tooltip, Typography } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import StarsIcon from '@material-ui/icons/Stars';
import { Fragment, useEffect, useMemo, useState } from 'react';
import GridColumnsNg from './components/GridColumnsNg';
import GridHeadersNg from './components/GridHeadersNg';
import GridRowsNg from './components/GridRowsNg';
import GridStatsNg from './components/GridStatsNg';
import { Grid } from './components/GridStoreNg';
import { files } from './parts/sample';
import { CircularProgressBlock, LinksColumn, MetadataColumn } from './parts/SampleRow';

const App = () => {
  // const [data, setData] = useState([]);
  const [dataNew, setDataNew] = useState([]);
  const [terms, setTerms] = useState([]);
  // const [currentFolder, setCurrentFolder] = useState('');
  const [total, setTotal] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('react');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [richPayloads, setRichPayloads] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [openRows, setOpenRows] = useState([]);
  const [contents, setContents] = useState([]);

  const theme = useMemo(() => createTheme({
    palette: { type: 'light', },
    transitions: {
      create: () => 'none',
    },
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
      MuiChip: {
        disableRipple: true,
      },
      MuiCheckbox: {
        disableRipple: true,
      }
    }
  }), [])
  const classes = useStyles()

  useEffect(() => {
    if (searchTerm !== '') {
      fetch(`https://api.npms.io/v2/search?q=${searchTerm}&size=15`)
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

  useEffect(() => {
    if (selectedRepo) {
      const repoName = selectedRepo.replace('https://github.com/', '')
      if (!richPayloads.some(item => item.repo === repoName)) {
        fetch(`https://api.github.com/repos/${repoName}`)
          .then(response => response.json())
          .then(data => {
            setRichPayloads(richPayloads => [...richPayloads, { repo: repoName, data }])
            const currentRichPayloads = JSON.parse(localStorage.getItem('richPayloads') || '[]')
            localStorage.setItem('richPayloads', JSON.stringify([...currentRichPayloads, { repo: repoName, data }]))
          });
      }
    }
  }, [selectedRepo, richPayloads]);

  useEffect(() => {
    if (selectedRepo) {
      const repoName = selectedRepo.replace('https://github.com/', '')
      if (!contributors.some(item => item.repo === repoName)) {
        fetch(`https://api.github.com/repos/${repoName}/contributors`)
          .then(response => response.json())
          .then(data => {
            setContributors(state => [
              ...state.filter(contributor => contributor.repo !== repoName),
              { repo: repoName, data }
            ])
            const currentContributors = JSON.parse(localStorage.getItem('contributors') || '[]')
            localStorage.setItem('contributors', JSON.stringify([...currentContributors, { repo: repoName, data }]))
          });
      }
    }
  }, [selectedRepo, contributors])

  useEffect(() => {
    setRichPayloads(JSON.parse(localStorage.getItem('richPayloads') || '[]'))
    setContributors(JSON.parse(localStorage.getItem('contributors') || '[]'))
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
        fullWidth: true,
        component: (item, index) => {
          const count = 3;
          return <>
            {index % count === 0 && <div style={{ display: 'flex', backgroundColor: "#EEE", padding: '8px', gap: '4px', flexWrap: 'wrap' }}>
              <Typography variant="caption" color="textSecondary">Header from {index + 1} - {index + count}</Typography>
            </div>}
          </>
        }
			}
    },
    {
      header: {
        key: 'selection',
        align: 'flex-end',
				width: '60px',
        visible: true,
        noSort: true,
				component: '',
			},
      row: {
        key: 'type',
        component: (item, index) => <Checkbox
          color="primary"
          fullWidth={false}
          checked={selectedRows.some(sr => sr === item.package.name)}
          onClick={() => setSelectedRows(selectedRows.some(sr => sr === item.package.name)
            ? [...selectedRows.filter(sr => sr !== item.package.name)]
            : [...selectedRows, item.package.name])} />,
			}
    },
		{
      header: {
        key: 'openRow',
        align: 'flex-end',
				width: '80px',
        visible: true,
        noSort: true,
				component: 'File Tree',
			},
      row: {
        key: 'type',
        component: (item, index) => <>
          {index % 3 === 0 && <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            <Button onClick={() => setOpenRows(openRows.includes(item.package.name)
              ? openRows.filter(openRow => openRow !== item.package.name)
              : [...openRows.filter(row => row !== item.package.name), item.package.name]
            )}>{openRows.includes(item.package.name) ? <KeyboardArrowDownSharpIcon /> : <ChevronRightSharpIcon />}</Button>
          </div>}
        </>,
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
        key: 'type',
        component: (item, index) => <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <Tooltip title={`Position: ${index}`}>
            <Typography color="textSecondary" variant="h6" style={{ flex: '1 1 100%'}}>
             {`${(parseFloat(((item.score.detail.quality + item.score.detail.popularity + item.score.detail.maintenance) / 3) * 100).toFixed(2))}%`}
            </Typography>
          </Tooltip>
            {[
              { title: 'Quality', value: item.score.detail.quality },
              { title: 'Popularity', value: item.score.detail.popularity },
              { title: 'Maintenance', value: item.score.detail.maintenance },
            ].map(({ title, value }) => <CircularProgressBlock {...{value, title }} />)}
        </div>,
			}
    },
		{
      header: {
        key: 'package.name',
				width: 'minmax(250px, 1fr)',
        visible: true,
        disableOnClick: true,
        component: ({ onSort, sort, directionComponent }) => <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start', flexDirection: 'column' }}>
          {[{ key: 'package.version', label: 'Version' }, { key: 'package.name', label: 'Package Name' }].map(item => <div style={{ display: 'flex', gap: '8px'}}>
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
        component: (item, index) => {
          const extraPayload = richPayloads.filter(payload => payload.repo === item.custom.packageName).map(payload => payload.data)[0]
          return <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'row', alignItems: 'center', flex: '1 1 100%' }}>
              {extraPayload?.organization?.avatar_url && <img src={extraPayload?.organization?.avatar_url} style={{ width: '24px', height: '24px', borderRadius: '50%' }} alt="avatar" />}
              <MetadataColumn {...{ value: item.package.name, searchTerm }} />
            </div>
            {/* <div style={{ display: 'flex', gap: '8px' }}> */}
              <Tooltip arrow title={`Last release: ${item.package.date}`}>
                <Chip size="small" variant="outlined" label={item.package.version} />
              </Tooltip>
              {extraPayload?.stargazers_count && <Chip
                style={{ borderColor: "orange", borderStyle: 'dotted' }}
                key={extraPayload.full_name}
                size="small"
                label={extraPayload.stargazers_count}
                variant="outlined"
                color="primary"
                icon={<StarsIcon style={{color: 'orange'}} />} />}
            {/* </div> */}
          </div>
        },
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
        key: 'type',
        noWrapper: true,
        component: (item, index) => <MetadataColumn {...{ value: item.package.description, searchTerm, setSearchTerm }} />,
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
        key: 'type',
        component: (item) => <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {item?.package?.keywords?.map(keyword => <Tooltip arrow title={`Search by ${keyword}`}><div
            key={keyword}
            onClick={() => setSearchTerm(keyword)}
            style={{
              fontSize: '11px',
              borderRadius: '12px',
              borderColor: keyword.toLowerCase() === searchTerm.toLowerCase() ? '#CCC' : '#000',
              color: keyword.toLowerCase() === searchTerm.toLowerCase() ? '#CCC' : '#000',
              borderWidth: '1px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderStyle: 'dashed'
            }}
          >
            {keyword}
          </div>
          </Tooltip>)}
        </div>,
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
        key: 'type',
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
        key: 'type',
        component: (item) => <div style={{ display: 'grid', gap: '4px', gridTemplateColumns: 'repeat(5, minmax(20px, 30px))' }}>
          {contributors
            .filter(contributor => contributor.repo === item.custom.packageName)
            .map(contributor => (contributor?.data.length > 0 ? contributor.data : []).filter((_, i) => i < 10).map(({ avatar_url, login }) => <Fragment key={`${item.custom.packageName}.${avatar_url}`}>
              <Tooltip arrow title={login}>
                <img
                  className={classes.avatar}
                  src={avatar_url}
                  style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                  alt="avatar"
                />
              </Tooltip>
            </Fragment>))}
          </div>
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
        key: 'type',
        component: (item) => openRows.some(openRow => openRow === item.package.name) ? <div style={{ display: 'flex', backgroundColor: '#EEE', gap: '4px', flexWrap: 'wrap' }}>
          <iframe
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
        </div> : <></>
			}
    },
    {
      header: {
        key: 'custom.section.footer',
        align: 'flex-end',
        visible: true,
        noColumn: true,
			},
      row: {
        // fullWidth: true,
        columnStart: 3,
        columnEnd: 10,
        component: (item) => <div style={{ display: 'flex', backgroundColor: '#FFF', border: '1px solid #EEE', padding: '8px', gap: '4px', flexWrap: 'wrap' }}>
          <Typography color="textSecondary" variant="caption">footer</Typography>
        </div>
			}
    },
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
      <GridRowsNg>
            {({ rows, className, styleProps }) => rows.map(({ key, data, component, alternating, index }) => <div
              // onClick={() => setOpenRows(openRows.includes(data.package.name)
              //   ? openRows.filter(openRow => openRow !== data.package.name)
              //   : [...openRows.filter(row => row !== data.package.name), data.package.name]
              // )}

          onMouseUp={() => setSelectedRepo(Object.entries(data.package.links).filter(([key, _]) => key === 'repository').map(([_, value]) => value)[0])}
          className={`${className} ${classes.row} ${alternating ? classes.alternating : ''} ${selectedRows.includes(data.package.name) ? classes.selected : ''}`}
          {...{ key, style: { ...styleProps, borderBottom: '1px solid #DDD', }
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
