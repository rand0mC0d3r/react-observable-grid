import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import { faBug, faCode, faHouseSignal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Chip, CircularProgress, Fade, InputAdornment, Popper, TextField, Tooltip, Typography } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useEffect, useMemo, useState } from 'react';
import GridColumnsNg from './components/GridColumnsNg';
import GridHeadersNg from './components/GridHeadersNg';
import GridRowsNg from './components/GridRowsNg';
import GridStatsNg from './components/GridStatsNg';
import { Grid } from './components/GridStoreNg';
import { files } from './parts/sample';
import { CircularProgressBlock, MetadataColumn } from './parts/SampleRow';

const App = () => {
  // const [data, setData] = useState([]);
  const [dataNew, setDataNew] = useState([]);
  const [terms, setTerms] = useState([]);
  // const [currentFolder, setCurrentFolder] = useState('');
  const [searchTerm, setSearchTerm] = useState('angular');
  const [suggestions, setSuggestions] = useState([]);


  const theme = useMemo(() => createTheme({ palette: { type: 'light', } }), [])
  const classes = useStyles()

  // useEffect(() => {
  //   let processData = [
  //     ...files.tree
  //       .filter(file => file.type === 'tree')
  //       .filter(file => currentFolder === ''
  //         ? file.path.indexOf('/') === -1
  //         : file.path.indexOf(currentFolder) === 0
  //           && file.path !== currentFolder
  //           && file.path.replace(`${currentFolder}/`, '').indexOf('/') === -1)
  //       .map(file => ({ ...file, label: file.path?.replace(`${currentFolder}/`, '') })),
  //     ...files.tree
  //       .filter(file => file.type !== 'tree')
  //       .filter(file => currentFolder === ''
  //         ? file.path.indexOf('/') === -1
  //         : file.path.indexOf(currentFolder) === 0
  //           && file.path.replace(`${currentFolder}/`, '').indexOf('/') === -1)
  //       .map(file => ({ ...file, label: file.path?.replace(`${currentFolder}/`, '') })),
  //   ]

  //   if (currentFolder !== '') {
  //     processData = [{ type: 'tree', path: '', label: '..' }, ...processData ]
  //   }

  //   setData(processData)
  // }, [currentFolder])

  useEffect(() => {
    if (searchTerm !== '') {
      fetch(`https://api.npms.io/v2/search?q=${searchTerm}&size=20`)
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
            .filter(item => !['for', 'a', 'all','of', 'and', 'with', 'to', 'the', 'in', 'into', 'that', 'by'].some(word => word.toLowerCase() === item.term.toLowerCase()))
          setTerms(newTerms)
          setDataNew(data.results)
        });
      fetch(`https://api.npms.io/v2/search/suggestions?q=${searchTerm}&size=25`)
        .then(response => response.json())
        .then(data => {
          // console.log('suggestions', data)
          setSuggestions(data)
        });

      fetch(`https://api.npms.io/v2/search/suggestions?q=${searchTerm}&size=25`)
        .then(response => response.json())
        .then(data => {
          // console.log('suggestions', data)
          setSuggestions(data)
        });


      /algolia/react-instantsearch
    }

    // setDataNew(dataSample.results)
  }, [searchTerm]);

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
        key: 'searchScore',
        align: 'flex-end',
				width: '120px',
				visible: true,
				component: () => <Typography color="textSecondary" variant="subtitle2">SearchScore</Typography>,
			},
      row: {
        key: 'type',
        component: (item, index) => <div style={{ display: 'flex', gap: '4px', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Tooltip title={`Position: ${index}`}>
            <Typography color="textSecondary" variant="h6">
             {(parseFloat(item.searchScore / 100).toFixed(2) * 100).toFixed(0)}%
            </Typography>
          </Tooltip>
          <div style={{display: 'flex', gap: '4px'}}>
            {[
              { title: 'Quality', value: item.score.detail.quality },
              { title: 'Popularity', value: item.score.detail.popularity },
              { title: 'Maintenance', value: item.score.detail.maintenance },
            ].map(({ title, value }) => <CircularProgressBlock {...{value, title }} />)}
          </div>
        </div>,
			}
    },
		{
      header: {
        key: 'package.name',
        align: 'flex-end',
				width: 'minmax(300px, 1fr)',
        visible: true,
        disableOnClick: true,
        component: ({ onSort }) => <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Typography onClick={() => onSort('package.version')} color="textSecondary" variant="subtitle2">Version</Typography>
          <Typography color="primary">/</Typography>
          <Typography onClick={() => onSort('package.name')} color="textSecondary" variant="subtitle2">Package Name</Typography>
        </div>,
			},
      row: {
        key: 'type',
        component: (item, index) => <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Tooltip arrow title={`Last release: ${item.package.date}`}><Chip size="small" variant="outlined" label={item.package.version} /></Tooltip>
          <MetadataColumn {...{ value: item.package.name, searchTerm }} />
          </div>,
			}
    },
		{
      header: {
        key: 'package.description',
				width: 'minmax(300px, 2fr)',
        visible: true,
				component: () => <Typography color="textSecondary" variant="subtitle2">Description</Typography>,
			},
      row: {
        key: 'type',
        component: (item, index) => <MetadataColumn {...{ value: item.package.description, searchTerm, setSearchTerm }} />,
			}
    },
		{
      header: {
        key: 'package.keywords',
				width: 'minmax(300px, 2fr)',
        visible: true,
        noSort: true,
				component: () => <Typography color="textSecondary" variant="subtitle2">Keywords</Typography>,
			},
      row: {
        key: 'type',
        component: (item, index) => <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {item?.package?.keywords?.map(keyword => <Chip key={keyword} onClick={() => setSearchTerm(keyword)} variant="outlined" size="small" label={keyword} />)}
        </div>,
			}
    },
    {
      header: {
        key: 'Links',
        align: 'flex-end',
				width: 'minmax(440px, 2fr)',
				visible: true,
				component: ({onSort}) => <Typography onClick={onSort} color="textSecondary" variant="subtitle2">Links</Typography>,
			},
      row: {
        key: 'type',
        component: (item) => <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {Object
            .entries(item.package.links)
            .map(([key, value]) => ([
              key,
              value
              .replace("https://www.npmjs.com/package", "")
              .replace("https://github.com", "")
            ]))
            .map(([key, value]) => <>
            <Chip size='small' variant="outlined" label={<div style={{ display: 'flex', gap: '4px', alignItems: 'center'}}>
              {key === 'npm' && <FontAwesomeIcon icon={faNpm} />}
              {key === 'homepage' && <FontAwesomeIcon icon={faHouseSignal} />}
              {key === 'repository' && <FontAwesomeIcon icon={faGithub} />}
              {key === 'bugs' && <FontAwesomeIcon icon={faBug} />}
              {decodeURI(value)}
            </div>} />
          </>)}
        </div>,
			}
    },
    {
      header: {
        key: 'Author',
        align: 'flex-end',
				width: 'minmax(340px, 1fr)',
				visible: true,
				component: ({onSort}) => <Typography onClick={onSort} color="textSecondary" variant="subtitle2">Author</Typography>,
			},
      row: {
        key: 'type',
        component: (item) => <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }} >
          <Avatar>{item.package.publisher.username.substring(0,2).toUpperCase()}</Avatar>
          <div style={{display: 'flex'}}>
            {item.package.maintainers.filter((maintainer, index) => index < 10).map((maintainer) => <Avatar
              style={{
                marginRight: '-12px',
                fontSize: '10px',
                backgroundColor: '#FFF',
                boxShadow: '-1px 0px 1px 1px #aaa',
                border: '1px solid #AAA'
              }}
            >
              <Typography color="textSecondary">{maintainer.username.substring(0, 2).toUpperCase()}</Typography>
            </Avatar>)}
          </div>
          {/* {Object.entries(item.package.links).map(([key, value]) => <Chip size='small' variant="outlined" label={`${key}: ${value}`} />)} */}
        </div>,
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
        fullWidth
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: <div style={{ display: 'flex', gap: '4px', margin: '4px', flexWrap: 'wrap' }}>
            {[...new Set(suggestions
              .map((suggestion => suggestion.package.name))
              .map(name => name
                .replace(/[\W_]+/g, " ")
                .replace(`${searchTerm}`, '')
                .trim())
              .filter(name => name.length > 0)
              .sort()
            )]?.map(suggestion => <Chip label={suggestion} size="small" variant="outlined" />)}
            {/* {suggestions?.map(suggestion => <Chip label={suggestion.package.name} size="small" variant="outlined" />)} */}
          </div>,
          }}
      />
      <div>
        providers
      </div>
      <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {terms.map(term => <Chip avatar={<Avatar>{term.count}</Avatar>} variant="outlined" size="small" label={`${term.term}`}/>)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', gap: '8px', flex: '1 1 auto'}}>
    {1 === 1 && <Grid {...{ data: dataNew, grid, global }}>
      {/* <GridHeadersNg >
        {({ headers }) => headers.map(({ key, component, sort }) => <div key={key}>
          {component}
          {sort.column === key && <>{sort.direction === 'asc' ? '↑' : '↓'}</>}
        </div>)}
      </GridHeadersNg> */}
      <GridHeadersNg />
      <GridColumnsNg >
        {/* {({ columns }) => columns.map(({ key, align }) => <div key={key}>|</div> )} */}
      </GridColumnsNg>
      <GridRowsNg>
        {({ rows, rowProps, styleProps }) => rows.map(({ key, component, alternating }) => <div
          {...rowProps}
          {...{
            key,
            style: {
              ...styleProps,
              borderBottom: '1px solid #DDD',
              backgroundColor: alternating ? '#f0f0f077' : '#ffffff77'
            }
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
  stats: {
    position: 'absolute',
    backgroundColor: '#BBB',
    border: '1px solid #888',
    right: '16px',
    padding: '16px',
    bottom: '16px'
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
