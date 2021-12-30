# 👀 🗞️ react-observable-grid

A grid component for React. Works with the intersection observer API. It requires React min 16.8.4 and currently works only with Material UI (min) 4.0.0.

**NOTE**: Until v1.0.0 the package is in a beta state. Please do not use productive

## 📚 Installation

```
npm i react-observable-grid
```

## 📷 Preview

!['mainView'](/images/mainView.png)
Fully controlled example

!['mainView'](/images/unsupervised.png)
Unsupervised example


## Features

ZeroConfig mechanic

## Sample usage

```
const headers = [
  {
    label: 'Name',
    tooltip: "Filter users by name",
    icon: <GitHubIcon />,
    property: 'name',
    width: 'minmax(200px, 1fr)',
    row: (row) => <NamesRow row={row} />,
    additionalHeaders: [
      {
        label: 'Surname',
        icon: <PersonPinCircleIcon />,
        property: 'surname'
      }
    ],
    secondaryHeaders: [
      {
        label: 'Name1',
        property: 'nickname',
        // noSort: true
      },
      {
        label: 'Name2',
        property: 'streetname'
      }
    ]
  },
  {
    label: 'Description',
    icon: <SubjectIcon />,
    property: 'description',
    row: (row) => <DescriptionRow row={row} />,
    width: '2fr',
  },
  {
    label: 'Tiles',
    icon: <DashboardIcon />,
    property: 'tilesHash',
    width: 'minmax(100px, 2fr)',
    row: (row) => <TilesRow row={row} />,
    secondaryHeaders: [
      {
        label: 'Tiles Count',
        property: 'tiles',
      },
    ]
  },
  {
    label: 'Price',
    icon: <MonetizationOnIcon />,
    property: 'price',
    align: 'flex-end',
    width: '110px',
    row: (row) => <CurrencyRow row={row} />,
    secondaryHeaders: [
      {
        label: 'Currency',
        property: 'currency',
      },
    ]
  },
  {
    icon: <MoreHorizIcon />,
    align: 'flex-end',
    tooltip: "Actions for entries",
    noSort: true,
    row: (row) => <ActionsRow row={row} />,
    width: '1fr',
  },
]

 <ObservableGrid
	isDebugging={isDebugging}
	headers={headers}
	uniqueId="fakeEntries"
	rowOptions={{
		padding: '10px 20px'
	}}
	rows={filteredRows}
	isEmpty={filteredRows.length === 0}
	emptyElement={<div>No data found ...</div>}
	rowRenderer={row => <SampleRow {...{ row }} />}
/>
```
