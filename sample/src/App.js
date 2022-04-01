import { Button, Chip, TextField, Tooltip, Typography } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import { useEffect, useMemo, useState } from 'react';
import GridColumnsNg from './components/GridColumnsNg';
import GridHeadersNg from './components/GridHeadersNg';
import GridRowsNg from './components/GridRowsNg';
import GridStatsNg from './components/GridStatsNg';
import { Grid } from './components/GridStoreNg';
import { dataSample } from './parts/data';
import { files } from './parts/sample';
import { MetadataColumn } from './parts/SampleRow';

const App = () => {
  const [data, setData] = useState([]);
  const [dataNew, setDataNew] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('');
  const [searchTerm, setSearchTerm] = useState('angular');

  const theme = useMemo(() => createTheme({ palette: { type: 'light', } }), [])
  const classes = useStyles()

  useEffect(() => {
    let processData = [
      ...files.tree
        .filter(file => file.type === 'tree')
        .filter(file => currentFolder === ''
          ? file.path.indexOf('/') === -1
          : file.path.indexOf(currentFolder) === 0
            && file.path !== currentFolder
            && file.path.replace(`${currentFolder}/`, '').indexOf('/') === -1)
        .map(file => ({ ...file, label: file.path?.replace(`${currentFolder}/`, '') })),
      ...files.tree
        .filter(file => file.type !== 'tree')
        .filter(file => currentFolder === ''
          ? file.path.indexOf('/') === -1
          : file.path.indexOf(currentFolder) === 0
            && file.path.replace(`${currentFolder}/`, '').indexOf('/') === -1)
        .map(file => ({ ...file, label: file.path?.replace(`${currentFolder}/`, '') })),
    ]

    if (currentFolder !== '') {
      processData = [{ type: 'tree', path: '', label: '..' }, ...processData ]
    }

    setData(processData)
  }, [currentFolder])

  useEffect(() => {
    if (searchTerm !== '') {
      fetch(`https://api.npms.io/v2/search?q=${searchTerm}&size=25`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setDataNew(data.results)
        });
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
				component: ({onSort}) => <Typography onClick={onSort} color="textSecondary" variant="subtitle2">SearchScore</Typography>,
			},
      row: {
        key: 'type',
        component: ({ searchScore }, index) => <Tooltip title={`Position: ${index}`}><Chip variant="outlined" label={searchScore} /></Tooltip>,
			}
    },
		{
      header: {
        key: 'package.name',
        align: 'flex-end',
				width: 'minmax(300px, 1fr)',
				visible: true,
				component: ({onSort}) => <Typography onClick={onSort} color="textSecondary" variant="subtitle2">SearchScore</Typography>,
			},
      row: {
        key: 'type',
        component: (item, index) => <MetadataColumn {...{ value: item.package.name, searchTerm }} />,
			}
    },
    {
      header: {
        key: 'Version',
        align: 'flex-end',
				width: '140px',
				visible: true,
				component: ({onSort}) => <Typography onClick={onSort} color="textSecondary" variant="subtitle2">Version</Typography>,
			},
      row: {
        key: 'type',
        component: (item) => <div>
          <Tooltip title={`Last release: ${item.package.date}`}><Chip variant="outlined" label={item.package.version} /></Tooltip>
        </div>,
			}
    },
    {
      header: {
        key: 'Version',
        align: 'flex-end',
				width: '140px',
				visible: true,
				component: ({onSort}) => <Typography onClick={onSort} color="textSecondary" variant="subtitle2">Scope</Typography>,
			},
      row: {
        key: 'type',
        component: (item) => <div>
          <Tooltip title={`Last release: ${item.package.scope}`}><Chip variant="outlined" label={item.package.scope} /></Tooltip>
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
        component: (item) => <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}} >
          {Object.entries(item.package.links).map(([key, value]) => <Chip size='small' variant="outlined" label={`${key}: ${value}`} />)}
        </div>,
			}
    },
		{
      header: {
        key: 'package.description',
        align: 'flex-end',
				width: 'minmax(300px, 2fr)',
				visible: true,
				component: ({onSort}) => <Typography onClick={onSort} color="textSecondary" variant="subtitle2">Description</Typography>,
			},
      row: {
        key: 'type',
        component: (item, index) => <MetadataColumn {...{ value: item.package.description, searchTerm }} />,
			}
    },
    // {
    //   header: {
    //     key: 'name',
		// 		width: '2fr',
		// 		visible: true,
    //     component:  () => <Typography color="textSecondary" variant="caption">Path</Typography>,
		// 	},
    //   row: {
    //     key: 'path',
    //     component: ({ type, label, path }) => <div style={{ display: 'flex', gap: '8px',  alignItems: 'center' }}>
    //       <Typography
    //         style={{ cursor: 'pointer' }}
    //         color={currentFolder === path ? 'primary' : 'textSecondary'}
    //         variant={type === 'tree' ? 'body1' : 'subtitle2'}
    //         onClick={() => type === 'tree' && setCurrentFolder(path)}
    //       >
    //         {label}
    //       </Typography>
    //       {path && <Typography variant="caption" color="textSecondary">({path})</Typography>}
    //       </div>,
		// 	}
		// },
		// {
    //   header: {
    //     key: 'url',
		// 		width: '600px',
    //     visible: true,
    //     component:  () => <Typography color="textSecondary" variant="caption">URL</Typography>,
		// 	},
    //   row: {
    //     key:  'size',
    //     component: ({ url }) => <>
    //       {/* <iframe src={url} style={{ width: '300px', height: '300px' }} /> */}
    //     </>
		// 	}
		// },
		// {
    //   header: {
    //     key: 'size',
		// 		width: '100px',
    //     visible: true,
    //     align: 'flex-end',
    //     component:  () => <Typography color="textSecondary" variant="caption">File size</Typography>,
		// 	},
    //   row: {
    //     key:  'size',
    //     component: ({ size }) => <Typography variant="caption">{size}</Typography>
		// 	}
		// },
		// {
    //   header: {
    //     key: 'sha',
		// 		width: '300px',
    //     visible: true,
    //     align: 'flex-end',
    //     component: () =>  <Typography color="textSecondary" variant="caption">SHA</Typography>,
		// 	},
    //   row: {
    //     key: 'sha',
    //     component: ({ sha }) => <Typography variant="caption">{sha}</Typography>,
		// 	}
		// }
	]



  return <ThemeProvider {...{ theme }} >
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'absolute',
      top: '16px',
      left: '16px',
      right: '16px',
      bottom: '16px',
    }}>
      <TextField variant='outlined' fullWidth value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <div style={{    display: 'flex', flexDirection: 'column', gap: '8px'}}>
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
          {total} {sort.column} {sort.direction} {currentFolder}
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
