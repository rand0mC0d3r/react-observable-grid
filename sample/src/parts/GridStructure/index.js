/* eslint-disable import/no-anonymous-default-export */
import { Typography } from '@material-ui/core';
import AccountTreeSharpIcon from '@material-ui/icons/AccountTreeSharp';
import { useEffect, useMemo } from 'react';
import {
	CollaboratorsColumn, KeywordsColumn, LinksColumn,
	MetadataColumn, NameColumn, SearchScoreColumn, SelectionAndOpenColumn
} from '../SampleRow';

export default ({
	searchTerm, setOpenRows, setCurrentSearchTerm,
	openRows, selectedRows, setSelectedRows, richPayloads, processedGrid,
	setSearchTerm, contributors, setProcessedGrid }) => {
	// const grid = useMemo(() => , [contributors, openRows, richPayloads, searchTerm, selectedRows, setOpenRows, setSearchTerm, setSelectedRows])

	useEffect(() => {
		setProcessedGrid(() => [
		{
			header: {
				key: 'custom.section.header',
				align: 'flex-end',
				noColumn: true,
			},
			row: {
				key: 'custom.section.row',
				fullWidth: true,
				component: (item, index, count = 3) => index % count === 0 ?
					<div key={`header.${item.package.name}`} style={{ display: 'flex', backgroundColor: "#EEE", padding: '8px', gap: '4px', flexWrap: 'wrap' }}>
						<Typography variant="caption" color="textSecondary">Header from {index + 1} - {index + count}</Typography>
				</div> : null
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
				align: 'center',
				width: '90px',
				noSort: true,
				component: () => <AccountTreeSharpIcon />,
			},
			row: {
				key: 'selection',
				component: (item, index) => <SelectionAndOpenColumn {...{ item, index, setOpenRows, openRows, selectedRows, setSelectedRows }} />,
			}
		},
		// {
		//   header: {
		//     key: 'thumbnails',
		//     align: 'center',
		// 		width: '170px',
		//     noSort: true,
		// 		component: () => <PhotoSizeSelectActualIcon />,
		// 	},
		//   row: {
		//     key: 'thumbnails.row',
		//     component: (item, index) => <div style={{width: '150px', height: '150px', overflow: 'hidden'}}>
		//       <iframe
		//         key={item.package.name}
		//         src={item?.package?.links.homepage}
		//         title="Preview of website resource"
		//         style={{
		//           backgroundColor: '#FFF',
		//           width: '300px',
		//           height: '300px',
		//           transform: 'scale(0.5)',
		//           transformOrigin: 'center'
		//         }} />
		//     </div>,
		// 	}
		// },
		{
			header: {
				key: 'searchScore',
				align: 'flex-end',
				width: '120px',
				component: 'Search Score',
			},
			row: {
				key: 'scores',
				noWrapper: true,
				component: item => <SearchScoreColumn {...{ item }} />,
			}
		},
		{
			header: {
				key: 'package.name',
				width: 'minmax(250px, 1fr)',
				disableOnClick: true,
				component: ({ onSort, sort, directionComponent }) => <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start', flexDirection: 'column' }}>
					{[{ key: 'package.version', label: 'Version' }, { key: 'package.name', label: 'Package Name' }].map(item => <div key={item.key} style={{ display: 'flex', gap: '8px' }}>
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
				noSort: true,
				component: 'Keywords',
			},
			row: {
				key: 'keywords',
				component: item => <KeywordsColumn {...{ item, searchTerm, setSearchTerm, setCurrentSearchTerm }} />,
			}
		},
		{
			header: {
				key: 'package.links',
				align: 'center',
				width: 'minmax(140px, 160px)',
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
				width: 'minmax(120px, 145px)',
				noSort: true,
				component: 'Collaborators',
			},
			row: {
				key: 'collabs',
				component: (item) => <CollaboratorsColumn {...{ item, contributors }} />
			}
		},
		{
			header: {
				key: 'Secondary:Column',
				align: 'flex-end',
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
	])
	}, [setProcessedGrid,  setOpenRows, openRows, selectedRows, setSelectedRows, searchTerm, richPayloads, setSearchTerm, contributors])

	return null
}